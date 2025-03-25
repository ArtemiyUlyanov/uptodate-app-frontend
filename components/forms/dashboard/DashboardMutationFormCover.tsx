import { ArticleModel } from "@/models/article"
import { CloseIcon } from "@/ui/icons/CloseIcon"
import { Button, Card, CardFooter } from "@heroui/react"
import clsx from "clsx"
import { Dispatch, SetStateAction } from "react"

export type DashboardMutationFormCoverProps = React.HTMLProps<HTMLDivElement> & {
    selectedFiles: File[]
    removeFile: (file: File) => void
    uploader: React.ReactNode
    article?: ArticleModel
    isCoverChanged: boolean
    setIsCoverChanged: Dispatch<SetStateAction<boolean>>
}

export const DashboardMutationFormCover: React.FC<DashboardMutationFormCoverProps> = ({
    selectedFiles,
    removeFile,
    uploader,
    article,
    isCoverChanged,
    setIsCoverChanged
}) => {
    return (
        <>
            {article?.cover && !isCoverChanged ?
                <Card>
                    <img 
                        src={article.cover} 
                        alt={`Preview`} 
                        className="w-full h-auto object-cover rounded-lg"
                    />
                    <CardFooter className="flex flex-row justify-end absolute p-1">
                        <Button
                            isIconOnly
                            className={clsx(
                                'text-secondaryText',
                                'data-[hover=true]:bg-emphasizingColor2'
                            )}
                            size="sm"
                            variant="flat"
                            onPress={() => setIsCoverChanged(true)}
                        >
                            <div 
                                className="w-3 aspect-square"
                            >
                                <CloseIcon customClassName="fill-primaryColor" />
                            </div>
                        </Button>
                    </CardFooter>
                </Card>
            :
                (selectedFiles.length <= 0 ? 
                    uploader
                :
                    selectedFiles.map((file, index) => 
                        <Card key={index}>
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
                                    onPress={() => removeFile(file)}
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
                )
            }
        </>
    );
}