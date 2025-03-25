'use client';

import { useFilters } from "@/hooks/explore/useFilters";
import { Listbox, ListboxItem } from "@heroui/react";
import { useEffect, useState } from "react";
import { FilterOption } from "./filter.types";

export type SortFilterProps = React.HTMLProps<HTMLDivElement> & {
    name: string
    options: FilterOption[]
}

export const SortFilter: React.FC<SortFilterProps> = ({
    name,
    options
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

    const { filters, setFilter } = useFilters();

    useEffect(() => {
        setSelectedKeys(new Set([filters.sort_by as string]));
    }, []);

    useEffect(() => {
        setFilter('sort_by', Array.from(selectedKeys)[0]);
    }, [selectedKeys]);

    return (
        <Listbox
            disallowEmptySelection
            selectedKeys={selectedKeys}
            selectionMode="single"
            variant="flat"
            className='rounded-lg'
            onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
        >
            {options.map(option => 
                <ListboxItem
                    key={option.value}
                    classNames={{
                        title: "font-interTight font-medium text-sm text-primaryText",
                        selectedIcon: 'text-aspectText'
                    }}
                >
                    {option.name}
                </ListboxItem>
            )}
        </Listbox>
    );
}