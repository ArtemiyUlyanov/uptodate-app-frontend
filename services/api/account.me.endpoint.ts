import { UserModel } from "@/models/user"
import { ErrorResponse } from "./responses.types"
import { authorizedAxios } from "./axios.config"
import axios from "axios"

export type ApiAccountMeParams = {
    isAuthenticated: boolean
    access_token: string | null
}

export type ApiAccountMeResponse = {
    model?: UserModel
    error?: ErrorResponse
}

export const accountMeApi = async ({
}: ApiAccountMeParams): Promise<ApiAccountMeResponse> => {
    try {
        const response = await authorizedAxios.get("/account", {
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