import { ArticleModel } from "@/models/article"
import { authorizedAxios } from "./axios.config"
import axios from "axios"
import { ErrorResponse } from "./responses.types"
import qs from 'qs';

export type ApiArticleGetParams = {
    id?: number
    slug?: string
}

export type ApiArticleGetResponse = {
    model?: ArticleModel
    error?: ErrorResponse
}

export const articleGetApi = async ({
    id,
    slug
}: ApiArticleGetParams): Promise<ApiArticleGetResponse> => {
    try {
        if (id) {
            const response = await authorizedAxios.get(`/articles/id/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        
            const model = JSON.parse(JSON.stringify(response.data.response));
            return {model};
        }

        if (slug) {
            const response = await authorizedAxios.get(`/articles/slug/${slug}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        
            const model = JSON.parse(JSON.stringify(response.data.response));
            return {model};
        }

        return {};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {error: {status: error.response?.data.status, message: error.response?.data.message}}
        }
        
        return {};
    }
}

export type ApiArticlesGetParams = {
    ids?: Array<number>
}

export type ApiArticlesGetResponse = {
    models?: ArticleModel[]
    error?: ErrorResponse
}

export const articlesGetApi = async ({
    ids
}: ApiArticlesGetParams): Promise<ApiArticlesGetResponse> => {
    try {
        const response = await authorizedAxios.get(`/articles`, {
            params: {
                ids: ids
            },
            paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        const models = JSON.parse(JSON.stringify(response.data.response));

        return {models};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {error: {status: error.response?.data.status, message: error.response?.data.message}}
        }
        
        return {};
    }
}