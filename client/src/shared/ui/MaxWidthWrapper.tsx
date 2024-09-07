import React, {HTMLAttributes} from 'react';
import {cn} from "@/shared/lib/utils";
const CardVariants = ["", "section"]
type CardEnum = typeof CardVariants[number]

export const CardVariantsObj: Record<CardEnum, string> = {
    "": "",
    "section": "rounded-sm border-2 border-secondary bg-white"
}
const MaxWidthWrapper = ({className, children, variant = "", ...props}: {
    className?: string,
    children?: React.ReactNode,
    variant?: CardEnum
} & HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn("mx-auto w-full max-w-screen-xl px-2.5 md:px-20 py-4", CardVariantsObj[variant], className)} {...props}>
            {children}
        </div>
    );
};

export default MaxWidthWrapper;