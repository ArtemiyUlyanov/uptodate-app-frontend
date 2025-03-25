import clsx from "clsx";

export type SettingsAccountChangePasswordFormRequirementProps = React.HTMLProps<HTMLDivElement> & {
    complied: boolean
    text: string
}

export const SettingsAccountChangePasswordFormRequirement: React.FC<SettingsAccountChangePasswordFormRequirementProps> = ({
    complied,
    text
}) => {
    return (
        <div className="flex flex-row gap-2 items-center">
            {complied ?
                <p className="font-interTight font-medium text-sm text-aspectText">✓</p>
            :
                <p className="font-interTight font-medium text-sm text-secondaryText">⨉</p>
            }
            <p className={clsx(
                "font-interTight font-medium text-sm",
                complied && "text-aspectText",
                !complied && 'text-secondaryText'
            )}>{text}</p>
        </div>
    );
}