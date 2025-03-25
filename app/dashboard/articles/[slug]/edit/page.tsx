'use client';

import AppFooter, { getAppFooterSections } from "@/components/AppFooter";
import Article from "@/components/articles/Article";
import { DashboardCreate } from "@/components/dashboard/articles/create/DashboardCreate";
import { DashboardEdit } from "@/components/dashboard/articles/edit/DashboardEdit";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { DashboardNavigation, getDashboardOptions } from "@/components/dashboard/DashboardNavigation";
import TopMenu, { getTopMenuOptions } from "@/components/menu/TopMenu";
import { useAccount } from "@/hooks/models/useAccount";
import { useArticle } from "@/hooks/models/useArticle";
import { useDictionary } from "@/hooks/useDictionary";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import MenuLayout from "@/layouts/MenuLayout";
import { formatDateToISO } from "@/utils/date.utils";
import { capitalizeText } from "@/utils/text.utils";
import { BreadcrumbItem, Breadcrumbs, Spinner } from "@heroui/react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const DashboardArticleEditPage = () => {
    const { slug } = useParams();
    const { article, refetch, isFetched, likeMutate } = useArticle({ slug: slug?.toString() });
    const { user, editMutate } = useAccount();

    const { translate } = useDictionary(user);
    const router = useRouter();

    useEffect(() => {
        if (isFetched && article == undefined) {
            notFound();
        }
    }, [article, isFetched]);

    return (
        <DefaultLayout
            footer={
                <AppFooter
                    user={user}
                    editMutate={editMutate}
                    sectionTemplates={getAppFooterSections(translate)}
                />
            }
        >
            <DashboardEdit article={article} isArticleFetched={isFetched} />
        </DefaultLayout>
    );
}

export default DashboardArticleEditPage;