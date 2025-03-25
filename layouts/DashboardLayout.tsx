import clsx from "clsx";
import { LayoutProps } from "./layout.type";
import MenuLayout from "./MenuLayout";
import { useDictionary } from "@/hooks/useDictionary";
import { DashboardNavigation, getDashboardOptions } from "@/components/dashboard/DashboardNavigation";
import { DashboardIcon } from "@/ui/icons/DashboardIcon";
import DefaultLayout from "./DefaultLayout";
import { UserModel } from "@/models/user";

export type DashboardLayoutProps = LayoutProps & {
    user?: UserModel
    navigation: React.ReactElement
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    user,
    footer,
    navigation,
    children
}) => {
    const { translate } = useDictionary(user);

    return (
        <div className='relative flex flex-col justify-between items-center w-full min-h-[100vh]'>
            <div className={clsx(
                'relative flex flex-col items-center gap-8 w-full h-auto'
            )}>
                <div className={clsx(
                    'relative flex flex-col items-center w-full'
                )}>
                    <div className="relative flex flex-row w-full">
                        {navigation}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}