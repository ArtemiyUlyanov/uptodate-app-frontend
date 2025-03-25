import { UserModel } from "@/models/user"
import { ErrorResponse } from "./responses.types"
import { authorizedAxios } from "./axios.config"
import axios from "axios"
import qs from 'qs'

export type ApiUserGetParams = {
    id: number
}

export type ApiUserGetResponse = {
    model?: UserModel
    error?: ErrorResponse
}

export type ApiUsersGetParams = {
    ids: number[]
}

export type ApiUsersGetResponse = {
    models?: UserModel[]
    error?: ErrorResponse
}

export const userGetApi = async ({
    id
}: ApiUserGetParams): Promise<ApiUserGetResponse> => {
    try {
        const response = await authorizedAxios.get(`/users/${id}`, {
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

export const usersGetApi = async ({
    ids
}: ApiUsersGetParams): Promise<ApiUsersGetResponse> => {
    try {
        const response = await authorizedAxios.get(`/users`, {
            params: {
                ids: ids
            },
            paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        const models = JSON.parse(JSON.stringify(response.data.response));
        return {models};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {error: {status: error.response?.data.status, message: error.response?.data.message}}
        }
        
        return {};
    }
}