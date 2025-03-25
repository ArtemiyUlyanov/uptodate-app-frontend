import { useDictionary } from "@/hooks/useDictionary";
import DefaultButton from "@/ui/buttons/DefaultButton";
import { DefaultDrawer } from "@/ui/drawers/DefaultDrawer";
import { DrawerBody, DrawerTrigger } from "@/ui/drawers/drawer_components";
import DefaultInput from "@/ui/inputs/DefaultInput";
import RoseLink from "@/ui/links/RoseLink";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import RegisterForm from "./RegisterForm";

import { authLoginApi } from "@/services/api/auth.login.endpoint";
import { setUser } from "@/store/features/auth/authSlice";
import { useForm } from 'react-hook-form';
import { addToast } from "@heroui/toast";
import { PersonalAccountIcon } from "@/ui/icons/PersonalAccountIcon";
import { KeyIcon } from "@/ui/icons/KeyIcon";

export type LoginFormProps = {
    trigger: (onClick: () => void) => React.ReactNode
}

export type LoginFormData = {
    username: string
    password: string
}

const LoginForm: React.FC<LoginFormProps> = ({
    trigger
}) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, setError, watch, setValue, formState: { errors, isSubmitting, isValid } } = useForm<LoginFormData>();

    const { translate } = useDictionary();

    const executeLogin = async (data: LoginFormData) => {
        const response = await authLoginApi(data);

        if (response.status == 202) {
            dispatch(setUser({access_token: response.access_token, refresh_token: response.refresh_token, isAuthenticated: true}));

            addToast({
                title: "Welcome Back!",
                description: "You’ve successfully logged in! Ready to dive back in and make some magic happen? ✨🔑",
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
        }

        if (response.error) {
            const auth_error_code = response.error?.status;
            let error: string = translate('common.login.errors.unknown_error');

            if (auth_error_code === 401) {
                error = translate('common.login.errors.user_invalid');
            }

            setError('root', { message: error });
            return Promise.reject();
        }

        return Promise.resolve();
    };

    return (
        <DefaultDrawer
            title={translate('common.login.drawer.name')}
            closeTooltip={translate('common.login.drawer.close_tooltip')}
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
                        onSubmit={handleSubmit(executeLogin)}
                    >
                        <div className={clsx(
                            'flex flex-col gap-2'
                        )}>
                            <p className={clsx(
                                'font-interTight font-semibold text-xl text-primaryText'
                            )}>{translate('common.login.login_form_greetings_text')}</p>
                            <div className={clsx(
                                'flex flex-col items-start'
                            )}>
                                <p className={clsx(
                                    'font-interTight font-medium text-sm text-primaryText'
                                )}>{translate('common.login.login_form_greetings_subtext')}</p>
                                <RegisterForm
                                    trigger={
                                        (onClick) =>
                                            <RoseLink
                                                text={translate('common.login.login_form_sign_up_link')}
                                                link=''
                                                onClick={onClick}
                                                customClassName={clsx(
                                                    'font-interTight font-semibold text-sm text-aspectColor',
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
                                <div className={clsx(
                                    'flex flex-col gap-1'
                                )}>
                                    <p className={clsx(
                                        'font-interTight font-semibold text-sm text-secondaryText'
                                    )}>{translate('common.login.fields.username.name')}</p>
                                    <DefaultInput
                                        {...register('username', { required: translate('common.login.errors.username_field_incorrect') })}

                                        placeholder={translate('common.login.fields.username.input_placeholder')}
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
                                    )}>{translate('common.login.fields.password.name')}</p>
                                    <DefaultInput
                                        {...register('password', { required: translate('common.login.errors.password_field_incorrect') })}

                                        placeholder={translate('common.login.fields.password.input_placeholder')}
                                        customClassName={clsx(
                                            'w-full'
                                        )}
                                        inputClassName='text-base'
                                        fullBordered={true}
                                        value={watch('password')}
                                        handleChange={(value) => setValue('password', value)}
                                        type="password"
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
                                <DefaultButton
                                    text={translate('common.login.login_form_sign_in_button')}
                                    customClassName='font-interTight font-semibold text-base text-center rounded-lg'
                                    type='submit'
                                    isLoading={isSubmitting}
                                    isDisabled={!isValid}
                                />
                            </div>
                        </div>
                    </form>
                )}
            </DrawerBody>
        </DefaultDrawer>
    );
}

export default LoginForm;