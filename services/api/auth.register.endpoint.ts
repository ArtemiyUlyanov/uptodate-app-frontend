import axios from "axios"
import { ErrorResponse } from "./responses.types"
import { MessageResponse } from "./responses.types"

export type ApiAuthRegisterParams = {
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
}

export type ApiAuthRegisterResponse = {
    message?: MessageResponse
    error?: ErrorResponse
}

export const authRegisterApi = async ({
    firstName,
    lastName,
    email,
    username,
    password
}: ApiAuthRegisterParams): Promise<ApiAuthRegisterResponse> => {
    try {
        const response = await axios.post("/api/auth/register", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password
        });

        const message = JSON.parse(JSON.stringify(response.data));

        return {message};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {error: {status: error.response?.data.status, message: error.response?.data.error}}
        }

        return {}
    }
}