import { ArticleModel } from "@/models/article"
import { authorizedAxios } from "./axios.config"
import axios from "axios"
import { ErrorResponse } from "./responses.types"
import qs from 'qs';
import { ContentBlockModel } from "@/models/content_block";

export type ApiArticleEditParams = {
    id: number
    heading: string
    description: string
    content: Array<ContentBlockModel>
    categories: Array<string>
    cover?: File
    resources: Array<File>
}

export type ApiArticleEditResponse = {
    model?: ArticleModel
    error?: ErrorResponse
}

export const editArticleApi = async ({
    id,
    heading,
    description,
    content,
    categories,
    cover,
    resources
}: ApiArticleEditParams): Promise<ApiArticleEditResponse> => {
    try {
        const formData = new FormData();

        formData.append('heading', heading);
        formData.append('description', description);
        formData.append('content', JSON.stringify(content));
        if (cover) formData.append('cover', cover);

        categories.forEach(category => formData.append('topicsNames', category));
        resources.forEach(file => formData.append('resources', file));

        const response = await authorizedAxios.put(`/articles/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
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