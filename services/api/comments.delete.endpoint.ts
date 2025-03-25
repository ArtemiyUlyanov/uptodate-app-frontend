import axios from "axios"
import { authorizedAxios } from "./axios.config"
import { ErrorResponse } from "./responses.types"
import { MessageResponse } from "./responses.types"

export type ApiCommentDeleteParams = {
    id: number
}

export type ApiCommentDeleteResponse = {
    message?: MessageResponse
    error?: ErrorResponse
}

export const deleteCommentApi = async ({
    id
}: ApiCommentDeleteParams): Promise<ApiCommentDeleteResponse> => {
    try {
        const response = await authorizedAxios.delete(`/comments/${id}`, {
            headers: {
                'Content-Type': 'application/json'
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