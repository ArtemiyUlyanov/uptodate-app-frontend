import axios from "axios"
import { authorizedAxios } from "./axios.config"
import { ErrorResponse } from "./responses.types"
import { MessageResponse } from "./responses.types"
import { CommentModel } from "@/models/comment"

export type ApiCommentLikeParams = {
    id: number
}

export type ApiCommentLikeResponse = {
    model?: CommentModel
    error?: ErrorResponse
}

export const likeCommentApi = async ({
    id
}: ApiCommentLikeParams): Promise<ApiCommentLikeResponse> => {
    try {
        const response = await authorizedAxios.patch(`/comments/${id}/like`, null, {
            headers: {
                'Content-Type': 'application/json'
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