import { FiltersContext, FiltersProvider } from '@/hooks/explore/useFilters';
import clsx from 'clsx';
import React from 'react';
import { LayoutProps } from './layout.type';

export type MenuLayoutProps = LayoutProps;

const MenuLayout: React.FC<MenuLayoutProps> = ({
    children,
    topMenu,
    footer,
    ...props
}) => {
    return (
        <div className='relative flex flex-col justify-between items-center gap-16 w-full min-h-[100vh]'>
            <div className={clsx(
                'relative flex flex-col items-center gap-8 w-full h-auto'
            )}>
                {topMenu}
                <div className={clsx(
                    'relative flex flex-col items-center gap-8 sm:gap-16 mt-[120px] w-full'
                )}>
                    {children}
                </div>
            </div>
            {footer}
        </div>
    );
}

export default MenuLayout;