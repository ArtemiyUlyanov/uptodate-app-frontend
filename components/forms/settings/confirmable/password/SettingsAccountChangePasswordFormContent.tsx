import { checkPasswordValid, PasswordInvalidCause } from "@/utils/input.utils";
import { addToast } from "@heroui/toast";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { SettingsAccountChangePasswordConfirmationForm } from "./SettingsAccountChangePasswordConfirmationForm";
import DefaultInput from "@/ui/inputs/DefaultInput";
import clsx from "clsx";
import DefaultButton from "@/ui/buttons/DefaultButton";
import { accountPasswordEditApi, ApiAccountPasswordEditParams, ApiAccountPasswordEditResponse } from "@/services/api/account.password.edit.endpoint";
import { UseMutateFunction, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { KeyIcon } from "@/ui/icons/KeyIcon";
import { CloseIcon } from "@/ui/icons/CloseIcon";
import { ApiAccountPasswordConfirmParams, ApiAccountPasswordConfirmResponse } from "@/services/api/account.password.confirm.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { Button } from "@heroui/react";
import { SettingsAccountChangePasswordFormRequirement } from "./SettingsAccountChangePasswordFormRequirement";

export type SettingsAccountChangePasswordFormContentProps = React.HTMLProps<HTMLDivElement> & {
    setIsEditingFormUnwrapped: Dispatch<SetStateAction<boolean>>
    confirmPasswordMutate: UseMutateFunction<ApiAccountPasswordConfirmResponse, ErrorResponse, ApiAccountPasswordConfirmParams, unknown>
}

const useAccountEditPasswordQuery = (
    params: ApiAccountPasswordEditParams,
    opts: Partial<UseQueryOptions<ApiAccountPasswordEditResponse>> = {},
) => {
    return useQuery<ApiAccountPasswordEditResponse>({
      queryKey: ['account-password-edit', params.password],
      queryFn: () => accountPasswordEditApi(params),
      ...opts,
    });
}

export const SettingsAccountChangePasswordFormContent: React.FC<SettingsAccountChangePasswordFormContentProps> = ({
    setIsEditingFormUnwrapped,
    confirmPasswordMutate
}) => {
    const [password, setPassword] = useState<string>('');
    const [repeatedPassword, setRepeatedPassword] = useState<string>('');
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
    const [isPasswordWaitingConfirmed, setIsPasswordWaitingConfirmed] = useState<boolean>(false);

    const doPasswordsMatch = useMemo(() => !password || password == repeatedPassword, [password, repeatedPassword]);

    const { data, refetch, isFetching } = useAccountEditPasswordQuery({ password, repeatedPassword }, {
        enabled: false
    });

    const sendForm = () => {
        refetch()
            .then((response) => {
                if (response.data?.message) {
                    setIsPasswordWaitingConfirmed(true);

                    addToast({
                        title: "Confirm your password",
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
                        description: "Unable to confirm password ❌",
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
        setIsPasswordValid(checkPasswordValid(password).length <= 0);
    }, [password]);

    return (
        <>
            {isPasswordWaitingConfirmed &&
                <SettingsAccountChangePasswordConfirmationForm
                    password={password}
                    confirmPasswordMutate={confirmPasswordMutate}
                    setIsEditingFormUnwrapped={setIsEditingFormUnwrapped}
                    setIsPasswordWaitingConfirmed={setIsPasswordWaitingConfirmed}
                />
            }
            {!isPasswordWaitingConfirmed &&
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 w-full">
                        <DefaultInput
                            placeholder='Enter your password'
                            customClassName={clsx(
                                'flex-2 w-full',
                                !isPasswordValid && 'ring-1 ring-redColor'
                            )}
                            // startContent={
                            //     <p className="font-interTight font-semibold text-base text-secondaryText">@</p>
                            // }
                            // type="password"
                            inputClassName='text-base'
                            fullBordered={true}
                            value={password}
                            handleChange={setPassword}
                            required
                        />
                        <DefaultInput
                            placeholder='Repeat your password'
                            customClassName={clsx(
                                'flex-2 w-full',
                                !doPasswordsMatch && 'ring-1 ring-redColor'
                            )}
                            // startContent={
                            //     <p className="font-interTight font-semibold text-base text-secondaryText">@</p>
                            // }
                            // type="password"
                            inputClassName='text-base'
                            fullBordered={true}
                            value={repeatedPassword}
                            handleChange={setRepeatedPassword}
                            required
                        />
                    </div>
                    <div className="flex flex-col pt-2 pb-2 gap-1">
                         <SettingsAccountChangePasswordFormRequirement
                            complied={!checkPasswordValid(password).includes(PasswordInvalidCause.AT_LEAST_8_DIGITS)}
                            text={'At least 8 digits'}
                         />
                         <SettingsAccountChangePasswordFormRequirement
                            complied={!checkPasswordValid(password).includes(PasswordInvalidCause.LACK_OF_LOWERCASE_LETTERS)}
                            text={'At least one lowercase (a-z) symbol'}
                         />
                         <SettingsAccountChangePasswordFormRequirement
                            complied={!checkPasswordValid(password).includes(PasswordInvalidCause.LACK_OF_UPPERCASE_LETTERS)}
                            text={'At least one uppercase (A-Z) symbol'}
                         />
                         <SettingsAccountChangePasswordFormRequirement
                            complied={!checkPasswordValid(password).includes(PasswordInvalidCause.LACK_OF_NUMBERS)}
                            text={'At least one number (0-9) symbol'}
                         />
                         <SettingsAccountChangePasswordFormRequirement
                            complied={!checkPasswordValid(password).includes(PasswordInvalidCause.LACK_OF_SPECIAL_SYMBOLS)}
                            text={'At least one special symbol'}
                         />
                         <SettingsAccountChangePasswordFormRequirement
                            complied={!checkPasswordValid(password).includes(PasswordInvalidCause.INAPPROPRIATE_PASSWORD)}
                            text={'Only capital letters (A-Z), lowercase letters (a-z), number (0-9) and special symbols'}
                         />
                    </div>
                    <div className="flex flex-row gap-2">
                        <div>
                            <DefaultButton
                                text='Save'
                                customClassName='font-interTight font-semibold text-sm text-center rounded-md'
                                onPress={sendForm}
                                isLoading={isFetching}
                                isDisabled={isFetching || !isPasswordValid || !password || !repeatedPassword || !doPasswordsMatch || isPasswordWaitingConfirmed}
                                type="submit"
                                size="sm"
                            />
                        </div>
                        <div>
                            <DefaultButton
                                text='Cancel'
                                customClassName='font-interTight pl-2 pr-2 pt-2 pb-2 font-semibold rounded-md text-sm bg-emphasizingColor2'
                                onClickButton={() => setIsEditingFormUnwrapped(false)}
                                size="sm"
                            />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}