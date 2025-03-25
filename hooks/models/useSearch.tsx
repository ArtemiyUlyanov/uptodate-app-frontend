"use client";

import { ArticleModel } from "@/models/article";
import { ApiSearchParams, ApiSearchResponse, searchApi } from "@/services/api/articles.search.endpoint";
import { UseMutateFunction, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { useDebounced } from "../useDebounced";
import { useFilters } from "../explore/useFilters";
import { useSearchLikeMutation } from "./mutations/useSearchLikeMutation";
import { ApiArticleLikeParams, ApiArticleLikeResponse } from "@/services/api/articles.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";

export const useSearchQuery = (
    params: ApiSearchParams,
    opts: Partial<UseQueryOptions<ApiSearchResponse>> = {},
) => {
    return useQuery<ApiSearchResponse>({
      queryKey: [!params.miniSearch ? 'search' : 'miniSearch'],
      queryFn: () => searchApi(params),
      ...opts,
    });
}

type SearchContextType = {
  query: string
  articles: ArticleModel[]
  setQuery: Dispatch<SetStateAction<string>>
  pages: number
  setPages: Dispatch<SetStateAction<number>>
  totalElements: number
  totalPages: number
  isFetching: boolean
  likeMutate: UseMutateFunction<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams, unknown>
  performSearch: () => void
}

const defaultFilters: SearchContextType = {
    query: '',
    articles: [],
    setQuery: () => {},
    pages: 1,
    setPages: () => {},
    totalElements: 1,
    totalPages: 1,
    isFetching: false,
    likeMutate: () => {},
    performSearch: () => {}
}

export const SearchContext = createContext<SearchContextType>(defaultFilters);

export type SearchProviderProps = React.HTMLProps<HTMLDivElement> & {
}

export const SearchProvider: React.FC<SearchProviderProps> = ({
    children,
    ...props
}) => {
    const [query, setQuery] = useState<string>('');
    const debouncedQuery = useDebounced<string>(query);

    const [pages, setPages] = useState<number>(1);
    const [totalElements, setTotalElements] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [articles, setArticles] = useState<ArticleModel[]>([]);

    const { filters } = useFilters();

    const { data, isFetching, refetch } = useSearchQuery(
        {
            pages: pages,
            query: query,
            miniSearch: false,
            filters: filters
        },
        {
          enabled: false,
          refetchOnWindowFocus: false,
        },
    );
    const { likeMutate } = useSearchLikeMutation({ queryKey: ['search'] });

    const performSearch = useCallback(() => {
        refetch();
    }, []);

    useEffect(() => {
        refetch();
    }, []);
        
    useEffect(() => {
        refetch();
    }, [query, pages, filters]);

    useEffect(() => {
        setPages(1);
    }, [query, filters]);

    useEffect(() => {
        if (data?.articles) {
            setArticles(data.articles);
            setTotalElements(data.totalElements);
            setTotalPages(data.totalPages);
        }
    }, [data]);

    return (
        <SearchContext.Provider value={{ query: debouncedQuery, articles, setQuery, pages, setPages, totalElements, likeMutate, totalPages, isFetching, performSearch }}>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearch = () => useContext(SearchContext);