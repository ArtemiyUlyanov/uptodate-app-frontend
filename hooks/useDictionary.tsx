'use client';

import { getDictionary } from "@/locales/dictionaries";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAccount } from "./models/useAccount";
import { UserModel } from "@/models/user";

export type UseDictionaryResponse = {
    language: string
    dictionary: any
    translate: (path: string) => string
}

export const useDictionary = (user?: UserModel): UseDictionaryResponse => {
    const { language: selectorLanguage } = useSelector((state: RootState) => state.language);
    const language = useMemo(() => user && user.settings ? user.settings?.language : selectorLanguage, [user, selectorLanguage]);
    const [dictionary, setDictionary] = useState<any>({});
    
    const { data, refetch } = useQuery({
        queryKey: ['language', language],
        queryFn: () => getDictionary(language)
    });

    useEffect(() => {
        setDictionary(data);
    }, [data]);

    const translate = (path: string): string => {
        try {
            return path.split('.').reduce((acc, key) => acc && acc[key], dictionary) || path;
        } catch (e: any) {
            return path;
        }
    }

    return {language, dictionary, translate};
}