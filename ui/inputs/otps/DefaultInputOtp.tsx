"use client";

import clsx from "clsx";
import React, { use, useEffect, useState } from "react";
import { CustomInputProps } from "../input.type";
import { InputOtp } from "@heroui/react";

export type DefaultInputOtpProps = {
    handleChange?: (value: string) => void
    handleComplete?: () => void
    length?: number
    isDisabled?: boolean
    defaultProps?: React.HTMLProps<HTMLInputElement>
}

const DefaultInputOtp: React.FC<DefaultInputOtpProps> = ({
    handleChange,
    handleComplete,
    defaultProps,
    isDisabled,
    ...props
}) => {
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        if (defaultProps?.value !== undefined) {
            const newValue = defaultProps?.value as string;
            
            setValue(newValue);
            handleChange && handleChange(newValue);
        }
    }, [defaultProps?.value]);

    return (
        <InputOtp
            length={length || 4} 
            value={value}
            variant="bordered"
            classNames={{
                segment: clsx(
                    'bg-[transparent] shadow-none',
                    'font-interTight font-medium text-primaryText',
                    'border border-borderColor rounded-md',
                )
            }}
            onValueChange={(value) => {
                setValue(value);
                handleChange && handleChange(value);
            }}
            isDisabled={isDisabled}
            onComplete={handleComplete}
            {...props}
        />
    );
}

export default DefaultInputOtp;