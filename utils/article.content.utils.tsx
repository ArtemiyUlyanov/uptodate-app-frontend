import React from "react";
import Link from "next/link";
import { ContentBlockModel } from "@/models/content_block";
import { ImageContentBlock } from "@/ui/content/ImageContentBlock";
import { HeadingContentBlock } from "@/ui/content/HeadingContentBlock";
import { ListContentBlock } from "@/ui/content/ListContentBlock";
import { TextContentBlock } from "@/ui/content/TextContentBlock";
import { TextContentBlockInput } from "@/ui/content/inputs/TextContentBlockInput";
import { HeadingContentBlockInput } from "@/ui/content/inputs/HeadingContentBlockInput";
import { ListContentBlockInput } from "@/ui/content/inputs/ListContentBlockInput";
import { ImageContentBlockInput } from "@/ui/content/inputs/ImageContentBlockInput";

export const parseContent = (blocks: Array<ContentBlockModel>): Array<React.ReactElement> => {
    return blocks.map((block, index) => {
        if (block.type == 'IMAGE') {
            return <ImageContentBlock url={block.text} />
        }

        if (block.type == 'HEADING') {
            return <HeadingContentBlock>{block.text}</HeadingContentBlock>
        }

        if (block.type == 'LIST') {
            return <ListContentBlock>{block.text}</ListContentBlock>
        }

        return <TextContentBlock>{block.text}</TextContentBlock>
    });
};

export type ParseContentInputsProps = {
    contentBlocks: Array<ContentBlockModel>
    updateContentBlock: (index: number, contentBlock: ContentBlockModel, image?: File) => void
    removeContentBlock: (index: number) => void
    resources: Record<number, File | undefined>
}

export const parseContentInputs = ({contentBlocks, updateContentBlock, removeContentBlock, resources}: ParseContentInputsProps): Array<React.ReactElement> => {
    return contentBlocks.map((block, index) => {
        if (block.type == 'IMAGE') {
            return <ImageContentBlockInput index={index} resources={resources} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} text={block.text} />
        }

        if (block.type == 'HEADING') {
            return <HeadingContentBlockInput index={index} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} text={block.text} />
        }

        if (block.type == 'LIST') {
            return <ListContentBlockInput index={index} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} text={block.text} />
        }

        return <TextContentBlockInput index={index} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} text={block.text} />
    });
};
