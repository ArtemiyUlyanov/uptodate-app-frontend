import { CommentModel } from "@/models/comment"
import axios from "axios"
import { authorizedAxios } from "./axios.config"
import { ErrorResponse } from "./responses.types"
import { MessageResponse } from "./responses.types"

export type ApiCommentCreateParams = {
    content: string
    articleId: number
    resources: File[]
}

export type ApiCommentCreateResponse = {
    model?: CommentModel
    error?: ErrorResponse
}

export const createCommentApi = async ({
    content,
    articleId,
    resources
}: ApiCommentCreateParams): Promise<ApiCommentCreateResponse> => {
    try {
        const formData = new FormData();

        formData.append("content", content);

        resources.forEach((file) => {
            formData.append("resources", file);
        });

        const response = await authorizedAxios.post(`/comments/${articleId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
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