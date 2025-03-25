import axios from "axios"
import { authorizedAxios } from "./axios.config"
import { ErrorResponse } from "./responses.types"
import { MessageResponse } from "./responses.types"
import { ArticleModel } from "@/models/article"

export type ApiArticleDeleteParams = {
    id: number
}

export type ApiArticleDeleteResponse = {
    message?: MessageResponse
    error?: ErrorResponse
}

export const deleteArticleApi = async ({
    id
}: ApiArticleDeleteParams): Promise<ApiArticleDeleteResponse> => {
    try {
        const response = await authorizedAxios.delete(`/articles/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        const message = JSON.parse(JSON.stringify(response.data));
        return {message};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {error: {status: error.response?.data.status, message: error.response?.data.message}}
        }
        
        return {};
    }
}