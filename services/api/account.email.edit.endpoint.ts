import { UserModel } from "@/models/user"
import { ErrorResponse, MessageResponse } from "./responses.types"
import { authorizedAxios } from "./axios.config"
import axios from "axios"

export type ApiAccountEmailEditParams = {
    email: string
}

export type ApiAccountEmailEditResponse = {
    message?: MessageResponse
    error?: ErrorResponse
}

export const accountEmailEditApi = async ({
    email
}: ApiAccountEmailEditParams): Promise<ApiAccountEmailEditResponse> => {
    try {
        const response = await authorizedAxios.patch("/account/email", null, {
            params: {
                email: email
            },
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