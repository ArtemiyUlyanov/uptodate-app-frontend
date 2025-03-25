import { ApiAccountEmailConfirmParams, ApiAccountEmailConfirmResponse } from "@/services/api/account.email.confirm.endpoint";
import { accountEmailEditApi } from "@/services/api/account.email.edit.endpoint";
import { ApiAccountPasswordConfirmParams, ApiAccountPasswordConfirmResponse } from "@/services/api/account.password.confirm.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import DefaultButton from "@/ui/buttons/DefaultButton";
import DefaultInputOtp from "@/ui/inputs/otps/DefaultInputOtp";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Popover, PopoverContent, PopoverTrigger, Tooltip, User } from "@heroui/react";
import { UseMutateFunction } from "@tanstack/react-query";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

export type SettingsAccountChangePasswordConfirmationFormProps = React.HTMLProps<HTMLDivElement> & {
    password: string
    setIsPasswordWaitingConfirmed: Dispatch<SetStateAction<boolean>>
    setIsEditingFormUnwrapped: Dispatch<SetStateAction<boolean>>
    confirmPasswordMutate: UseMutateFunction<ApiAccountPasswordConfirmResponse, ErrorResponse, ApiAccountPasswordConfirmParams, unknown>
}

export type SettingsAccountChangeEmailConfirmationFormData = {
    code: string
}

export const SettingsAccountChangePasswordConfirmationForm: React.FC<SettingsAccountChangePasswordConfirmationFormProps> = ({
    password,
    setIsEditingFormUnwrapped,
    setIsPasswordWaitingConfirmed,
    confirmPasswordMutate
}) => {
    const { register, handleSubmit, setError, watch, setValue, formState: { errors, isSubmitting, isSubmitSuccessful, isValid } } = useForm<SettingsAccountChangeEmailConfirmationFormData>();

    const executeConfirmingCode = async (data: SettingsAccountChangeEmailConfirmationFormData) => {
        confirmPasswordMutate({ code: data.code });
        
        setValue('code', '');
        setIsPasswordWaitingConfirmed(false);
        setIsEditingFormUnwrapped(false);
        return Promise.resolve();
    };
    
    return (
        <div className="flex flex-col">
            <p className="font-interTight font-semibold text-sm text-secondaryText">Confirmation code</p>
            <DefaultInputOtp 
                {...register('code', { required: 'Code is invalid!' })}

                defaultProps={{
                    value: watch('code'),
                    required: true
                }}
                isDisabled={isSubmitting}
                length={6}
                handleChange={(value) => setValue('code', value)}
                handleComplete={handleSubmit(executeConfirmingCode)}
            />
            <div className={clsx(
                'flex flex-col'
            )}>
                {Object.values(errors).map((error, index) => 
                    <p 
                        key={index}
                        className={clsx(
                            'font-interTight font-medium text-sm text-red-500'
                        )}
                    >{error.message}</p>
                )}
            </div>
        </div>
    );
}