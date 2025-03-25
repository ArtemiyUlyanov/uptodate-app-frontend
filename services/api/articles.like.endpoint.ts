import axios from "axios"
import { authorizedAxios } from "./axios.config"
import { ErrorResponse } from "./responses.types"
import { MessageResponse } from "./responses.types"
import { ArticleModel } from "@/models/article"

export type ApiArticleLikeParams = {
    id: number
}

export type ApiArticleLikeResponse = {
    model?: ArticleModel
    error?: ErrorResponse
}

export const likeArticleApi = async ({
    id
}: ApiArticleLikeParams): Promise<ApiArticleLikeResponse> => {
    try {
        const response = await authorizedAxios.patch(`/articles/${id}/like`, null, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        const model = JSON.parse(JSON.stringify(response.data.response));
        return {model};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {error: {status: error.response?.data.status, message: error.response?.data.message}}
        }
        
        return {};
    }
}