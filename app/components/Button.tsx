'use client';

import type { IconType } from 'react-icons';

import React from 'react';

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

export default ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
        ${
            outline
                ? 'bg-white border-black text-black hover:bg-neutral-100'
                : 'bg-rose-500 border-rose-500 text-white'
        }
        ${
            small
                ? 'py-1 text-sm font-light border-[1px]'
                : 'py-3 text-md font-semibold border-2'
        }
        `}
        >
            {Icon && <Icon size={24} className="absolute left-4 top-3"></Icon>}
            {label}
        </button>
    );
};
