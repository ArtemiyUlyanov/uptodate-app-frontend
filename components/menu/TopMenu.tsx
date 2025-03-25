'use client';

import { useSearch } from "@/hooks/models/useSearch";
import { RootState } from "@/store/store";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopMenuContent from "./TopMenuContent";

export type TopMenuProps = React.HTMLProps<HTMLDivElement[]> & {
    optionTemplates: TopMenuOption[]
}

export type TopMenuOption = {
    key: string
    text: string
    link: string
    selected: boolean
    className?: string
}

export const getTopMenuOptions = (translate: (text: string) => string, selectedKey?: 'home' | 'explore' | 'about-us' | 'categories'): TopMenuOption[] => {
    return [
        {
            key: 'home',
            text: translate('common.menu.home_page_link'),
            link: '/',
            selected: selectedKey === 'home'
        },
        {
            key: 'explore',
            text: translate('common.menu.explore_page_link'),
            link: '/explore',
            selected: selectedKey === 'explore'
        },
        {
            key: 'about-us',
            text: translate('common.menu.about_us_page_link'),
            link: '/about-us',
            selected: selectedKey === 'about-us'
        },
        {
            key: 'categories',
            text: translate('common.menu.categories_page_link'),
            link: '/categories',
            selected: selectedKey === 'categories'
        }
    ]
}

const TopMenu: React.FC<TopMenuProps> = ({
    optionTemplates
}) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { articles } = useSearch();

    const dispatch = useDispatch();

    const [isProfileSettingsUnwrapped, setIsProfileSettingsUnwrapped] = useState<boolean>(false);
    const [menuStatus, setMenuStatus] = useState<boolean>(false);
    const [isSearchUnwrapped, setIsSearchUnwrapped] = useState<boolean>(false);
    
    const toggleMenuStatus = () => {
        setMenuStatus(prev => !prev);
    }

    useEffect(() => {
        setIsSearchUnwrapped(false);
    }, [articles]);

    return (
        <div 
            className={clsx(
                'fixed w-full z-[9999]',
                'flex flex-row justify-center',
                'transition-all duration-500',
                !isSearchUnwrapped && 'h-auto max-h-auto bg-black/0',
                isSearchUnwrapped && 'h-full max-h-full bg-black/15'
            )}
        >
            <div 
                className={clsx(
                    'flex pl-16 pr-16 w-full justify-between h-[60px] z-[9999] bg-backgroundColor',
                    'border-b border-b-borderColor'
                )}
            >
                <TopMenuContent
                    optionTemplates={optionTemplates}
                    onTogglingSearch={() => setIsSearchUnwrapped(prev => !prev)}
                />
            </div>
        </div>
    );
}

export default TopMenu;