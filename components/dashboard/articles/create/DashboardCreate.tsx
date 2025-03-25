import { DashboardCreateForm } from "@/components/forms/dashboard/create/DashboardCreateForm";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import React from "react";

export type DashboardCreateProps = React.HTMLProps<HTMLDivElement>

export const DashboardCreate: React.FC<DashboardCreateProps> = ({

}) => {
    return (
        <div className="flex flex-col gap-8 w-full">
            <Breadcrumbs
                itemClasses={{
                    item: 'font-interTight font-semibold text-sm'
                }}
            >
                <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
                <BreadcrumbItem>Create a new article</BreadcrumbItem>
            </Breadcrumbs>
            <div className="flex flex-col w-full">
                <p className="font-interTight font-semibold text-lg text-primaryText">Let's give a shot of thoughts!</p>
                <p className="font-interTight font-medium text-base text-secondaryText">You can write your own article here</p>
            </div>
            <DashboardCreateForm />
        </div>
    );
}