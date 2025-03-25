'use client';

import AppFooter, { getAppFooterSections } from "@/components/AppFooter";
import Article from "@/components/articles/Article";
import TopMenu, { getTopMenuOptions } from "@/components/menu/TopMenu";
import { useAccount } from "@/hooks/models/useAccount";
import { useArticle } from "@/hooks/models/useArticle";
import { useDictionary } from "@/hooks/useDictionary";
import MenuLayout from "@/layouts/MenuLayout";
import { formatDateToISO } from "@/utils/date.utils";
import { capitalizeText } from "@/utils/text.utils";
import { BreadcrumbItem, Breadcrumbs, Spinner } from "@heroui/react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const DynamicArticlePage = () => {
    const { slug } = useParams();
    const { article, refetch, likeMutate, isFetched } = useArticle({ slug: slug?.toString() });
    const { user, editMutate } = useAccount();

    const { translate } = useDictionary(user);

    useEffect(() => {
        if (isFetched && article == undefined) {
            notFound();
        }
    }, [article, isFetched]);

    return (
        <MenuLayout
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
        >
            <div className="flex flex-row justify-center w-full">
                <div className="relative flex flex-col gap-8 items-start w-3/4">
                    <div className="relative flex flex-row justify-center gap-8 w-full">
                        {article &&
                            <Article user={user} key={article?.id} article={article} likeMutate={likeMutate} />
                        }
                        {!article &&
                            <Spinner color="secondary" />
                        }
                    </div>
                </div>
            </div>
        </MenuLayout>
    );
}

export default DynamicArticlePage;