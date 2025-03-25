import { UserModel } from "@/models/user";
import { ApiAccountEmailConfirmParams, ApiAccountEmailConfirmResponse } from "@/services/api/account.email.confirm.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import DefaultButton from "@/ui/buttons/DefaultButton";
import DefaultInput from "@/ui/inputs/DefaultInput";
import { addToast, Input } from "@heroui/react";
import { UseMutateFunction, useQuery, UseQueryOptions } from "@tanstack/react-query";
import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { SettingsAccountChangeEmailConfirmationForm } from "./SettingsAccountChangeEmailConfirmationForm";
import { accountEmailEditApi, ApiAccountEmailEditParams, ApiAccountEmailEditResponse } from "@/services/api/account.email.edit.endpoint";
import { KeyIcon } from "@/ui/icons/KeyIcon";
import { CloseIcon } from "@/ui/icons/CloseIcon";
import { checkEmailValid } from "@/utils/input.utils";

export type SettingsAccountChangeEmailFormProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    confirmEmailMutate: UseMutateFunction<ApiAccountEmailConfirmResponse, ErrorResponse, ApiAccountEmailConfirmParams, unknown>
    conflictedColumns?: Array<"USERNAME" | "EMAIL">
    changesAvailable?: boolean
    email: string
    debouncedEmail: string
    setEmail: Dispatch<SetStateAction<string>>
}

const useAccountEditEmailQuery = (
    params: ApiAccountEmailEditParams,
    opts: Partial<UseQueryOptions<ApiAccountEmailEditResponse>> = {},
) => {
    return useQuery<ApiAccountEmailEditResponse>({
      queryKey: ['account-email-edit', params.email],
      queryFn: () => accountEmailEditApi(params),
      ...opts,
    });
}

export const SettingsAccountChangeEmailForm: React.FC<SettingsAccountChangeEmailFormProps> = ({
    user,
    confirmEmailMutate,
    conflictedColumns,
    changesAvailable,
    email,
    debouncedEmail,
    setEmail
}) => {
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
    const [isEmailWaitingConfirmed, setIsEmailWaitingConfirmed] = useState<boolean>(false);

    const isEmailChanged = useMemo(() => email !== user?.email, [user, email]);

    const { data, refetch, isFetching } = useAccountEditEmailQuery({ email }, {
        enabled: false
    })

    const sendForm = () => {
        refetch()
            .then((response) => {
                if (response.data?.message) {
                    setIsEmailWaitingConfirmed(true);

                    addToast({
                        title: "Confirm your email",
                        description: "A 6-digit confirmation code has been sent to your email 🔑",
                        classNames: {
                            title: 'font-interTight font-semibold text-primaryText',
                            icon: 'h-4 fill-primaryColor',
                            description: 'font-interTight font-medium text-secondaryText',
                            base: 'bg-emphasizingColor2 border-borderColor'
                        },
                        icon: (
                            <KeyIcon />
                        )
                    });
                } else {
                    addToast({
                        title: "Something went wrong",
                        description: "Unable to confirm email ❌",
                        classNames: {
                            title: 'font-interTight font-semibold text-primaryText',
                            icon: 'h-4 fill-redColor',
                            description: 'font-interTight font-medium text-secondaryText',
                            base: 'bg-emphasizingColor2 border-borderColor'
                        },
                        icon: (
                            <CloseIcon />
                        )
                    });
                }
            });
    }

    useEffect(() => {
        setIsEmailValid(checkEmailValid(email));
    }, [email]);

    return (
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2 pt-4 pb-4">
            <p className="font-interTight font-semibold text-sm text-secondaryText">Email</p>
            {isEmailWaitingConfirmed &&
                <SettingsAccountChangeEmailConfirmationForm
                    email={email}
                    confirmEmailMutate={confirmEmailMutate}
                    setIsEmailWaitingConfirmed={setIsEmailWaitingConfirmed}
                />
            }
            {!isEmailWaitingConfirmed && 
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 w-full">
                        <DefaultInput
                            placeholder='Enter your email'
                            customClassName={clsx(
                                'flex-2 w-full',
                                (conflictedColumns?.includes('EMAIL') || !isEmailValid) && 'ring-1 ring-redColor'
                            )}
                            // startContent={
                            //     <p className="font-interTight font-semibold text-base text-secondaryText">@</p>
                            // }
                            inputClassName='text-base'
                            fullBordered={true}
                            value={email}
                            handleChange={setEmail}
                            required
                        />
                        <p className={clsx(
                            "font-interTight font-medium text-sm text-redColor",
                            !conflictedColumns?.includes('EMAIL') && 'hidden'
                        )}>The user with such email already exists!</p>
                        <p className={clsx(
                            "font-interTight font-medium text-sm text-redColor",
                            isEmailValid && 'hidden'
                        )}>The email is invalid!</p>
                    </div>
                    <div>
                        <DefaultButton
                            text='Save'
                            customClassName='font-interTight font-semibold text-sm text-center rounded-md'
                            onPress={sendForm}
                            isLoading={isFetching}
                            isDisabled={isFetching || !isEmailChanged || !isEmailValid || !email || !changesAvailable || isEmailWaitingConfirmed}
                            type="submit"
                            size="sm"
                        />
                    </div>
                </div>
            }
        </form>
    );
}