"use client";

import clsx from "clsx";
import { use, useEffect, useState } from "react";
import { CustomInputProps } from "../inputs/input.type";
import { CustomTextareaProps } from "./textarea.type";

export type DefaultTextareaProps = CustomTextareaProps;

const DefaultTextarea: React.FC<DefaultTextareaProps> = ({
    placeholder,
    customClassName,
    fullBordered,
    inputClassName,
    handleChange,
    ...props
}) => {
    const [value, setValue] = useState<string>((props.value?.toString() && props.value.toString()) || '');
    const { maxLength } = props;

    const clearInput = () => {
        setValue('');
        handleChange && handleChange('');
    }

    return (
        <div className={clsx(
            'flex flex-col items-start gap-2',
            'pl-[10px] pr-[10px] pt-[5px] pb-[5px]',
            !fullBordered && 'border border-b border-b-borderColor',
            fullBordered && 'border border-borderColor rounded-md',
            'transition-all duration-200',
            customClassName
        )}>
            <div className="flex flex-row items-start w-full gap-2">
                <textarea 
                    placeholder={placeholder}
                    value={value}
                    className={clsx(
                        'bg-[transparent] appearance-none overflow-scroll scrollbar-hide outline-none text-primaryText placeholder-secondaryText resize-none w-full',
                        inputClassName
                    )}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setValue(event.target.value);
                            handleChange && handleChange(event.target.value);   
                    }}
                    {...props}
                ></textarea>
                <p
                    className={clsx(
                        'font-interTight font-medium text-base text-secondaryText select-none',
                        'transition-all duration-200',
                        'active:opacity-[0.5] sm:active:opacity sm:hover:opacity-[0.5]',
                        value.length > 0 ? 'pointer' : 'opacity-[0] pointer-events-none'
                    )}
                    onClick={clearInput}
                >
                    ×
                </p>
            </div>
            {maxLength &&
                <div className="flex flex-row w-full justify-between">
                    <p className="font-interTight font-medium text-sm text-right text-secondaryText select-none">{`${value.length}/${maxLength}`}</p>                
                </div>
            }
        </div>
    );
}

export default DefaultTextarea;