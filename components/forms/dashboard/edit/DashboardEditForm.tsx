import DefaultInput from "@/ui/inputs/DefaultInput";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { DashboardAddContentPopover } from "../../../dashboard/articles/DashboardAddContentPopover";
import { ContentBlockModel } from "@/models/content_block";
import { parseContentInputs } from "@/utils/article.content.utils";
import { DashboardCreateFormSaveDrawer } from "../create/DashboardCreateFormSaveDrawer";
import { CheckmarkIcon } from "@/ui/icons/CheckmarkIcon";
import { ArticleModel } from "@/models/article";
import { DashboardEditFormSaveDrawer } from "./DashboardEditFormSaveDrawer";

export type DashboardEditFormProps = React.HTMLProps<HTMLDivElement> & {
    article?: ArticleModel
    isArticleFetched: boolean
}

export const DashboardEditForm: React.FC<DashboardEditFormProps> = ({
    article,
    isArticleFetched
}) => {
    const [headingPlaceholder] = useTypewriter({
        words: ["The EU raises the charging of import taxes as China is committed to get rid of the EU wares", "Top 10 places in Amsterdam to visit: the last one is the most wonderring", "Where to rent an apartment in Barcelona during a summer vacation"],
        loop: 0, 
        typeSpeed: 75,
        deleteSpeed: 50,
        delaySpeed: 1000,
    });

    const [heading, setHeading] = useState<string>('');
    const [contentBlocks, setContentBlocks] = useState<ContentBlockModel[]>([]);
    const [resources, setResources] = useState<Record<number, File | undefined>>({});
    const [isFormSent, setIsFormSent] = useState<boolean>(false);

    const addContentBlock = (contentBlock: ContentBlockModel) => {
        setContentBlocks(prev => [...prev, contentBlock]);
    }

    const updateContentBlock = (index: number, contentBlock: ContentBlockModel, image?: File) => {
        setContentBlocks(prev => prev.map((item, itemIndex) => {
            if (itemIndex !== index) return item;
            else return contentBlock;
        }));

        if (image) {
            setResources(prev => ({
                ...prev,
                [index]: image
            }));
        }
    }

    const removeContentBlock = (index: number) => {
        setContentBlocks(prev => prev.filter((_, itemIndex) => itemIndex !== index));

        if (index in resources) {
            setResources(prev => Object.fromEntries(Object.entries(prev).filter(([key, value]) => key !== index.toString())));
        }
    }

    useEffect(() => {
        if (isArticleFetched && article !== undefined) {
            setHeading(article.heading);
            setContentBlocks(article.content);
        }
    }, [isArticleFetched]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <DefaultInput
                    placeholder={headingPlaceholder}
                    customClassName={clsx(
                        'w-full'
                    )}
                    inputClassName='text-base'
                    fullBordered={true}
                    value={heading}
                    handleChange={setHeading}
                    required
                />
                <div className="flex flex-col gap-2">
                    {parseContentInputs({contentBlocks, updateContentBlock, removeContentBlock, resources})}
                    <div>
                        <DashboardAddContentPopover addContentBlock={addContentBlock} />
                    </div>
                </div>
            </div>
            <DashboardEditFormSaveDrawer 
                heading={heading} 
                contentBlocks={contentBlocks} 
                resources={Object.values(resources).filter(resource => resource !== undefined)} 
                article={article} 
                isArticleFetched={isArticleFetched}
                isFormSent={isFormSent}
                setIsFormSent={setIsFormSent}
            />
        </div>
    );
}