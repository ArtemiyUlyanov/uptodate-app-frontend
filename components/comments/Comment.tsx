import { CommentEditForm } from "@/components/forms/comments/CommentEditForm";
import { useAccount } from "@/hooks/models/useAccount";
import { CommentModel } from "@/models/comment";
import { ApiCommentDeleteParams, ApiCommentDeleteResponse, deleteCommentApi } from "@/services/api/comments.delete.endpoint";
import { RootState } from "@/store/store";
import { EditIcon } from "@/ui/icons/EditIcon";
import { TrashIcon } from "@/ui/icons/TrashIcon";
import { UserAvatarIcon } from "@/ui/icons/UserAvatarIcon";
import { formatDateExtended } from "@/utils/date.utils";
import { addToast, Button, Divider, Skeleton, Tooltip } from "@heroui/react";
import clsx from "clsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CommentLikeButton } from "./buttons/CommentLikeButton";
import { UserModel } from "@/models/user";
import { ApiCommentLikeParams, ApiCommentLikeResponse } from "@/services/api/comments.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { UseMutateFunction } from "@tanstack/react-query";
import { ApiCommentCreateParams, ApiCommentCreateResponse } from "@/services/api/comments.create.endpoint";
import { ApiCommentEditParams, ApiCommentEditResponse } from "@/services/api/comments.edit.endpoint";
import { useUser } from "@/hooks/models/useUser";

export type CommentProps = {
    comment: CommentModel
    likeMutate: UseMutateFunction<ApiCommentLikeResponse, ErrorResponse, ApiCommentLikeParams, unknown>
    deleteMutate: UseMutateFunction<ApiCommentDeleteResponse, ErrorResponse, ApiCommentDeleteParams, unknown>
    editMutate: UseMutateFunction<ApiCommentEditResponse, ErrorResponse, ApiCommentEditParams, unknown>
    isEditPending: boolean
}

export const Comment: React.FC<CommentProps> = ({
    comment,
    likeMutate,
    deleteMutate,
    editMutate,
    isEditPending
}) => {
    const [showEditForm, setShowEditForm] = useState<boolean>(false);

    const { user: author, isFetched: isAuthorFetched } = useUser(comment.authorId);

    const deleteComment = () => {
        deleteMutate({ id: comment.id });
    }

    return (
        <Skeleton isLoaded={isAuthorFetched && author != null} className="bg-emphasizingColor2 rounded-lg">
            <div className={clsx(
                'flex flex-row gap-2 items-start'
            )}>
                <div className="flex flex-col gap-2 h-full items-center">
                    <div className="mt-1">
                        <UserAvatarIcon
                            url={author?.icon}
                            size="sm"
                            className='w-full h-full aspect-square object-cover'
                        />
                    </div>
                    <div className="h-full">
                        <Divider orientation="vertical" />
                    </div>
                </div>
                <div className={clsx(
                    'flex flex-col w-full items-start gap-2'
                )}>
                    <div className="flex flex-row gap-4 items-center">
                        <div className="flex flex-col">
                            <p className={clsx(
                                'relative font-interTight font-semibold text text-sm text-primaryText line-clamp-1'
                            )}>{`${author?.firstName} ${author?.lastName}`}</p>
                            <p className={clsx(
                                'relative font-interTight font-medium text text-sm text-aspectText line-clamp-1'
                            )}>{formatDateExtended(comment.createdAt)}</p>
                        </div>
                        <div className="flex flex-row items-center">
                            <Tooltip
                                content='Delete the comment'
                                closeDelay={0}
                                classNames={{
                                    content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryColor'
                                }}
                            >
                                <Button
                                    isIconOnly
                                    className={clsx(
                                        'bg-[transparent]',
                                        'data-[hover=true]:bg-emphasizingColor2',
                                        'transition-all duration-200',
                                        !comment.permissionScope.includes('DELETE') && 'hidden'
                                    )}
                                    onPress={deleteComment}
                                    size="sm"
                                    variant='light'
                                >
                                    <div className="h-4 fill-redColor">
                                        <TrashIcon />
                                    </div>
                                </Button>
                            </Tooltip>
                            <Tooltip
                                content='Edit the comment'
                                closeDelay={0}
                                classNames={{
                                    content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryColor'
                                }}
                            >
                                <Button
                                    isIconOnly
                                    className={clsx(
                                        'bg-[transparent]',
                                        'data-[hover=true]:bg-emphasizingColor2',
                                        'transition-all duration-200',
                                        !comment.permissionScope.includes('EDIT') && 'hidden'
                                    )}
                                    onPress={() => setShowEditForm(prev => !prev)}
                                    size="sm"
                                    variant='light'
                                >
                                    <div className="h-3 fill-primaryColor">
                                        <EditIcon />
                                    </div>
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                    <p className="font-interTight font-medium text-sm text-primaryColor">{comment.content}</p>
                    {comment.resources && comment.resources?.length > 0 &&
                        <div className="flex flex-row flex-wrap w-full gap-2">
                            {comment.resources?.map((file, index) =>
                                <img 
                                    key={index} 
                                    src={file} 
                                    alt={`Preview ${index}`} 
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                            )}
                        </div>
                    }
                    <CommentLikeButton comment={comment} likeMutate={likeMutate} />
                    {comment.permissionScope.includes('EDIT') && showEditForm &&
                        <CommentEditForm comment={comment} editMutate={editMutate} isEditPending={isEditPending} setShowEditForm={setShowEditForm} />
                    }
                </div>
            </div>
        </Skeleton>
    );
}