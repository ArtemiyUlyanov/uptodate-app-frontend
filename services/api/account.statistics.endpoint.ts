import { UserModel } from "@/models/user"
import { ErrorResponse } from "./responses.types"
import { authorizedAxios } from "./axios.config"
import axios from "axios"
import { UserStatisticsModel } from "@/models/user_statistics"

export type ApiAccountStatisticsParams = {
    isAuthenticated: boolean
    access_token: string | null
}

export type ApiAccountStatisticsResponse = {
    model?: UserStatisticsModel
    error?: ErrorResponse
}

export const accountStatisticsApi = async ({
}: ApiAccountStatisticsParams): Promise<ApiAccountStatisticsResponse> => {
    try {
        const response = await authorizedAxios.get("/account/statistics", {
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