import { TranslativeString } from "./translative_string"

export type CategoryModel = {
    id: number
    parent: TranslativeString
    name: TranslativeString
    count: number
}

export type ParentCategoriesSet = {
    parent: string
    categories: CategoryModel[]
}