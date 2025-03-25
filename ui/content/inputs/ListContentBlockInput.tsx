import { ContentBlockModel } from "@/models/content_block"
import { CloseIcon } from "@/ui/icons/CloseIcon"
import DefaultInput from "@/ui/inputs/DefaultInput"
import { Button } from "@heroui/react"
import clsx from "clsx"
import TextareaAutosize from 'react-textarea-autosize';

export type ListContentBlockInputProps = React.HTMLProps<HTMLTextAreaElement> & {
    index: number
    text: string
    updateContentBlock: (index: number, contentBlock: ContentBlockModel) => void
    removeContentBlock: (index: number) => void
}

export const ListContentBlockInput: React.FC<ListContentBlockInputProps> = ({
    index,
    text,
    updateContentBlock,
    removeContentBlock,
    ...props
}) => {
    return (
        <div 
            key={index}
            className="flex flex-row items-start gap-4"
        >
            <span className="font-interTight font-medium text-primaryText">•</span>
            <TextareaAutosize
                placeholder='Start typing your text here...'
                value={text}
                onChange={(event) => updateContentBlock(index, {type: 'LIST', text: event.target.value})}
                className={clsx(
                    "bg-[transparent] appearance-none overflow-scroll scrollbar-hide outline-none resize-none w-full",
                    'font-interTight font-medium text-primaryText placeholder-secondaryText'
                )}
                minRows={1}
            />
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
        </div>
    );
}