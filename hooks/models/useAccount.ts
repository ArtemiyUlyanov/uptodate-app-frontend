import { UserModel } from "@/models/user";
import { accountMeApi, ApiAccountMeParams, ApiAccountMeResponse } from "@/services/api/account.me.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { RootState } from "@/store/store";
import { UseMutateFunction, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAccountUploadIconMutation } from "./mutations/useAccountUploadIconMutation";
import { ApiAccountIconUploadParams, ApiAccountIconUploadResponse } from "@/services/api/account.icon.upload.endpoint";
import { ApiAccountIconDeleteParams, ApiAccountIconDeleteResponse } from "@/services/api/account.icon.delete.endpoint";
import { useAccountDeleteIconMutation } from "./mutations/useAccountDeleteIconMutation";
import { useAccountEditMutation } from "./mutations/useAccountEditMutation";
import { ApiAccountEditParams, ApiAccountEditResponse } from "@/services/api/account.edit.endpoint";
import { useAccountConfirmEmailMutation } from "./mutations/useAccountConfirmEmailMutation";
import { ApiAccountEmailConfirmParams, ApiAccountEmailConfirmResponse } from "@/services/api/account.email.confirm.endpoint";
import { ApiAccountDeleteParams, ApiAccountDeleteResponse } from "@/services/api/account.delete.endpoint";
import { useAccountDeleteMutation } from "./mutations/useAccountDeleteMutation";
import { ApiAccountPasswordConfirmParams, ApiAccountPasswordConfirmResponse } from "@/services/api/account.password.confirm.endpoint";
import { useAccountConfirmPasswordMutation } from "./mutations/useAccountConfirmPasswordMutation";

const useAccountQuery = (
    params: ApiAccountMeParams,
    opts: Partial<UseQueryOptions<ApiAccountMeResponse>> = {},
) => {
    return useQuery<ApiAccountMeResponse>({
      queryKey: ['account', params.isAuthenticated, params.access_token],
      queryFn: () => accountMeApi(params),
      ...opts,
    });
}

export type UseAccountResponse = {
    user?: UserModel
    error?: ErrorResponse
    refetch: () => void
    isFetched: boolean

    uploadIconMutate: UseMutateFunction<ApiAccountIconUploadResponse, ErrorResponse, ApiAccountIconUploadParams, unknown>
    deleteIconMutate: UseMutateFunction<ApiAccountIconDeleteResponse, ErrorResponse, ApiAccountIconDeleteParams, unknown>
    editMutate: UseMutateFunction<ApiAccountEditResponse, ErrorResponse, ApiAccountEditParams, unknown>
    confirmEmailMutate: UseMutateFunction<ApiAccountEmailConfirmResponse, ErrorResponse, ApiAccountEmailConfirmParams, unknown>
    confirmPasswordMutate: UseMutateFunction<ApiAccountPasswordConfirmResponse, ErrorResponse, ApiAccountPasswordConfirmParams, unknown>
    deleteMutate: UseMutateFunction<ApiAccountDeleteResponse, ErrorResponse, ApiAccountDeleteParams, unknown>
    isEditPending: boolean
    isDeletePending: boolean
}

export const useAccount = (): UseAccountResponse => {
    const { isAuthenticated, access_token } = useSelector((state: RootState) => state.auth);
    const { data, refetch, isFetched } = useAccountQuery(
        { isAuthenticated, access_token }
    );

    const { uploadIconMutate } = useAccountUploadIconMutation({ queryKey: ['account', isAuthenticated, access_token] });
    const { deleteIconMutate } = useAccountDeleteIconMutation({ queryKey: ['account', isAuthenticated, access_token] });
    const { editMutate, isEditPending } = useAccountEditMutation({ queryKey: ['account', isAuthenticated, access_token] });
    const { confirmEmailMutate } = useAccountConfirmEmailMutation({ queryKey: ['account', isAuthenticated, access_token] });
    const { confirmPasswordMutate } = useAccountConfirmPasswordMutation({ queryKey: ['account', isAuthenticated, access_token] });
    const { deleteMutate, isDeletePending } = useAccountDeleteMutation({ queryKey: ['account', isAuthenticated, access_token] });

    return { user: data?.model, error: data?.error, refetch, isFetched, uploadIconMutate, deleteIconMutate, editMutate, deleteMutate, confirmEmailMutate, confirmPasswordMutate, isEditPending, isDeletePending };
};