import { useDictionary } from "@/hooks/useDictionary";
import { authRegisterApi } from "@/services/api/auth.register.endpoint";
import DefaultButton from "@/ui/buttons/DefaultButton";
import { DefaultDrawer } from "@/ui/drawers/DefaultDrawer";
import { DrawerBody, DrawerTrigger } from "@/ui/drawers/drawer_components";
import DefaultInput from "@/ui/inputs/DefaultInput";
import RoseLink from "@/ui/links/RoseLink";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import LoginForm from "./LoginForm";
import RegisterVerifyCodeForm from "./RegisterVerifyCodeForm";
import { useDisclosure } from "@heroui/react";

export type RegisterFormProps = {
    trigger: (onClick: () => void) => React.ReactNode
}

export type RegisterFormData = {
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
}

const RegisterForm: React.FC<RegisterFormProps> = ({
    trigger
}) => {
    const { translate } = useDictionary();
    const { register, handleSubmit, setError, watch, setValue, formState: { errors, isSubmitting, isSubmitSuccessful, isValid } } = useForm<RegisterFormData>();

    const verifyingCodeFormDisclosure = useDisclosure();

    const executeRegister = async (data: RegisterFormData) => {
        const response = await authRegisterApi(data);
        
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
            verifyingCodeFormDisclosure.onOpen();
        }
    }, [isSubmitSuccessful]);

    return (
        <DefaultDrawer
            title={translate('common.register.drawer.name')}
            closeTooltip={translate('common.register.drawer.close_tooltip')}
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
                        onSubmit={handleSubmit(executeRegister)}
                    >
                        <div className={clsx(
                            'flex flex-col gap-2'
                        )}>
                            <p className={clsx(
                                'font-interTight font-semibold text-xl text-primaryText'
                            )}>{translate('common.register.register_form_greetings_text')}</p>
                            <div className="flex flex-col">
                                <p className={clsx(
                                    'font-interTight font-medium text-sm text-primaryText'
                                )}>{translate('common.register.register_form_greetings_subtext')}</p>
                                <LoginForm 
                                    trigger={
                                        (onClick) =>
                                            <RoseLink
                                                text={translate('common.register.register_form_sign_up_link')}
                                                link=''
                                                onClick={onClick}
                                                customClassName={clsx(
                                                    'font-interTight font-semibold text-sm',
                                                    history.length <= 0 && 'hidden'
                                                )}
                                                actived={true}
                                            />
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className={clsx(
                                'flex flex-col gap-4'
                            )}>
                                <div className='flex flex-row gap-2'>
                                    <div className={clsx(
                                        'flex flex-col gap-1'
                                    )}>
                                        <p className={clsx(
                                            'font-interTight font-semibold text-sm text-secondaryText'
                                        )}>{translate('common.register.fields.firstName.name')}</p>
                                        <DefaultInput
                                            {...register('firstName', { required: translate('common.register.errors.first_name_field_incorrect') })}

                                            placeholder={translate('common.register.fields.firstName.input_placeholder')}
                                            customClassName={clsx(
                                                'w-full'
                                            )}
                                            inputClassName='text-base'
                                            fullBordered={true}
                                            value={watch('firstName')}
                                            handleChange={(value) => setValue('firstName', value)}
                                            required
                                        />
                                    </div>
                                    <div className={clsx(
                                        'flex flex-col gap-1'
                                    )}>
                                        <p className={clsx(
                                            'font-interTight font-semibold text-sm text-secondaryText'
                                        )}>{translate('common.register.fields.lastName.name')}</p>
                                        <DefaultInput
                                            {...register('lastName', { required: translate('common.register.errors.last_name_field_incorrect') })}

                                            placeholder={translate('common.register.fields.lastName.input_placeholder')}
                                            customClassName={clsx(
                                                'w-full'
                                            )}
                                            inputClassName='text-base'
                                            fullBordered={true}
                                            value={watch('lastName')}
                                            handleChange={(value) => setValue('lastName', value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className={clsx(
                                    'flex flex-col gap-1'
                                )}>
                                    <p className={clsx(
                                        'font-interTight font-semibold text-sm text-secondaryText'
                                    )}>{translate('common.register.fields.email.name')}</p>
                                    <DefaultInput
                                        {...register('email', { required: translate('common.register.errors.email_field_incorrect') })}

                                        placeholder={translate('common.register.fields.email.input_placeholder')}
                                        customClassName={clsx(
                                            'w-full'
                                        )}
                                        inputClassName='text-base'
                                        fullBordered={true}
                                        type="email"
                                        value={watch('email')}
                                        handleChange={(value) => setValue('email', value)}
                                        required
                                    />
                                </div>
                                <div className={clsx(
                                    'flex flex-col gap-1'
                                )}>
                                    <p className={clsx(
                                        'font-interTight font-semibold text-sm text-secondaryText'
                                    )}>{translate('common.register.fields.username.name')}</p>
                                    <DefaultInput
                                        {...register('username', { required: translate('common.register.errors.username_field_incorrect') })}

                                        placeholder={translate('common.register.fields.username.input_placeholder')}
                                        customClassName={clsx(
                                            'w-full'
                                        )}
                                        inputClassName='text-base'
                                        fullBordered={true}
                                        value={watch('username')}
                                        handleChange={(value) => setValue('username', value)}
                                        required
                                    />
                                </div>
                                <div className={clsx(
                                    'flex flex-col gap-1'
                                )}>
                                    <p className={clsx(
                                        'font-interTight font-semibold text-sm text-secondaryText'
                                    )}>{translate('common.register.fields.password.name')}</p>
                                    <DefaultInput
                                        {...register('password', { required: translate('common.register.errors.password_field_incorrect') })}

                                        placeholder={translate('common.register.fields.password.input_placeholder')}
                                        customClassName={clsx(
                                            'w-full'
                                        )}
                                        inputClassName='text-base'
                                        fullBordered={true}
                                        type="password"
                                        value={watch('password')}
                                        handleChange={(value) => setValue('password', value)}
                                        required
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
                                <RegisterVerifyCodeForm
                                    email={watch('email')}
                                    customDisclosure={verifyingCodeFormDisclosure}
                                    trigger={
                                        (onClick) =>
                                            <DefaultButton
                                                text={translate('common.register.register_form_get_started_button')}
                                                customClassName='font-interTight font-semibold text-base text-center rounded-lg'
                                                type="submit"
                                                isLoading={isSubmitting}
                                                isDisabled={!isValid}
                                            />
                                    }
                                />
                            </div>
                        </div>
                    </form>
                )}
            </DrawerBody>
        </DefaultDrawer>
    );
}

export default RegisterForm;