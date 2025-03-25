import { UserModel } from "@/models/user"
import { ErrorResponse } from "./responses.types"
import { authorizedAxios } from "./axios.config"
import axios from "axios"

export type ApiAccountChangesAvailableParams = {
    username: string
    email: string
}

export type ApiAccountChangesAvailableResponse = {
    conflictedColumns?: Array<'USERNAME' | 'EMAIL'>
    changesAvailable?: boolean
}

export const accountChangesAvailableApi = async ({
    username,
    email
}: ApiAccountChangesAvailableParams): Promise<ApiAccountChangesAvailableResponse> => {
    try {
        const response = await authorizedAxios.get("/account/changes-available", {
            params: { 
                username: username, 
                email: email 
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        const data = JSON.parse(JSON.stringify(response.data));
        return {conflictedColumns: data.conflictedColumns, changesAvailable: data.changesAvailable};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {};
        }
        
        return {};
    }
}