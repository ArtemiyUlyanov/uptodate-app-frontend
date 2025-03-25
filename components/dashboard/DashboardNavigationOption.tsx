import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { DashboardOptionTemplate } from "./DashboardNavigation";
import clsx from "clsx";
import { ConfirmationPopover } from "@/ui/popovers/ConfirmationPopover";

export type DashboardNavigationOptionProps = React.HTMLProps<HTMLDivElement> & {
    option: DashboardOptionTemplate
}

export const DashboardNavigationOption: React.FC<DashboardNavigationOptionProps> = ({
    option
}) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    as='a'
                    href={option.link}
                    className={clsx(
                        'w-full justify-start pl-3 pr-3 pt-1.5 pb-1.5 h-auto gap-3 rounded-lg opacity-100',
                        'data-[hover=true]:bg-emphasizingColor2',
                        'transition-all duration-200',
                        option.selected && 'bg-emphasizingColor2 text-primaryText',
                        !option.selected && 'text-primaryText',
                        'transition-all duration-200'
                    )}
                    isDisabled={option.selected}
                    size='sm'
                    variant='light'
                    startContent={
                        <div className={clsx(
                            option.selected && "fill-primaryColor",
                            !option.selected && "fill-primaryColor"
                        )}>
                            {option.icon}
                        </div>
                    }
                >
                    <p className={clsx(
                        'font-interTight font-semibold text-sm w-full max-w-xs truncate line-clamp-2 text-wrap',
                    )}>{option.text}</p>
                </Button>
            </PopoverTrigger>
            <PopoverContent className={clsx(
                "bg-emphasizingColor2 border border-borderColor rounded-lg p-1 w-48",
            )}>
                <div className="flex flex-col gap-1 w-full">
                    {option.popoverProps?.actions.map(action =>
                        action.confirmationProps ?
                            <ConfirmationPopover
                                text={action.confirmationProps.text}
                                action={action.onClick}
                            >
                                {(onOpen) => (
                                    <Button
                                        as='a'
                                        href={action.link}
                                        className={clsx(
                                            'justify-start gap-1.5 rounded-lg opacity-100',
                                            'data-[hover=true]:bg-emphasizingColor3',
                                            'transition-all duration-200'
                                        )}
                                        size='sm'
                                        variant='light'
                                        // onPress={() => addContentBlock({type: 'HEADING', text: ''})}
                                        startContent={action.icon}
                                    >
                                        <p className={clsx(
                                            'font-interTight font-semibold text-sm',
                                            action.classNames?.text
                                        )}>{action.text}</p>
                                    </Button>
                                )}
                            </ConfirmationPopover>
                        :
                            <Button
                                as='a'
                                href={action.link}
                                className={clsx(
                                    'justify-start gap-1.5 rounded-lg opacity-100',
                                    'data-[hover=true]:bg-emphasizingColor3',
                                    'transition-all duration-200'
                                )}
                                size='sm'
                                variant='light'
                                onPress={action.onClick}
                                startContent={action.icon}
                            >
                                <p className={clsx(
                                    'font-interTight font-semibold text-sm',
                                    action.classNames?.text
                                )}>{action.text}</p>
                            </Button>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}