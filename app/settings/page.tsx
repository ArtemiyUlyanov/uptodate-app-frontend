'use client';

import AppFooter, { getAppFooterSections } from "@/components/AppFooter";
import Article from "@/components/articles/Article";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { DashboardNavigation, getDashboardOptions } from "@/components/dashboard/DashboardNavigation";
import TopMenu, { getTopMenuOptions } from "@/components/menu/TopMenu";
import { Settings } from "@/components/settings/Settings";
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

const SettingsPage = () => {
    const { user, isFetched: isUserFetched, uploadIconMutate, deleteIconMutate, editMutate, deleteMutate, confirmEmailMutate, confirmPasswordMutate, isEditPending, isDeletePending } = useAccount();
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
            <Settings 
                user={user} 
                isUserFetched={isUserFetched} 
                uploadIconMutate={uploadIconMutate} 
                deleteIconMutate={deleteIconMutate} 
                editMutate={editMutate} 
                confirmEmailMutate={confirmEmailMutate}
                confirmPasswordMutate={confirmPasswordMutate}
                deleteMutate={deleteMutate}
                isEditPending={isEditPending}
                isDeletePending={isDeletePending}
            />
        </DefaultLayout>
    );
}

export default SettingsPage;