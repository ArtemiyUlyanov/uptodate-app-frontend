import { useDictionary } from "@/hooks/useDictionary";
import { authRegisterApi } from "@/services/api/auth.register.endpoint";
import DefaultButton from "@/ui/buttons/DefaultButton";
import { DefaultDrawer, DefaultDrawerProps } from "@/ui/drawers/DefaultDrawer";
import { DrawerBody, DrawerTrigger } from "@/ui/drawers/drawer_components";
import DefaultInput from "@/ui/inputs/DefaultInput";
import RoseLink from "@/ui/links/RoseLink";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import LoginForm from "./LoginForm";
import { InputOtp } from "@heroui/react";
import DefaultInputOtp from "@/ui/inputs/otps/DefaultInputOtp";
import { authRegisterVerifyCodeApi } from "@/services/api/auth.registerVerifyCode.endpoint";

export type RegisterVerifyCodeFormProps = Partial<DefaultDrawerProps> & {
    email: string
    trigger: (onClick: () => void) => React.ReactNode
}

export type RegisterVerifyCodeFormData = {
    code: string
}

const RegisterVerifyCodeForm: React.FC<RegisterVerifyCodeFormProps> = ({
    email,
    trigger,
    ...props
}) => {
    const { translate } = useDictionary();
    const { register, handleSubmit, setError, watch, setValue, formState: { errors, isSubmitting, isSubmitSuccessful, isValid } } = useForm<RegisterVerifyCodeFormData>();

    const executeVerifyingCode = async (data: RegisterVerifyCodeFormData) => {
        const response = await authRegisterVerifyCodeApi({
            email: email,
            code: data.code
        });
        
        if (response.error) {
            const auth_error_code = response.error?.status;
            let error: string = translate('common.register.errors.unknown_error');

            if (auth_error_code === 400) {
                error = translate('common.register.errors.user_already_exists');
            }

            setError('root', { message: error });
            return Promise.reject();
        }

        return Promise.resolve();
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            props.customDisclosure?.onClose();
        }
    }, [isSubmitSuccessful]);

    return (
        <DefaultDrawer
            title={translate('common.registerVerifyCode.drawer.name')}
            closeTooltip={translate('common.registerVerifyCode.drawer.close_tooltip')}
            {...props}
        >
            <DrawerTrigger>
                {(onClick) => trigger(onClick)}
            </DrawerTrigger>
            <DrawerBody>
                {(onClose) => (
                    <form
                        className={clsx(
                            'flex flex-col pt-4 gap-4'
                        )}
                        onSubmit={handleSubmit(executeVerifyingCode)}
                    >
                        <div className={clsx(
                            'flex flex-col gap-2'
                        )}>
                            <p className={clsx(
                                'font-interTight font-semibold text-xl text-primaryText'
                            )}>{translate('common.registerVerifyCode.registerVerifyCode_form_greetings_text')}</p>
                            <div className="flex flex-col">
                                <p className={clsx(
                                    'font-interTight font-medium text-sm text-primaryText'
                                )}>{translate('common.registerVerifyCode.registerVerifyCode_form_greetings_subtext')}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className={clsx(
                                'flex flex-col gap-2'
                            )}>
                                <div className={clsx(
                                    'flex flex-col gap-1'
                                )}>
                                    <p className={clsx(
                                        'font-interTight font-semibold text-sm text-secondaryText'
                                    )}>{translate('common.registerVerifyCode.fields.code.name')}</p>
                                    <DefaultInputOtp 
                                        {...register('code', { required: translate('common.register.errors.email_field_incorrect') })}

                                        defaultProps={{
                                            value: watch('code'),
                                            required: true
                                        }}
                                        isDisabled={isSubmitting}
                                        length={6}
                                        handleChange={(value) => setValue('code', value)}
                                        handleComplete={handleSubmit(executeVerifyingCode)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
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
                                {/* <DefaultButton
                                    text={translate('common.register.register_form_get_started_button')}
                                    customClassName='font-interTight font-semibold text-base text-center rounded-md'
                                    type='submit'
                                    isLoading={isSubmitting}
                                    isDisabled={!isValid}
                                /> */}
                            </div>
                        </div>
                    </form>
                )}
            </DrawerBody>
        </DefaultDrawer>
    );
}

export default RegisterVerifyCodeForm;