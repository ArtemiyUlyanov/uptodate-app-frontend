import { UserModel } from "@/models/user"
import { ErrorResponse, MessageResponse } from "./responses.types"
import { authorizedAxios } from "./axios.config"
import axios from "axios"
import { UserSettingsModel } from "@/models/user_settings"

export type ApiAccountDeleteParams = {
}

export type ApiAccountDeleteResponse = {
    message?: MessageResponse
    error?: ErrorResponse
}

export const accountDeleteApi = async ({
}: ApiAccountDeleteParams): Promise<ApiAccountDeleteResponse> => {
    try {
        const response = await authorizedAxios.delete("/account", {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        const message = JSON.parse(JSON.stringify(response.data));

        alert(message);

        return {message};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {error: error.response?.data}
        }
        
        return {};
    }
}