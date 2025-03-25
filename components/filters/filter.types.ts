export type FilterOption = {
    name: string
    value: string
}

export type FilterSection = {
    name: string
    options: FilterOption[]
}

export type CategoriesFilterOption = FilterOption & {
    count: number
}

export type CategoriesFilterSection = FilterSection & {
    count: number
    options: CategoriesFilterOption[]
}