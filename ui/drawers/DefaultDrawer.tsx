import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, Tooltip, useDisclosure, UseDisclosureProps } from "@heroui/react";
import { CloseIcon } from "../icons/CloseIcon";
import React, { useEffect, useMemo, useRef } from "react";
import { DrawerTriggerProps, DrawerBodyProps } from "./drawer_components";
import clsx from "clsx";

export type DefaultDrawerProps = {
    title: string
    closeTooltip: string
    customDisclosure?: ReturnType<typeof useDisclosure>
    onOpen?: () => void
    children: [React.ReactElement<DrawerTriggerProps>, React.ReactElement<DrawerBodyProps>]
}

export const DefaultDrawer: React.FC<DefaultDrawerProps> = ({
    title,
    closeTooltip,
    customDisclosure,
    children
}) => {
    const { isOpen, onOpen, onOpenChange } = customDisclosure ? customDisclosure : useDisclosure();
    const [trigger, body] = children;

    return (
        <>
            {React.cloneElement(trigger, {
                children: () => trigger.props.children(onOpen)
            })}
            <Drawer
                isOpen={isOpen}
                onOpenChange={(isOpen) => {
                    onOpenChange()
                    isOpen && onOpen()
                }}
                backdrop="blur"
                shouldBlockScroll={false}
                hideCloseButton
                classNames={{
                    wrapper: "z-[99999]",
                    backdrop: 'z-[99998]',
                    base: "bg-emphasizingColor data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2 rounded-medium"
                }}
                motionProps={{
                    variants: {
                        enter: {
                            opacity: 1,
                            x: 0,
                        },
                        exit: {
                            x: 100,
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
                                            "text-secondaryText",
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