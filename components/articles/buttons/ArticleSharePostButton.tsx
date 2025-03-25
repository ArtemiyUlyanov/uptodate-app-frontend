'use client';

import { useDictionary } from "@/hooks/useDictionary";
import { CentredDrawer } from "@/ui/drawers/CentredDrawer";
import { DrawerBody, DrawerTrigger } from "@/ui/drawers/drawer_components";
import { useCopyToClipboard, useTimeoutFn } from "react-use";
import { ShareIcon } from "@/ui/icons/ShareIcon";
import { addToast, Button, Popover, PopoverContent, PopoverTrigger, Snippet, Tooltip } from "@heroui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

export type ArticleSharePostButtonProps = React.HTMLProps<HTMLDivElement> & {
    url: string
}

export const ArticleSharePostButton: React.FC<ArticleSharePostButtonProps> = ({
    url
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [_, copyToClipboard] = useCopyToClipboard();

    useEffect(() => {
        if (isOpen) {
            copyToClipboard(url);

            const timeout = setTimeout(() => setIsOpen(false), 1000);
            return () => clearTimeout(timeout);
        }
    }, [isOpen])

    return (
        <Popover
            isOpen={isOpen}
            onOpenChange={setIsOpen}
        >
            <Tooltip
                content='Copy link to clipboard'
                closeDelay={0}
                classNames={{
                    content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryColor'
                }}
                hidden={isOpen}
            >
                <div className="max-w-fit">
                    <PopoverTrigger>
                        <Button
                            isIconOnly
                            className={clsx(
                                'bg-[transparent]',
                                'data-[hover=true]:bg-emphasizingColor2',
                                'transition-all duration-200',
                            )}
                            variant='light'
                            size="sm"
                        >
                            <div 
                                className={clsx(
                                    'h-4 fill-primaryColor',
                                )}
                            >
                                <ShareIcon />
                            </div>
                        </Button>
                    </PopoverTrigger>
                </div>
            </Tooltip>
            <PopoverContent className="bg-emphasizingColor2 border border-borderColor">
                <p className='font-interTight font-semibold text-primaryColor'>Copied!</p>
            </PopoverContent>
        </Popover>
    );
}