import React, { useEffect } from "react";
import { DashboardSectionTemplate } from "./DashboardNavigation";
import { Accordion, AccordionItem, Button, Divider } from "@heroui/react";
import clsx from "clsx";
import { UnwrappingElementIcon } from "@/ui/icons/UnwrappingElementIcon";
import { DashboardNavigationOption } from "./DashboardNavigationOption";

export type DashboardNavigationSectionListProps = React.HTMLProps<HTMLDivElement> & {
    sections: DashboardSectionTemplate[]
}

export const DashboardNavigationSectionList: React.FC<DashboardNavigationSectionListProps> = ({
    sections
}) => {
    return (
        <Accordion
            className="flex flex-col gap-2 p-0 w-full"
            itemClasses={{
                base: clsx(
                    'p-0 rounded-lg shadow-none bg-[transparent] h-auto'
                ),
                trigger: clsx(
                    'w-full gap-3 p-0 pt-1.5 pb-1.5 bg-[transparent] rounded-lg',
                    'transition-all duration-200',
                    'hover:bg-emphasizingColor2'
                ),
                startContent: 'pl-3',
                title: 'font-interTight font-semibold text-sm',
                indicator: 'text-secondaryText mr-3'
            }}
            showDivider={false}
            variant="splitted"
        >
            {sections.map(section => 
                <AccordionItem
                    key={section.name}
                    aria-label={section.name}
                    title={section.name}
                    startContent={section.icon}
                    indicator={
                        <div className={clsx(
                            'h-1'
                        )}>
                            <UnwrappingElementIcon
                                className={clsx(
                                    'w-auto h-full fill-secondaryColor',
                                    'transition-all duration-200 rotate-90',
                                )}
                            />
                        </div>
                    }
                >
                    <div className="flex flex-row pl-4 gap-2 w-full h-auto">
                        <Divider orientation="vertical" className="h-auto bg-borderColor" />
                        <div className="flex flex-col items-end gap-1 w-full h-auto">
                            {section.options.map((option) =>
                                <DashboardNavigationOption option={option} />
                            )}
                        </div>
                    </div>
                </AccordionItem>
            )}
        </Accordion>
    );
}