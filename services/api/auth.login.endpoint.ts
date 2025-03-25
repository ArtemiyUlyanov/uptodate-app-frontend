import axios from "axios"
import { ErrorResponse } from "./responses.types"

export type ApiAuthLoginParams = {
    username: string
    password: string
}

export type ApiAuthLoginResponse = {
    status?: number
    access_token?: string
    refresh_token?: string
    error?: ErrorResponse
}

export const authLoginApi = async ({
    username,
    password
}: ApiAuthLoginParams): Promise<ApiAuthLoginResponse> => {
    try {
        const response = await axios.post("/api/auth/login", {
            username: username,
            password: password
        });

        return {access_token: response.data.access_token, refresh_token: response.data.refresh_token, status: response.data.status};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {error: {status: error.response?.data.status, message: error.response?.data.message}}
        }

        return {}
    }
}