'use client';

import AppFooter, { getAppFooterSections } from "@/components/AppFooter";
import Article from "@/components/articles/Article";
import { DashboardCreate } from "@/components/dashboard/articles/create/DashboardCreate";
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
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

const DashboardArticleCreatePage = () => {
    const { user, editMutate } = useAccount();
    const { translate } = useDictionary(user);

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
            <DashboardCreate />
        </DefaultLayout>
    );
}

export default DashboardArticleCreatePage;