import { ContentBlockModel } from "@/models/content_block";
import { AddIcon } from "@/ui/icons/AddIcon";
import { HeadingContentBlockIcon } from "@/ui/icons/HeadingContentBlockIcon";
import { ImageContentBlockIcon } from "@/ui/icons/ImageContentBlockIcon";
import { ListContentBlockIcon } from "@/ui/icons/ListContentBlockIcon";
import { TextContentBlockIcon } from "@/ui/icons/TextContentBlockIcon";
import { Button, Popover, PopoverContent, PopoverTrigger, Tooltip } from "@heroui/react";
import clsx from "clsx";

export type DashboardAddContentPopoverProps = React.HTMLProps<HTMLDivElement> & {
    addContentBlock: (contentBlock: ContentBlockModel) => void
}

export const DashboardAddContentPopover: React.FC<DashboardAddContentPopoverProps> = ({
    addContentBlock
}) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    className={clsx(
                        'justify-start gap-1.5 rounded-lg opacity-100',
                        'data-[hover=true]:bg-emphasizingColor2',
                        'transition-all duration-200'
                    )}
                    size='sm'
                    variant='light'
                    startContent={
                        <div className={clsx(
                            "h-4 fill-primaryText"
                        )}>
                            <AddIcon />
                        </div>
                    }
                >
                    <p className={clsx(
                        'font-interTight font-semibold text-sm',
                    )}>Add a new block</p>
                </Button>
            </PopoverTrigger>
            <PopoverContent className={clsx(
                "bg-emphasizingColor2 border border-borderColor rounded-lg p-1",
            )}>
                <div className="flex flex-col gap-1">
                    <Button
                        className={clsx(
                            'justify-start gap-1.5 rounded-lg opacity-100',
                            'data-[hover=true]:bg-emphasizingColor2',
                            'transition-all duration-200'
                        )}
                        size='sm'
                        variant='light'
                        onPress={() => addContentBlock({type: 'HEADING', text: ''})}
                        startContent={
                            <div className={clsx(
                                "h-4 fill-primaryText"
                            )}>
                                <HeadingContentBlockIcon />
                            </div>
                        }
                    >
                        <p className={clsx(
                            'font-interTight font-semibold text-sm',
                        )}>Add a new heading</p>
                    </Button>
                    <Button
                        className={clsx(
                            'justify-start gap-1.5 rounded-lg opacity-100',
                            'data-[hover=true]:bg-emphasizingColor2',
                            'transition-all duration-200'
                        )}
                        size='sm'
                        variant='light'
                        onPress={() => addContentBlock({type: 'LIST', text: ''})}
                        startContent={
                            <div className={clsx(
                                "h-4 fill-primaryText"
                            )}>
                                <ListContentBlockIcon />
                            </div>
                        }
                    >
                        <p className={clsx(
                            'font-interTight font-semibold text-sm',
                        )}>Add a new list element</p>
                    </Button>
                    <Button
                        className={clsx(
                            'justify-start gap-1.5 rounded-lg opacity-100',
                            'data-[hover=true]:bg-emphasizingColor2',
                            'transition-all duration-200'
                        )}
                        size='sm'
                        variant='light'
                        onPress={() => addContentBlock({type: 'IMAGE', text: ''})}
                        startContent={
                            <div className={clsx(
                                "h-4 fill-primaryText"
                            )}>
                                <ImageContentBlockIcon />
                            </div>
                        }
                    >
                        <p className={clsx(
                            'font-interTight font-semibold text-sm',
                        )}>Add a new image</p>
                    </Button>
                    <Button
                        className={clsx(
                            'justify-start gap-1.5 rounded-lg opacity-100',
                            'data-[hover=true]:bg-emphasizingColor2',
                            'transition-all duration-200'
                        )}
                        size='sm'
                        variant='light'
                        onPress={() => addContentBlock({type: 'TEXT', text: ''})}
                        startContent={
                            <div className={clsx(
                                "h-4 fill-primaryText"
                            )}>
                                <TextContentBlockIcon />
                            </div>
                        }
                    >
                        <p className={clsx(
                            'font-interTight font-semibold text-sm',
                        )}>Add a new text</p>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}