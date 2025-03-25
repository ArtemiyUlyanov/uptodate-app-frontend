'use client';

import { logout, refresh } from "@/store/features/auth/authSlice";
import { store } from "@/store/store";
import { SortbyFilterIcon } from "@/ui/icons/SortbyFilterIcon";
import { PersonalAccountIcon } from "@/ui/icons/PersonalAccountIcon";
import { addToast } from "@heroui/toast";
import axios from "axios";

export const authorizedAxios = axios.create({
    baseURL: '/api',
    timeout: 5000,
});

authorizedAxios.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.access_token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

authorizedAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const isAuthenticated = store.getState().auth.isAuthenticated;

        if (error.response?.status === 401 && isAuthenticated) {
            setTimeout(() => store.dispatch(logout()), 1000);
            addToast({
                title: "Oops, Session Lost!",
                description: "Looks like your session slipped away. Don’t worry, just log in again to pick up where you left off! 🔐👋",
                classNames: {
                    title: 'font-interTight font-semibold text-primaryText',
                    icon: 'h-4 fill-primaryColor',
                    description: 'font-interTight font-medium text-secondaryText',
                    base: 'bg-emphasizingColor2 border-borderColor'
                },
                icon: (
                    <PersonalAccountIcon />
                )
            });
        }

        return Promise.reject(error);
    }
);