import { DashboardCreateForm } from "@/components/forms/dashboard/create/DashboardCreateForm";
import { DashboardEditForm } from "@/components/forms/dashboard/edit/DashboardEditForm";
import { ArticleModel } from "@/models/article";
import { BreadcrumbItem, Breadcrumbs, Spinner } from "@heroui/react";
import React from "react";

export type DashboardEditProps = React.HTMLProps<HTMLDivElement> & {
    article?: ArticleModel
    isArticleFetched: boolean
}

export const DashboardEdit: React.FC<DashboardEditProps> = ({
    article,
    isArticleFetched
}) => {
    return (
        <div className="relative flex flex-col gap-8 w-full">
            {isArticleFetched ?
                <>
                    <Breadcrumbs
                        itemClasses={{
                            item: 'font-interTight font-semibold text-sm'
                        }}
                    >
                        <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
                        <BreadcrumbItem>Edit an article</BreadcrumbItem>
                    </Breadcrumbs>
                    <div className="flex flex-col w-full">
                        <p className="font-interTight font-semibold text-lg text-primaryText">Commit changes to article</p>
                        <p className="font-interTight font-medium text-base text-secondaryText">Rewrite it like you want</p>
                    </div>
                    <DashboardEditForm article={article} isArticleFetched={isArticleFetched} />
                </>
            :
                <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
                    <Spinner color="secondary" />
                    <p className="font-interTight font-semibold text-primaryText">Loading data...</p>
                </div>
            }
        </div>
    );
}