import { UserModel } from "@/models/user"
import { SettingsAccountIconChangeForm } from "./icon/SettingsAccountIconChangeForm";
import { useEffect, useMemo, useState } from "react";
import { SettingsAccountNameProperty } from "./SettingsAccountNameProperty";
import DefaultButton from "@/ui/buttons/DefaultButton";
import { SettingsAccountCustomizationProperty } from "./SettingsAccountCustomizationProperty";
import { UserSettingsModel } from "@/models/user_settings";
import { UseMutateFunction, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { accountChangesAvailableApi, ApiAccountChangesAvailableParams, ApiAccountChangesAvailableResponse } from "@/services/api/account.changes_available.endpoint";
import { useDebounced } from "@/hooks/useDebounced";
import { ApiAccountIconUploadParams, ApiAccountIconUploadResponse } from "@/services/api/account.icon.upload.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { ApiAccountIconDeleteParams, ApiAccountIconDeleteResponse } from "@/services/api/account.icon.delete.endpoint";
import { ApiAccountEditParams, ApiAccountEditResponse } from "@/services/api/account.edit.endpoint";
import { Divider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ApiAccountEmailConfirmParams, ApiAccountEmailConfirmResponse } from "@/services/api/account.email.confirm.endpoint";
import { SettingsAccountChangeEmailForm } from "./confirmable/email/SettingsAccountChangeEmailForm";
import { ApiAccountDeleteParams, ApiAccountDeleteResponse } from "@/services/api/account.delete.endpoint";
import { SettingsAccountDeleteProfileForm } from "./delete/SettingsAccountDeleteProfileForm";
import { ApiAccountPasswordConfirmParams, ApiAccountPasswordConfirmResponse } from "@/services/api/account.password.confirm.endpoint";
import { SettingsAccountChangePasswordForm } from "./confirmable/password/SettingsAccountChangePasswordForm";

export type SettingsAccountPropertiesEditFormProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    isUserFetched: boolean
    uploadIconMutate: UseMutateFunction<ApiAccountIconUploadResponse, ErrorResponse, ApiAccountIconUploadParams, unknown>
    deleteIconMutate: UseMutateFunction<ApiAccountIconDeleteResponse, ErrorResponse, ApiAccountIconDeleteParams, unknown>
    editMutate: UseMutateFunction<ApiAccountEditResponse, ErrorResponse, ApiAccountEditParams, unknown>
    deleteMutate: UseMutateFunction<ApiAccountDeleteResponse, ErrorResponse, ApiAccountDeleteParams, unknown>
    confirmEmailMutate: UseMutateFunction<ApiAccountEmailConfirmResponse, ErrorResponse, ApiAccountEmailConfirmParams, unknown>
    confirmPasswordMutate: UseMutateFunction<ApiAccountPasswordConfirmResponse, ErrorResponse, ApiAccountPasswordConfirmParams, unknown>
    isEditPending: boolean
    isDeletePending: boolean
}

const useAccountChangesAvailableQuery = (
    params: ApiAccountChangesAvailableParams,
    opts: Partial<UseQueryOptions<ApiAccountChangesAvailableResponse>> = {},
) => {
    return useQuery<ApiAccountChangesAvailableResponse>({
      queryKey: ['account-changes-available', params.username, params.email],
      queryFn: () => accountChangesAvailableApi(params),
      ...opts,
    });
}

export const SettingsAccountPropertiesEditForm: React.FC<SettingsAccountPropertiesEditFormProps> = ({
    user,
    isUserFetched,
    uploadIconMutate,
    deleteIconMutate,
    editMutate,
    deleteMutate,
    confirmEmailMutate,
    confirmPasswordMutate,
    isEditPending,
    isDeletePending
}) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [settings, setSettings] = useState<UserSettingsModel>();

    const debouncedUsername = useDebounced<string>(username);
    const debouncedEmail = useDebounced<string>(email);

    const { data: changesAvailableData } = useAccountChangesAvailableQuery({
        username: debouncedUsername,
        email: debouncedEmail
    });

    const isUserChanged = useMemo(() => {
        if (user == undefined) return false;
        return firstName !== user.firstName || lastName !== user.lastName || debouncedUsername !== user.username || settings !== user.settings;  
    }, [firstName, lastName, debouncedUsername, settings, user]);

    const sendForm = () => {
        if (settings) {
            editMutate({ firstName, lastName, username: debouncedUsername, settings });
        }
    }

    useEffect(() => {
        if (isUserFetched && user !== undefined) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setUsername(user.username);
            setEmail(user.email);
            setSettings(user.settings);
        }
    }, [user, isUserFetched]);

    return (
        <div className="flex flex-col">
            <SettingsAccountIconChangeForm 
                user={user} 
                uploadIconMutate={uploadIconMutate}
                deleteIconMutate={deleteIconMutate}
            />
            <SettingsAccountChangeEmailForm
                user={user}
                email={email}
                debouncedEmail={debouncedEmail}
                setEmail={setEmail}
                confirmEmailMutate={confirmEmailMutate} 
                conflictedColumns={changesAvailableData?.conflictedColumns}
                changesAvailable={changesAvailableData?.changesAvailable}
            />
            <SettingsAccountChangePasswordForm
                user={user}
                confirmPasswordMutate={confirmPasswordMutate}
            />
            <SettingsAccountNameProperty 
                user={user} 
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                username={username}
                setUsername={setUsername}
                conflictedColumns={changesAvailableData?.conflictedColumns}
            />
            <SettingsAccountCustomizationProperty 
                user={user} 
                settings={settings}
                setSettings={setSettings}
            />
            <div>
                <DefaultButton
                    text='Save'
                    customClassName='font-interTight font-semibold text-sm text-center rounded-md'
                    onPress={sendForm}
                    isLoading={isEditPending}
                    isDisabled={isEditPending || !isUserChanged || !username || !firstName || !lastName || !settings?.language || !settings.timezone || !changesAvailableData?.changesAvailable}
                    type="submit"
                    size="sm"
                />
            </div>
            <SettingsAccountDeleteProfileForm 
                user={user}
                deleteMutate={deleteMutate}
                isDeletePending={isDeletePending}
            />
        </div>
    );
}