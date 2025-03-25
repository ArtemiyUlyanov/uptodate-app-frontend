'use client';

import { useFilters } from "@/hooks/explore/useFilters";
import { useLocalSearch } from "@/hooks/explore/useLocalSearch";
import { useDictionary } from "@/hooks/useDictionary";
import { parseQueryText } from "@/utils/text.utils";
import { Button, Chip, Listbox, ListboxItem, ListboxSection, ScrollShadow } from "@heroui/react";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { CloseIcon } from "../../ui/icons/CloseIcon";
import { SearchIcon } from "../../ui/icons/SearchIcon";
import IconInput from "../../ui/inputs/IconInput";
import { CategoriesFilterOption, CategoriesFilterSection } from "./filter.types";
import { UserModel } from "@/models/user";

export type CategoriesFilterProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    name: string
    sections: CategoriesFilterSection[]
}

export const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
    user,
    name,
    sections
}) => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

    const { translate } = useDictionary(user);

    const { searchInput, query, setQuery } = useLocalSearch(
        <IconInput
            placeholder={translate('common.filters.search_placeholder').replace('%name%', name.toLowerCase())}
            customClassName='w-full'
            inputClassName='text-base'
            fullBordered={true}
            icon={
                <SearchIcon 
                    className="fill-secondaryText" 
                />
            }
        />
    );

    const queriedSections = useMemo(() => 
        sections.map(section => ({name: section.name, count: section.count, options: section.options.filter(option => option.name.toLowerCase().includes(query.toLowerCase()))}))
    , [query]);

    const { filters, setFilter } = useFilters();

    useEffect(() => {
        setSelectedKeys(new Set(filters.categories));
    }, []);

    useEffect(() => {
        setFilter('categories', Array.from(selectedKeys));
    }, [selectedKeys, setFilter]);

    return (
        <Listbox
            aria-label="Single selection example"
            defaultSelectedKeys={selectedKeys}
            selectedKeys={selectedKeys}
            key='categories'
            selectionMode="multiple"
            variant="flat"
            className='w-full rounded-lg'
            onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
            topContent={
                <div className={clsx(
                    'flex flex-col gap-2 w-full'
                )}>
                    {searchInput}
                    <ScrollShadow
                        hideScrollBar
                        className={clsx(
                            "w-full flex items-center gap-1",
                            selectedKeys.size <= 0 && 'hidden'
                        )}
                        orientation="horizontal"
                    >
                        <Button
                            isIconOnly
                            className={clsx(
                                "text-secondaryText",
                                'data-[hover=true]:bg-emphasizingColor2'
                            )}
                            size="sm"
                            variant="light"
                            onPress={() => setSelectedKeys(new Set([]))}
                        >
                            <div 
                                className="w-3 aspect-square"
                            >
                                <CloseIcon customClassName="fill-secondaryText" />
                            </div>
                        </Button>
                        {Array.from(selectedKeys).map(key =>
                            <Chip
                                key={key}
                                size="sm"
                                color="secondary"
                                onClose={() => setSelectedKeys(prev => new Set([...prev].filter(option => option !== key)))}
                                classNames={{
                                    content: 'font-interTight font-medium text-sm'
                                }}
                            >
                                {key}
                            </Chip>
                        )}
                    </ScrollShadow>
                </div>
            }
        >
            {queriedSections.map(({name, count, options}, index) => 
                <ListboxSection
                    showDivider
                    key={index}
                    title={`${name} (${count})`}
                    className={clsx(
                        'p-0',
                        options.length <= 0 && 'hidden'
                    )}
                    classNames={{
                        heading: 'font-interTight font-semibold text-sm text-secondaryText'
                    }}
                >
                    {options.map(option => 
                        <ListboxItem
                            key={option.value}
                            classNames={{
                                title: "font-interTight font-medium text-sm text-primaryText",
                                selectedIcon: 'text-aspectText'
                            }}
                            className={clsx(
                                query && !option.name.toLowerCase().includes(query.toLowerCase()) && 'hidden'
                            )}
                        >
                            {parseQueryText(`${option.name} (${(option as CategoriesFilterOption).count})`, query || '', 'bg-aspectText text-primaryText')}
                        </ListboxItem>
                    )}
                </ListboxSection>
            )}
        </Listbox>
    );
}