import { CategoryModel } from "@/models/category"
import axios from "axios"

export type ApiCategoriesGetParams = {
    parent?: string
}

export type ApiCategoriesGetResponse = {
    categories: CategoryModel[]
}

export const categoriesGetApi = async ({
    parent
}: ApiCategoriesGetParams): Promise<ApiCategoriesGetResponse> => {
    if (parent) {
        const response = await axios.get("/api/categories", {
            params: {
                parent: parent
            }
        });

        return {categories: JSON.parse(JSON.stringify(response.data.response))};
    } else {
        const response = await axios.get("/api/categories");
        return {categories: JSON.parse(JSON.stringify(response.data.response))};
    }
}