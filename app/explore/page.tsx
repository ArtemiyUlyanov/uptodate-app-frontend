'use client';

import AppFooter, { getAppFooterSections } from "@/components/AppFooter";
import ArticlesList from "@/components/articles/ArticlesList";
import TopMenu, { getTopMenuOptions } from "@/components/menu/TopMenu";
import { useAccount } from "@/hooks/models/useAccount";
import { useArticle } from "@/hooks/models/useArticle";
import { useDictionary } from "@/hooks/useDictionary";
import { ArticlesListLayout } from "@/layouts/ArticlesListLayout";

const ExplorePage = () => {
    const { user, editMutate } = useAccount();
    const { translate } = useDictionary(user);
    
    return (
        <ArticlesListLayout
            user={user}
            topMenu={
                <TopMenu 
                    optionTemplates={getTopMenuOptions(translate, 'explore')}
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
            <ArticlesList user={user} />
        </ArticlesListLayout>
    );
}

export default ExplorePage;