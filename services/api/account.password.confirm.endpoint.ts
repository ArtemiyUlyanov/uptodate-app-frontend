import { UserModel } from "@/models/user"
import { ErrorResponse } from "./responses.types"
import { authorizedAxios } from "./axios.config"
import axios from "axios"

export type ApiAccountPasswordConfirmParams = {
    code: string
}

export type ApiAccountPasswordConfirmResponse = {
    model?: UserModel
    error?: ErrorResponse
}

export const accountPasswordConfirmApi = async ({
    code
}: ApiAccountPasswordConfirmParams): Promise<ApiAccountPasswordConfirmResponse> => {
    try {
        const response = await authorizedAxios.post("/account/password", null, {
            params: {
                code: code
            },
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