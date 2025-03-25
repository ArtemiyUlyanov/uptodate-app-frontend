import { CategoryModel } from "@/models/category";
import { ApiCategoriesGetParams, ApiCategoriesGetResponse, categoriesGetApi } from "@/services/api/categories.get.endpoint";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

const useCategoriesQuery = (
    params: ApiCategoriesGetParams,
    opts: Partial<UseQueryOptions<ApiCategoriesGetResponse>> = {},
) => {
    return useQuery<ApiCategoriesGetResponse>({
      queryKey: ['categories', params.parent],
      queryFn: () => categoriesGetApi(params),
      ...opts,
    });
}

export type UseCategoriesResponse = {
    categories: CategoryModel[]
}

export const useCategories = (): UseCategoriesResponse => {
    const { data, refetch } = useCategoriesQuery({});

    return { categories: data?.categories || [] };
}