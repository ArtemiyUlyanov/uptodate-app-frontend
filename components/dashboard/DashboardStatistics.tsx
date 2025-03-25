import { useAccountStatistics } from "@/hooks/models/useAccountStatistics";
import { useUsers } from "@/hooks/models/useUsers";
import { UserModel } from "@/models/user";
import { UserStatisticsModel } from "@/models/user_statistics";
import { InfoIcon } from "@/ui/icons/InfoIcon";
import { Avatar, AvatarGroup, Tooltip } from "@heroui/react";

export type DashboardStatisticsProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    statistics?: UserStatisticsModel
}

export const DashboardStatistics: React.FC<DashboardStatisticsProps> = ({
    user,
    statistics
}) => {
    const { users: viewedUsers } = useUsers({ ids: statistics?.lastViews?.flatMap(view => view.userId !== undefined ? [view.userId] : []) ?? [] });
    const { users: likedUsers } = useUsers({ ids: statistics?.lastLikes?.map(like => like.userId) || [] });

    return (
        <div className="flex flex-row gap-4 w-full">
            <div className="w-full">
                <div className="flex flex-col gap-4 w-full bg-emphasizingColor2 rounded-lg p-4">
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center gap-2">
                            <p className="font-interTight font-semibold text-sm text-primaryText">Last views</p>
                            <Tooltip
                                content='This indicates how many users have viewed your articles last 24 hours'
                                closeDelay={0}
                                classNames={{
                                    content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryColor'
                                }}
                            >
                                <div className="h-4 fill-secondaryText">
                                    <InfoIcon />
                                </div>
                            </Tooltip>
                        </div>
                        <p className="font-interTight font-semibold text-xl text-primaryText">{statistics?.lastViews?.length}</p>
                    </div>
                    <AvatarGroup 
                        max={3} 
                        size="sm"
                        classNames={{
                            count: "font-interTight font-semibold text-primaryText bg-emphasizingColor3"
                        }}
                    >
                        {viewedUsers?.map(viewedUser =>
                            <Avatar key={viewedUser.id} src={viewedUser.icon} />
                        )}
                    </AvatarGroup>
                </div>
            </div>
            <div className="w-full">
                <div className="flex flex-col gap-4 w-full bg-emphasizingColor2 rounded-lg p-4">
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center gap-2">
                            <p className="font-interTight font-semibold text-sm text-primaryText">Last likes</p>
                            <Tooltip
                                content='This indicates how many users have viewed your articles last 24 hours'
                                closeDelay={0}
                                classNames={{
                                    content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryColor'
                                }}
                            >
                                <div className="h-4 fill-secondaryText">
                                    <InfoIcon />
                                </div>
                            </Tooltip>
                        </div>
                        <p className="font-interTight font-semibold text-xl text-primaryText">{statistics?.lastLikes?.length}</p>
                    </div>
                    <AvatarGroup 
                        max={3} 
                        size="sm"
                        classNames={{
                            count: "font-interTight font-semibold text-primaryText bg-emphasizingColor3"
                        }}
                    >
                        {likedUsers?.map(likedUser =>
                            <Avatar key={likedUser.id} src={likedUser.icon} />
                        )}
                    </AvatarGroup>
                </div>
            </div>
        </div>
    );
}