import { FiltersContext, FiltersProvider } from '@/hooks/explore/useFilters';
import clsx from 'clsx';
import React from 'react';
import { LayoutProps } from './layout.type';

export type DefaultLayoutProps = LayoutProps;

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
    children,
    footer,
    ...props
}) => {
    return (
        <div className='relative flex flex-col justify-between items-center gap-16 w-full min-h-[100vh]'>
            <div className={clsx(
                'relative flex flex-col items-center gap-8 w-full h-auto'
            )}>
                <div className={clsx(
                    'relative flex flex-col items-center gap-8 sm:gap-16 mt-[30px] pl-16 pr-16 w-full'
                )}>
                    {children}
                </div>
            </div>
            {footer}
        </div>
    );
}

export default DefaultLayout;