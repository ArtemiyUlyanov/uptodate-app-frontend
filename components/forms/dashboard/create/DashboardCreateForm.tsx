import DefaultInput from "@/ui/inputs/DefaultInput";
import clsx from "clsx";
import React, { useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { DashboardAddContentPopover } from "../../../dashboard/articles/DashboardAddContentPopover";
import { ContentBlockModel } from "@/models/content_block";
import { parseContentInputs } from "@/utils/article.content.utils";
import { DashboardCreateFormSaveDrawer } from "./DashboardCreateFormSaveDrawer";
import { CheckmarkIcon } from "@/ui/icons/CheckmarkIcon";
import { ArticleModel } from "@/models/article";

export type DashboardCreateFormProps = React.HTMLProps<HTMLDivElement>

export const DashboardCreateForm: React.FC<DashboardCreateFormProps> = ({

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

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <DefaultInput
                    // {...register('firstName', { required: translate('common.register.errors.first_name_field_incorrect') })}

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
                {parseContentInputs({contentBlocks, updateContentBlock, removeContentBlock, resources})}
                <div>
                    <DashboardAddContentPopover addContentBlock={addContentBlock} />
                </div>
            </div>
            <DashboardCreateFormSaveDrawer 
                heading={heading} 
                contentBlocks={contentBlocks} 
                resources={Object.values(resources).filter(resource => resource !== undefined)} 
                isFormSent={isFormSent}
                setIsFormSent={setIsFormSent}
            />
        </div>
    );
}