'use client';

import AppFooter, { getAppFooterSections } from "@/components/AppFooter";
import Article from "@/components/articles/Article";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { DashboardNavigation, getDashboardOptions, getDashboardSections } from "@/components/dashboard/DashboardNavigation";
import { DashboardLikedArticles } from "@/components/dashboard/liked-articles/DashboardLikedArticles";
import TopMenu, { getTopMenuOptions } from "@/components/menu/TopMenu";
import { useAccount } from "@/hooks/models/useAccount";
import { useArticle } from "@/hooks/models/useArticle";
import { useArticles } from "@/hooks/models/useArticles";
import { useDictionary } from "@/hooks/useDictionary";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import MenuLayout from "@/layouts/MenuLayout";
import { formatDateToISO } from "@/utils/date.utils";
import { capitalizeText } from "@/utils/text.utils";
import { BreadcrumbItem, Breadcrumbs, Spinner } from "@heroui/react";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

const DashboardLikedArticlesPage = () => {
    const { user, editMutate, isFetched: isUserFetched } = useAccount();
    const { articles, likeMutate, deleteMutate } = useArticles({ ids: user?.articlesIds || [] });
    const { translate } = useDictionary(user);

    const deleteArticle = (id: number) => {
        deleteMutate({ id });
    }

    return (
        <DashboardLayout
            user={user}
            topMenu={
                <TopMenu 
                    optionTemplates={getTopMenuOptions(translate)}
                />
            }
            footer={
                <AppFooter
                    user={user}
                    editMutate={editMutate}
                    sectionTemplates={getAppFooterSections(translate)}
                />
            }
            navigation={
                <DashboardNavigation
                    user={user}
                    isUserFetched={isUserFetched}
                    optionTemplates={getDashboardOptions(translate, 'liked-articles')}
                    sectionTemplates={getDashboardSections(translate, deleteArticle, articles)}
                />
            }   
        >
            <DashboardLikedArticles 
                user={user} 
                isUserFetched={isUserFetched}
            />
        </DashboardLayout>
    );
}

export default DashboardLikedArticlesPage;