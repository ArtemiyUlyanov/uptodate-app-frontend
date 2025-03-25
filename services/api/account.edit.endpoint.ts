import { UserModel } from "@/models/user"
import { ErrorResponse } from "./responses.types"
import { authorizedAxios } from "./axios.config"
import axios from "axios"
import { UserSettingsModel } from "@/models/user_settings"

export type ApiAccountEditParams = {
    firstName: string
    lastName: string
    username: string
    settings: UserSettingsModel
}

export type ApiAccountEditResponse = {
    model?: UserModel
    error?: ErrorResponse
}

export const accountEditApi = async ({
    firstName,
    lastName,
    username,
    settings
}: ApiAccountEditParams): Promise<ApiAccountEditResponse> => {
    try {
        const response = await authorizedAxios.put("/account", settings, {
            params: {
                firstName: firstName,
                lastName: lastName,
                username: username
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