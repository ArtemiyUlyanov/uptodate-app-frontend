import { FiltersType } from "@/hooks/explore/useFilters"
import { ArticleModel } from "@/models/article"
import axios from "axios"
import { authorizedAxios } from "./axios.config"

export type ApiSearchParams = {
    count?: number
    miniSearch: boolean
    page?: number
    pages?: number
    query: string
    filters: FiltersType
}

export type ApiSearchResponse = {
    articles: ArticleModel[]
    totalElements: number
    totalPages: number
}

export const searchApi = async ({
    count,
    page,
    pages,
    query,
    filters
}: ApiSearchParams): Promise<ApiSearchResponse> => {
    const response = await authorizedAxios.get("/articles/search", {
        params: {
            count: count,
            page: page,
            pages: pages,
            query: query,
            filters: encodeURIComponent(JSON.stringify(filters))
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return {articles: JSON.parse(JSON.stringify(response.data.response)), totalElements: response.data.totalElements, totalPages: response.data.totalPages};
}