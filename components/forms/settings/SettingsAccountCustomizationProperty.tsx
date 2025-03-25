import { useTimezones } from "@/hooks/models/useTimezones";
import { useUploader } from "@/hooks/uploader/useUploader";
import { TimezoneModel } from "@/models/timezone";
import { UserModel } from "@/models/user";
import { UserSettingsModel } from "@/models/user_settings";
import DefaultButton from "@/ui/buttons/DefaultButton";
import { FranceFlagIcon } from "@/ui/icons/FranceFlagIcon";
import { RussiaFlagIcon } from "@/ui/icons/RussiaFlagIcon";
import { TrashIcon } from "@/ui/icons/TrashIcon";
import { UKFlagIcon } from "@/ui/icons/UKFlagIcon";
import { UploadFileIcon } from "@/ui/icons/UploadFileIcon";
import { UserAvatarIcon } from "@/ui/icons/UserAvatarIcon";
import DefaultInput from "@/ui/inputs/DefaultInput";
import { Autocomplete, AutocompleteItem, AutocompleteSection, Button, Tooltip } from "@heroui/react";
import clsx from "clsx";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

export type SettingsAccountCustomizationPropertyProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    settings: UserSettingsModel | undefined
    setSettings: Dispatch<SetStateAction<UserSettingsModel | undefined>>
}

export const SettingsAccountCustomizationProperty: React.FC<SettingsAccountCustomizationPropertyProps> = ({
    user,
    settings,
    setSettings
}) => {
    const { timezones } = useTimezones({});
    const groupedTimezones = useMemo(() => {
        return timezones?.reduce<Record<string, TimezoneModel[]>>((acc, timezone) => {
            if (!acc[timezone.continent]) {
                acc[timezone.continent] = [];
            }
    
            acc[timezone.continent].push(timezone);
            return acc;
        }, {});
    }, [timezones]);

    return (
        <div className="flex flex-col gap-2 pt-4 pb-4">
            <p className="font-interTight font-semibold text-sm text-secondaryText">Customization</p>
            <div className="flex flex-col items-start gap-4">
                <Autocomplete 
                    className={clsx(
                        "max-w-xs"
                    )}
                    inputProps={{
                        classNames: {
                            input: 'font-interTight font-regular text-base text-primaryText placeholder:text-secondaryText',
                            inputWrapper: "rounded-lg !border !border-borderColor outline-none ring-0"
                        }
                    }}
                    listboxProps={{
                        itemClasses: {
                            title: 'font-interTight font-medium text-primaryText',
                            base: 'data-[hover=true]:bg-emphasizingColor3',
                            selectedIcon: 'text-aspectText'
                        }
                    }}
                    classNames={{
                        popoverContent: 'bg-emphasizingColor2 border border-borderColor',
                        clearButton: 'text-secondaryText',
                        selectorButton: 'text-secondaryText'
                    }}
                    label={
                        <p className="font-interTight font-semibold text-secondaryText">Timezone</p>
                    }
                    variant="bordered"
                    placeholder="Select a timezone"
                    allowsEmptyCollection={false}
                    selectedKey={settings?.timezone}
                    onSelectionChange={(value) => setSettings(prev => {
                        if (prev == undefined) return prev;
                        return {...prev, timezone: value as string};
                    })}
                    defaultSelectedKey={settings?.timezone}
                >
                    {Object.entries(groupedTimezones || {}).map(([continent, timezones]) =>
                        <AutocompleteSection 
                            showDivider 
                            key={continent}
                            title={continent}
                            classNames={{
                                heading: 'font-interTight font-semibold text-secondaryText pt-2'
                            }}
                        >
                            {timezones.map(timezone => 
                                <AutocompleteItem key={timezone.fullName}>{timezone.fullName}</AutocompleteItem>
                            )}
                        </AutocompleteSection>
                    )}
                </Autocomplete>
                <Autocomplete 
                    className={clsx(
                        "max-w-xs",
                        "font-interTight font-medium text-base text-primaryText"
                    )}
                    inputProps={{
                        classNames: {
                            input: 'font-interTight font-regular text-base text-primaryText placeholder:text-secondaryText',
                            inputWrapper: "rounded-lg !border !border-borderColor outline-none ring-0"
                        }
                    }}
                    listboxProps={{
                        itemClasses: {
                            title: 'font-interTight font-medium text-primaryText',
                            base: 'data-[hover=true]:bg-emphasizingColor3',
                            selectedIcon: 'text-aspectText'
                        }
                    }}
                    classNames={{
                        popoverContent: 'bg-emphasizingColor2 border border-borderColor',
                        clearButton: 'text-secondaryText',
                        selectorButton: 'text-secondaryText'
                    }}
                    label={
                        <p className="font-interTight font-semibold text-secondaryText">Language</p>
                    }
                    variant="bordered"
                    placeholder="Select a timezone"
                    allowsEmptyCollection={false}
                    selectedKey={settings?.language}
                    onSelectionChange={(value) => setSettings(prev => {
                        if (prev == undefined) return prev;
                        return {...prev, language: value as string};
                    })}
                    defaultSelectedKey={settings?.language}
                >
                    <AutocompleteItem
                        startContent={
                            <div className="h-4">
                                <UKFlagIcon />
                            </div>
                        }
                        key='en'
                    >
                        English
                    </AutocompleteItem>
                    <AutocompleteItem
                        startContent={
                            <div className="h-4">
                                <FranceFlagIcon />
                            </div>
                        }
                        key='fr'
                    >
                        Français (demo)
                    </AutocompleteItem>
                    <AutocompleteItem
                        startContent={
                            <div className="h-4">
                                <RussiaFlagIcon />
                            </div>
                        }
                        key='ru'
                    >
                        Русский
                    </AutocompleteItem>
                </Autocomplete>
            </div>
        </div>
    );
}