'use client';

import TopMenu from "@/components/menu/TopMenu";
import ExplorePageLayout from "@/layouts/MenuLayout";
import { logout } from "@/store/features/auth/authSlice";
import { RootState } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const LogoutPage = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const dispath = useDispatch();

    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            dispath(logout());
        }
    });
    
    return null;
}

export default LogoutPage;