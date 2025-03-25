import { CustomInputProps } from "@/ui/inputs/input.type"
import React, { Dispatch, ReactElement, SetStateAction, useMemo, useState } from "react"
import { useDebounced } from "../useDebounced"

export type UseLocalSearchResponse = {
    searchInput: React.ReactNode
    query: string
    setQuery: Dispatch<SetStateAction<string>>
}

export const useLocalSearch = (input: ReactElement<CustomInputProps>): UseLocalSearchResponse => {
    const [query, setQuery] = useState<string>('');
    const debouncedQuery = useDebounced<string>(query);

    const searchInput = useMemo(() =>
        React.cloneElement(input, {
            value: query || '',
            handleChange: (value) => setQuery(value)
        })
    , [query, input]);

    return {searchInput: searchInput, query: debouncedQuery, setQuery: setQuery};
}