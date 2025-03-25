import { useUploader } from "@/hooks/uploader/useUploader"
import { ContentBlockModel } from "@/models/content_block"
import { CloseIcon } from "@/ui/icons/CloseIcon"
import { UploadFileIcon } from "@/ui/icons/UploadFileIcon"
import DefaultInput from "@/ui/inputs/DefaultInput"
import { Button, Card, CardFooter, Tooltip } from "@heroui/react"
import clsx from "clsx"
import { useEffect, useMemo } from "react"
import TextareaAutosize from 'react-textarea-autosize';

export type ImageContentBlockInputProps = React.HTMLProps<HTMLTextAreaElement> & {
    index: number
    text: string
    updateContentBlock: (index: number, contentBlock: ContentBlockModel, image?: File) => void
    removeContentBlock: (index: number) => void
    resources: Record<number, File | undefined>
}

export const ImageContentBlockInput: React.FC<ImageContentBlockInputProps> = ({
    index,
    text,
    updateContentBlock,
    removeContentBlock,
    resources
}) => {
    const { selectedFiles, setSelectedFiles, addFile, removeFile, clearFiles, uploader } = useUploader(
        (onClick) => (
            <Tooltip
                content='Upload file (8MB limit)'
                closeDelay={0}
                classNames={{
                    content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryColor'
                }}
            >
                <Button
                    className={clsx(
                        'justify-start gap-1.5 rounded-lg opacity-100',
                        'data-[hover=true]:bg-emphasizingColor2',
                        'transition-all duration-200'
                    )}
                    size='sm'
                    variant='light'
                    onPress={onClick}
                    startContent={
                        <div className={clsx(
                            "h-4 fill-secondaryText"
                        )}>
                            <UploadFileIcon />
                        </div>
                    }
                >
                    <p className={clsx(
                        'font-interTight font-semibold text-sm',
                    )}>Upload an image</p>
                </Button>
            </Tooltip>
        ),
        {
            maxFiles: 1  
        }
    )

    useEffect(() => {
        if (selectedFiles.length > 0) {
            updateContentBlock(index, {type: 'IMAGE', text: 'expected-file'}, selectedFiles[0]);
        }
    }, [selectedFiles]);

    const resourcesUploaded = useMemo(() =>
        text.startsWith('http://') || (index in resources && resources[index] !== undefined)
    , [text, index, resources]); 

    const uploadedFiles = useMemo(() => (
        <>
            {!text.startsWith('http://') ? 
                selectedFiles.map((file, index) => 
                    <Card className="w-full" key={index}>
                        <img 
                            src={URL.createObjectURL(file)} 
                            alt={`Preview ${index}`} 
                            className="w-full h-auto object-cover rounded-lg"
                        />
                        <CardFooter className="flex flex-row justify-end absolute p-1">
                            <Button
                                isIconOnly
                                className={clsx(
                                    "text-secondaryText",
                                    'data-[hover=true]:bg-emphasizingColor2'
                                )}
                                size="sm"
                                variant="flat"
                                onPress={() => removeContentBlock(index)}
                            >
                                <div 
                                    className="w-3 aspect-square"
                                >
                                    <CloseIcon customClassName="fill-primaryColor" />
                                </div>
                            </Button>
                        </CardFooter>
                    </Card>
                )
            :
                <Card className="w-full" key={index}>
                    <img 
                        src={text} 
                        alt={`Preview ${index}`} 
                        className="w-full h-auto object-cover rounded-lg"
                    />
                    <CardFooter className="flex flex-row justify-end absolute p-1">
                        <Button
                            isIconOnly
                            className={clsx(
                                "text-secondaryText",
                                'data-[hover=true]:bg-emphasizingColor2'
                            )}
                            size="sm"
                            variant="flat"
                            onPress={() => removeContentBlock(index)}
                        >
                            <div 
                                className="w-3 aspect-square"
                            >
                                <CloseIcon customClassName="fill-primaryColor" />
                            </div>
                        </Button>
                    </CardFooter>
                </Card>
            }
        </>
    ), [selectedFiles, text]);
    
    return (
        <div 
            key={index}
            className="flex flex-row w-full items-start gap-4 justify-between"
        >
            {!resourcesUploaded ? 
                uploader
            :
                uploadedFiles
            }
            {!resourcesUploaded &&
                <Button
                    isIconOnly
                    className={clsx(
                        'bg-[transparent]',
                        'data-[hover=true]:bg-emphasizingColor2',
                        'transition-all duration-200',
                    )}
                    onPress={() => removeContentBlock(index)}
                    variant='light'
                    size="sm"
                >
                    <div 
                        className={clsx(
                            'h-3 fill-secondaryColor',
                        )}
                    >
                        <CloseIcon />
                    </div>
                </Button>
            }
        </div>
    );
}