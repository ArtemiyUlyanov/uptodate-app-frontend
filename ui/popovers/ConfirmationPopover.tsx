import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import React, { useState } from "react";
import DefaultButton from "../buttons/DefaultButton";
import TransparentButton from "../buttons/TransparentButton";

export type ConfirmationPopoverProps = {
    text: string
    action?: () => void
    children: (onOpen: () => void) => React.ReactNode
}

export const ConfirmationPopover: React.FC<ConfirmationPopoverProps> = ({
    text,
    action,
    children
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Popover
            isOpen={isOpen}
            onOpenChange={setIsOpen}
        >
            <PopoverTrigger>
                {children(() => setIsOpen(true))}
            </PopoverTrigger>
            <PopoverContent className="bg-emphasizingColor2 p-3 border border-borderColor">
                <div className="flex flex-col gap-2">
                    <p className='font-interTight font-semibold text-primaryColor'>{text}</p>
                    <div className="flex flex-row gap-2">
                        <DefaultButton
                            text='Perform'
                            customClassName='font-interTight pl-2 pr-2 pt-2 pb-2 font-semibold rounded-md text-sm'
                            onClickButton={action}
                            size="sm"
                        />
                        <DefaultButton
                            text='Cancel'
                            customClassName='font-interTight pl-2 pr-2 pt-2 pb-2 font-semibold rounded-md text-sm bg-emphasizingColor3'
                            onClickButton={() => setIsOpen(false)}
                            size="sm"
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}