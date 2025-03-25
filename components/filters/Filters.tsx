'use client';

import { SortFilter } from "@/components/filters/SortFilter";
import { CategoriesFilter } from "@/components/filters/CategoriesFilter";
import { useFilters } from "@/hooks/explore/useFilters";
import { useDictionary } from "@/hooks/useDictionary";
import { select_value_by_language } from "@/models/translative_string";
import TransparentButton from "@/ui/buttons/TransparentButton";
import { DefaultDrawer } from "@/ui/drawers/DefaultDrawer";
import { DrawerBody, DrawerTrigger } from "@/ui/drawers/drawer_components";
import { FiltersIcon } from "@/ui/icons/FiltersIcon";
import { SortbyFilterIcon } from "@/ui/icons/SortbyFilterIcon";
import { CategoriesFilterIcon } from "@/ui/icons/CategoriesFilterIcon";
import { Accordion, AccordionItem, Chip } from "@heroui/react";
import clsx from "clsx";
import { useMemo } from "react";
import { useCategories } from "@/hooks/models/useCategories";
import { UserModel } from "@/models/user";
import { UnwrappingElementIcon } from "@/ui/icons/UnwrappingElementIcon";

export type FiltersProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
}

const Filters: React.FC<FiltersProps> = ({
    user
}) => {
    const { categories } = useCategories();

    const { filters } = useFilters();
    const { language, translate } = useDictionary(user);

    const sortedCategories = useMemo(() =>
        Array.from(
            new Map(
                categories.map(category => [category.parent.english, category.parent])
            )
        ).map(([english, parent]) => {
            const options = categories.filter(category => category.parent.english === english).map(category => 
                ({
                    name: select_value_by_language(category.name, language),
                    count: category.count,
                    value: category.name.english
                })
            )
            return {
                name: select_value_by_language(parent, language),
                count: options.map(option => option.count).reduce((acc, current) => acc + current, 0),
                options: options
            }
        })
    , [categories, language]);
    
    return (
        <div className={clsx(
            'flex flex-row justify-end gap-4'
        )}>
            <DefaultDrawer
                title={translate('common.filters.drawer.name')}
                closeTooltip={translate('common.filters.drawer.close_tooltip')}
            >
                <DrawerTrigger>
                    {(onClick) => (
                        <TransparentButton 
                            text={translate('common.filters.drawer.open_drawer_button')}
                            hoverEffect="opacity"
                            icon={
                                <div className="h-3 fill-primaryText">
                                    <FiltersIcon />
                                </div>
                            }
                            onClickButton={onClick}
                        />
                    )}
                </DrawerTrigger>
                <DrawerBody>
                    <Accordion
                        isCompact
                        itemClasses={{
                            title: 'font-interTight font-semibold text-primaryText text-base'
                        }}
                    >
                        <AccordionItem 
                            key='sort_by'
                            title={translate('common.filters.sort_by.name')}
                            startContent={
                                <div className="h-5 fill-secondaryText">
                                    <SortbyFilterIcon />
                                </div>
                            }
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
                            <SortFilter 
                                name={translate('common.filters.sort_by.name')}
                                options={[
                                    {
                                        name: translate('common.filters.sort_by.options.ascending'),
                                        value: 'Ascending'
                                    },
                                    {
                                        name: translate('common.filters.sort_by.options.descending'),
                                        value: 'Descending'
                                    },
                                    {
                                        name: translate('common.filters.sort_by.options.alphabetically'),
                                        value: 'Alphabetically'
                                    }
                                ]}
                            />
                        </AccordionItem>
                        <AccordionItem
                            key='categories'
                            title={
                                <div className="flex flex-row gap-2">
                                    <p>{translate('common.filters.categories.name')}</p> 
                                    {filters.categories.length > 0 &&
                                        <Chip
                                            size="sm"
                                            color="secondary"
                                            className={clsx(
                                                'font-interTight font-semibold text-primaryText aspect-square p-0 text-center text-sm'
                                            )}
                                        >
                                            {filters.categories.length}
                                        </Chip>
                                    }
                                </div>
                            }
                            startContent={
                                <div className="h-5 fill-secondaryText">
                                    <CategoriesFilterIcon 
                                        className="fill-primaryText" 
                                    />
                                </div>
                            }
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
                            <CategoriesFilter 
                                user={user}
                                name={translate('common.filters.categories.name')}
                                sections={sortedCategories}
                            />
                        </AccordionItem>
                    </Accordion>
                </DrawerBody>
            </DefaultDrawer>
        </div>
    );
}

export default Filters;