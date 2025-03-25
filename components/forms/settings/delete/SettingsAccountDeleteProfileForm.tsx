import { UserModel } from "@/models/user";
import { ApiAccountDeleteParams, ApiAccountDeleteResponse } from "@/services/api/account.delete.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { TrashIcon } from "@/ui/icons/TrashIcon";
import { ConfirmationPopover } from "@/ui/popovers/ConfirmationPopover";
import { Button } from "@heroui/react";
import { UseMutateFunction } from "@tanstack/react-query";
import clsx from "clsx";

export type SettingsAccountDeleteProfileFormProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    deleteMutate: UseMutateFunction<ApiAccountDeleteResponse, ErrorResponse, ApiAccountDeleteParams, unknown>
    isDeletePending: boolean
}

export const SettingsAccountDeleteProfileForm: React.FC<SettingsAccountDeleteProfileFormProps> = ({
    user,
    deleteMutate,
    isDeletePending
}) => {
    return (
        <div className="pb-4 pt-8">
            <ConfirmationPopover
                text="Are you sure you want to delete your article? You will not be able to discard changes!"
                action={() => deleteMutate({})}
            >
                {(onOpen) => (
                    <Button
                        className={clsx(
                            'gap-1.5 bg-[transparent]',
                            'data-[hover=true]:bg-emphasizingColor2',
                            'transition-all duration-200',
                        )}
                        onPress={onOpen}
                        isLoading={isDeletePending}
                        isDisabled={user === undefined || isDeletePending}
                        size="sm"
                        variant='light'
                        startContent={
                            <div className="h-4 fill-redColor">
                                <TrashIcon />
                            </div>
                        }
                    >
                        <p className="font-interTight font-semibold text-sm text-redText">Delete my account</p>
                    </Button>
                )}
            </ConfirmationPopover>
        </div>
    );
}