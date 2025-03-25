import { UserModel } from "@/models/user"
import { ErrorResponse } from "./responses.types"
import { authorizedAxios } from "./axios.config"
import axios from "axios"

export type ApiAccountIconUploadParams = {
    icon: File
}

export type ApiAccountIconUploadResponse = {
    model?: UserModel
    error?: ErrorResponse
}

export const accountUploadIconApi = async ({
    icon
}: ApiAccountIconUploadParams): Promise<ApiAccountIconUploadResponse> => {
    try {
        const formData = new FormData();

        formData.append('icon', icon);

        const response = await authorizedAxios.put("/account/icon", formData, {
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