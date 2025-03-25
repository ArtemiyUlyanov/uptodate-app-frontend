import { UserModel } from "@/models/user"
import { ErrorResponse, MessageResponse } from "./responses.types"
import { authorizedAxios } from "./axios.config"
import axios from "axios"

export type ApiAccountPasswordEditParams = {
    password: string
    repeatedPassword: string
}

export type ApiAccountPasswordEditResponse = {
    message?: MessageResponse
    error?: ErrorResponse
}

export const accountPasswordEditApi = async ({
    password,
    repeatedPassword
}: ApiAccountPasswordEditParams): Promise<ApiAccountPasswordEditResponse> => {
    try {
        const response = await authorizedAxios.patch("/account/password", null, {
            params: { password, repeatedPassword },
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