import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, Tooltip, useDisclosure } from "@heroui/react"
import { DrawerTriggerProps, DrawerBodyProps } from "./drawer_components"
import React from "react"
import { CloseIcon } from "../icons/CloseIcon"
import clsx from "clsx"

export type CentredDrawerProps = React.HTMLProps<HTMLElement> & {
    drawerSize: 'xs' | 'sm' | 'md'
    title: string
    closeTooltip: string
    children: [React.ReactElement<DrawerTriggerProps>, React.ReactElement<DrawerBodyProps>]
}

export const CentredDrawer: React.FC<CentredDrawerProps> = ({
    drawerSize,
    title,
    closeTooltip,
    children
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [trigger, body] = children;

    return (
        <>
            {React.cloneElement(trigger, {
                children: () => trigger.props.children(onOpen)
            })}
            <Drawer
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop="blur"
                placement="top"
                shouldBlockScroll={false}
                isDismissable={false}
                hideCloseButton
                className={clsx(
                    "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                    drawerSize === 'xs' && 'w-1/5',
                    drawerSize === 'sm' && 'w-1/4',
                    drawerSize === 'md' && 'w-1/3'
                )}
                classNames={{
                    wrapper: "z-[99999]",
                    backdrop: 'z-[99998]',
                    base: "bg-emphasizingColor data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2 rounded-medium"
                }}
                motionProps={{
                    variants: {
                        enter: {
                            opacity: 1,
                            y: 0,
                        },
                        exit: {
                            y: -100,
                            opacity: 0,
                        },
                    },
                }}
                
            >
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="absolute top-0 inset-x-0 z-50 bg-emphasizingColor border-b border-borderColor flex flex-row items-center gap-2 px-2 py-2 justify-start">
                                <Tooltip
                                    content={closeTooltip}
                                    closeDelay={0}
                                    classNames={{
                                        content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryColor'
                                    }}
                                >
                                    <Button
                                        isIconOnly
                                        className={clsx(
                                            'text-secondaryText',
                                            'data-[hover=true]:bg-emphasizingColor2'
                                        )}
                                        size="sm"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        <div 
                                            className="w-3 aspect-square"
                                        >
                                            <CloseIcon customClassName="fill-secondaryText" />
                                        </div>
                                    </Button>
                                </Tooltip>
                                <p className="font-interTight font-semibold text-base text-primaryText">{title}</p>
                            </DrawerHeader>
                            <DrawerBody className="pt-16 scrollbar-hide">
                                {React.cloneElement(body, {
                                    children: () => typeof body.props.children === 'function' ? body.props.children(onClose) : body.props.children
                                })}
                            </DrawerBody>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}