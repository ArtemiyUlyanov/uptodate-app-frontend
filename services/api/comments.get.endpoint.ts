import { ArticleModel } from "@/models/article"
import { authorizedAxios } from "./axios.config"
import axios from "axios"
import { ErrorResponse } from "./responses.types"
import { CommentModel } from "@/models/comment"

export type ApiCommentsGetParams = {
    articleId?: number
}

export type ApiCommentsGetResponse = {
    model?: CommentModel[]
    error?: ErrorResponse
}

export const getCommentsApi = async ({
    articleId
}: ApiCommentsGetParams): Promise<ApiCommentsGetResponse> => {
    try {
        const response = await authorizedAxios.get(`/comments/article/${articleId}`, {
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