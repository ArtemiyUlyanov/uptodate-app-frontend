import LoginForm from "@/components/forms/auth/LoginForm";
import { TopMenuUserDropdown } from "@/components/menu/TopMenuUserDropdown";
import { useDictionary } from "@/hooks/useDictionary";
import { setLanguage } from "@/store/features/language/languageSlice";
import { RootState } from "@/store/store";
import { Link } from "@heroui/react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import SelectableDropdown from "../../ui/dropdowns/SelectableDropdown";
import { FranceFlagIcon } from "../../ui/icons/FranceFlagIcon";
import { LanguageIcon } from "../../ui/icons/LanguageIcon";
import { RussiaFlagIcon } from "../../ui/icons/RussiaFlagIcon";
import { UKFlagIcon } from "../../ui/icons/UKFlagIcon";
import { UptodateIcon } from "../../ui/icons/UptodateIcon";
import DefaultLink from "../../ui/links/DefaultLink";
import { TopMenuOption } from "./TopMenu";
import TopMenuSearch from "./TopMenuSearch";
import { useAccount } from "@/hooks/models/useAccount";
import { useRouter } from "next/navigation";

export type TopMenuContentProps = React.HTMLProps<HTMLDivElement> & {
    optionTemplates: TopMenuOption[]
    onTogglingSearch: () => void
}

const TopMenuContent: React.FC<TopMenuContentProps> = ({
    optionTemplates,
    onTogglingSearch
}) => {
    const { user, isFetched: isUserFetched, editMutate } = useAccount();

    const { language, translate } = useDictionary(user);
    const dispatch = useDispatch();

    const changeLanguage = (language: string) => {
        if (!user) {
            dispatch(setLanguage({ language }));
        } else {
            editMutate({ 
                firstName: user?.firstName,
                lastName: user.lastName,
                username: user.username,
                settings: {...user.settings, language: language}
            });
        }
    }

    return (
        <>
            <div className={clsx(
                'flex flex-row items-center w-auto h-full gap-8'
            )}>
                <Link
                    href="/explore" 
                    className={clsx(
                        'fill-primaryText',
                        'w-auto h-5',
                        'hover:opacity-50',
                        'active:hover:opacity-50 sm:active:hover'
                    )}
                >
                    <UptodateIcon
                        className='w-auto'
                    />
                </Link>
                <div className={clsx(
                    'flex flex-row items-center gap-6 hidden md:flex'
                )}>
                    {optionTemplates.map((option) => 
                        <DefaultLink
                            key={`menu-option-${option.text}`}
                            text={option.text}
                            link={option.link}
                            actived={!option.selected}
                            underliningActived={!option.selected}
                            customClassName={clsx(
                                'font-interTight font-semibold text-sm',
                                'transition-all duration-200',
                                option.selected && 'text-primaryText',
                                !option.selected && 'text-secondaryText hover:text-primaryText',
                                option.className
                            )}
                        />
                    )}
                </div>
            </div>
            <div className={clsx(
                'flex flex-row items-center gap-6 w-auto h-[100%] hidden md:flex',
            )}>
                <TopMenuSearch user={user} />
                <SelectableDropdown 
                    selectedKeys={[language]}
                    size='sm'
                    icon={
                        <LanguageIcon 
                            className="w-auto aspect-square fill-primaryColor h-full"
                        />
                    }
                    classNames={{
                        trigger: 'text-primaryText',
                        unwrappingElement: 'fill-primaryText'
                    }}
                    onSelected={(keys) => changeLanguage(Array.from(keys)[0])}
                    options={[
                        {
                            name: "English",
                            classNames: {title: 'text-primaryText'},
                            value: 'en',
                            icon: (
                                <div className={clsx(
                                    'w-4'
                                )}>
                                    <UKFlagIcon className="w-auto h-full rounded-full" />
                                </div>
                            )
                        },
                        {
                            name: "Français (demo)",
                            classNames: {title: 'text-primaryText'},
                            value: 'fr',
                            icon: (
                                <div className={clsx(
                                    'w-4'
                                )}>
                                    <FranceFlagIcon className="w-auto h-full rounded-full" />
                                </div>
                            )
                        },
                        {
                            name: "Русский",
                            classNames: {title: 'text-primaryText'},
                            value: 'ru',
                            icon: (
                                <div className={clsx(
                                    'w-4'
                                )}>
                                    <RussiaFlagIcon className="w-auto h-full rounded-full" />
                                </div>
                            )
                        },
                    ]}
                />
                {!user &&      
                    <LoginForm 
                        trigger={
                            (onClick) =>
                                <DefaultLink
                                    text={translate('common.menu.sign_in_button')}
                                    link=""
                                    onClick={onClick}
                                    actived={true}
                                    arrowActived={false}
                                    underliningActived={false}
                                    customClassName="font-interTight font-semibold text-base"
                                />
                        }
                    />
                }
                {user && 
                    <TopMenuUserDropdown user={user} isUserFetched={isUserFetched} />
                }
            </div>
        </>
    )
}

export default TopMenuContent;