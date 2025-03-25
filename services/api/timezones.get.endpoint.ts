import { UserModel } from "@/models/user"
import { ErrorResponse } from "./responses.types"
import { authorizedAxios } from "./axios.config"
import axios from "axios"
import { TimezoneModel } from "@/models/timezone"

export type ApiTimezonesGetParams = {
    query?: string
}

export type ApiTimezonesGetResponse = {
    timezones?: Array<TimezoneModel>
    error?: ErrorResponse
}

export const timezonesGetApi = async ({
    query
}: ApiTimezonesGetParams): Promise<ApiTimezonesGetResponse> => {
    try {
        const response = await authorizedAxios.get("/utils/timezones", {
            params: {
                query: query
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        const timezones = JSON.parse(JSON.stringify(response.data.response));
        return {timezones};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {error: {status: error.response?.data.status, message: error.response?.data.message}}
        }
        
        return {};
    }
}