import { useCategories } from "@/hooks/models/useCategories";
import { CategoryModel } from "@/models/category";
import { AddIcon } from "@/ui/icons/AddIcon";
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Listbox, ListboxItem, ListboxSection, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

export type DashboardMutationFormCategoriesProps = React.HTMLProps<HTMLDivElement> & {
    categories: Set<string>
    setCategories: Dispatch<SetStateAction<Set<string>>>
}

export const DashboardMutationFormCategories: React.FC<DashboardMutationFormCategoriesProps> = ({
    categories,
    setCategories
}) => {
    const { categories: allCategories } = useCategories();

    const groupedCategories = allCategories.reduce<Record<string, CategoryModel[]>>((acc, category) => {
        if (!acc[category.parent.english]) {
          acc[category.parent.english] = [];
        }

        acc[category.parent.english].push(category);
        return acc;
    }, {});

    return (
        <div className="flex flex-row flex-wrap items-center w-full gap-2">
            {Array.from(categories).map((category) =>
                <Chip
                    key={category}
                    size="sm"
                    color="secondary"
                    onClose={() => setCategories(prev => new Set(Array.from(prev).filter(option => option !== category)))}
                    classNames={{
                        content: 'font-interTight font-medium text-sm'
                    }}
                >
                    {category}
                </Chip>
            )}
            <Dropdown className="bg-emphasizingColor2">
                <DropdownTrigger>
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
                </DropdownTrigger>
                <DropdownMenu 
                    className={clsx(
                        "justify-start rounded-lg p-1 aspect-[3/4] scrollbar-hide overflow-y-scroll",
                    )}
                    selectionMode="multiple"
                    selectedKeys={categories}
                    defaultSelectedKeys={categories}
                    onSelectionChange={(keys) => setCategories(keys as Set<string>)}
                    disallowEmptySelection
                    closeOnSelect={false}
                >
                    {Object.entries(groupedCategories).map(([section, categories]) =>
                        <DropdownSection 
                            key={section} 
                            title={section}
                            classNames={{
                                heading: 'font-interTight font-semibold text-secondaryText'
                            }}
                        >
                            {categories.map(category => 
                                <DropdownItem
                                    key={category.name.english}
                                    classNames={{
                                        title: "font-interTight font-semibold text-sm text-primaryText",
                                        selectedIcon: 'text-aspectText'
                                    }}
                                >
                                    {category.name.english}
                                </DropdownItem>
                            )}
                        </DropdownSection>
                    )}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}