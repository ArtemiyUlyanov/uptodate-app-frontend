import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react"

export type UseUploaderResponse = {
    uploader: React.ReactNode
    selectedFiles: File[]
    setSelectedFiles: Dispatch<SetStateAction<File[]>>
    removeFile: (file: File) => void
    addFile: (file: File) => void
    clearFiles: () => void
    onSelectionChange?: (selectedFiles: File[]) => void
}

export type UseUploaderProps = {
    maxFiles?: number
} 

export const useUploader = (trigger: (onClick: () => void) => React.ReactNode, props?: UseUploaderProps): UseUploaderResponse => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const uploaderRef = useRef<HTMLInputElement>(null);

    const MAX_FILES = props?.maxFiles || 3;
    const MAX_FILE_SIZE_MB = 8;

    const handleClick = () => {
        uploaderRef.current?.click();
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            if (selectedFiles.length + files.length > MAX_FILES) {
                alert(`Вы можете загрузить не более ${MAX_FILES} файлов.`);
                return;
            }

            Array.from(files).forEach((file) => {
                if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                    alert(`File "${file.name}" exceeds ${MAX_FILE_SIZE_MB} MB.`);
                } else {
                    addFile(file);
                }
            });
        }
    }

    const removeFile = (file: File) => {
        setSelectedFiles(prev => prev.filter(obj => obj.name !== file.name));
    }

    const addFile = (file: File) => {
        setSelectedFiles(prev => [...prev, file]);
    }

    const clearFiles = () => {
        setSelectedFiles([]);
    }

    const uploader = useMemo(() =>
        <div>
            {trigger(handleClick)}
            <input
                multiple
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                max={MAX_FILES}
                ref={uploaderRef}
            />
        </div>
    , [selectedFiles, setSelectedFiles, trigger]);

    return {uploader, selectedFiles, setSelectedFiles, addFile, removeFile, clearFiles};
}