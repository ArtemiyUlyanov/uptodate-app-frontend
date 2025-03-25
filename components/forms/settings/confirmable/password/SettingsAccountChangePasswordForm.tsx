import { UserModel } from "@/models/user";
import { ApiAccountEmailConfirmParams, ApiAccountEmailConfirmResponse } from "@/services/api/account.email.confirm.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import DefaultButton from "@/ui/buttons/DefaultButton";
import DefaultInput from "@/ui/inputs/DefaultInput";
import { addToast, Button, Input } from "@heroui/react";
import { UseMutateFunction, useQuery, UseQueryOptions } from "@tanstack/react-query";
import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { SettingsAccountChangePasswordConfirmationForm } from "./SettingsAccountChangePasswordConfirmationForm";
import { accountEmailEditApi, ApiAccountEmailEditParams, ApiAccountEmailEditResponse } from "@/services/api/account.email.edit.endpoint";
import { KeyIcon } from "@/ui/icons/KeyIcon";
import { CloseIcon } from "@/ui/icons/CloseIcon";
import { checkEmailValid, checkPasswordValid } from "@/utils/input.utils";
import { accountPasswordEditApi, ApiAccountPasswordEditParams, ApiAccountPasswordEditResponse } from "@/services/api/account.password.edit.endpoint";
import { ApiAccountPasswordConfirmParams, ApiAccountPasswordConfirmResponse } from "@/services/api/account.password.confirm.endpoint";
import { SettingsAccountChangePasswordFormContent } from "./SettingsAccountChangePasswordFormContent";
import { EditIcon } from "@/ui/icons/EditIcon";

export type SettingsAccountChangePasswordFormProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    confirmPasswordMutate: UseMutateFunction<ApiAccountPasswordConfirmResponse, ErrorResponse, ApiAccountPasswordConfirmParams, unknown>
}

export const SettingsAccountChangePasswordForm: React.FC<SettingsAccountChangePasswordFormProps> = ({
    user,
    confirmPasswordMutate
}) => {
    const [isEditingFormUnwrapped, setIsEditingFormUnwrapped] = useState<boolean>(false);

    return (
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2 pt-4 pb-4">
            <p className="font-interTight font-semibold text-sm text-secondaryText">Password</p>
            {!isEditingFormUnwrapped &&
                <div>
                    <Button
                        className={clsx(
                            'gap-1.5 bg-[transparent]',
                            'data-[hover=true]:bg-emphasizingColor2',
                            'transition-all duration-200',
                        )}
                        onPress={() => setIsEditingFormUnwrapped(true)}
                        size="sm"
                        variant='light'
                        startContent={
                            <div className="h-3 fill-primaryColor">
                                <EditIcon />
                            </div> 
                        }
                    >
                        <p className="font-interTight font-semibold text-sm text-primaryText">Edit my password</p>
                    </Button>
                </div>
            }
            {isEditingFormUnwrapped &&
                <SettingsAccountChangePasswordFormContent
                    setIsEditingFormUnwrapped={setIsEditingFormUnwrapped}
                    confirmPasswordMutate={confirmPasswordMutate}
                />
            }
        </form>
    );
}