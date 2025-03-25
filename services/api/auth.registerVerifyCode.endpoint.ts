import axios from "axios"
import { ErrorResponse, MessageResponse } from "./responses.types"

export type ApiAuthRegisterVerifyCodeParams = {
    email: string
    code: string
}

export type ApiAuthRegisterVerifyCodeResponse = {
    message?: MessageResponse
    error?: ErrorResponse
}

export const authRegisterVerifyCodeApi = async ({
    email,
    code
}: ApiAuthRegisterVerifyCodeParams): Promise<ApiAuthRegisterVerifyCodeResponse> => {
    try {
        const response = await axios.post("/api/auth/register/verify-code", {
            email: email,
            code: code
        });

        const message = JSON.parse(JSON.stringify(response.data));

        return {message};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {error: {status: error.response?.data.status, message: error.response?.data.message}}
        }

        return {}
    }
}