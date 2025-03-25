import { UserModel } from "@/models/user"
import { ErrorResponse } from "./responses.types"
import { authorizedAxios } from "./axios.config"
import axios from "axios"

export type ApiAccountEmailConfirmParams = {
    email: string
    code: string
}

export type ApiAccountEmailConfirmResponse = {
    model?: UserModel
    error?: ErrorResponse
}

export const accountEmailConfirmApi = async ({
    email,
    code
}: ApiAccountEmailConfirmParams): Promise<ApiAccountEmailConfirmResponse> => {
    try {
        const response = await authorizedAxios.post("/account/email", null, {
            params: {
                email: email,
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