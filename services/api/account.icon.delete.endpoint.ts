import { UserModel } from "@/models/user"
import { ErrorResponse } from "./responses.types"
import { authorizedAxios } from "./axios.config"
import axios from "axios"

export type ApiAccountIconDeleteParams = {
}

export type ApiAccountIconDeleteResponse = {
    model?: UserModel
    error?: ErrorResponse
}

export const accountDeleteIconApi = async ({
}: ApiAccountIconDeleteParams): Promise<ApiAccountIconDeleteResponse> => {
    try {
        const response = await authorizedAxios.delete("/account/icon", {
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