import { Comment } from "@/components/comments/Comment";
import { CommentSendForm } from "@/components/forms/comments/CommentSendForm";
import { useAccount } from "@/hooks/models/useAccount";
import { useComments } from "@/hooks/models/useComments";
import { useDictionary } from "@/hooks/useDictionary";
import { ArticleModel } from "@/models/article";
import { CommentModel } from "@/models/comment";
import { RootState } from "@/store/store";
import { Divider } from "@heroui/react";
import { useSelector } from "react-redux";

export type CommentsProps = {
    article: ArticleModel
}

const Comments: React.FC<CommentsProps> = ({
    article
}) => {
    const { user } = useAccount(); 

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { translate } = useDictionary(user);

    const { comments, likeMutate, deleteMutate, createMutate, editMutate, isCreatePending, isEditPending } = useComments({ articleId: article.id });

    return (
        <div className="flex flex-col gap-2 w-full">
            {isAuthenticated &&
                <CommentSendForm isCreatePending={isCreatePending} createMutate={createMutate} article={article} />
            }
            <div className="flex flex-col pt-2 gap-2">
                <p className="font-interTight font-semibold text-sm text-secondaryText">Comments ({comments?.length || 0})</p>
                <div className="flex flex-col gap-4">
                    {comments?.map((comment, index) => <Comment key={index} comment={comment} editMutate={editMutate} isEditPending={isEditPending} deleteMutate={deleteMutate} likeMutate={likeMutate} />)}
                </div>
            </div>
        </div>
    );
}

export default Comments;