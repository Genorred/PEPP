import React, { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";
import { CardVariants, CardVariantsEnum } from "@/shared/consts/CardVariants";

const MaxWidthWrapper = ({className, children, variant, ...props}: {
    className?: string,
    children?: React.ReactNode,
    variant?: CardVariantsEnum
} & HTMLAttributes<HTMLDivElement>) => {
    return (
        <section className={cn("mx-auto w-full max-w-screen-xl px-2.5 md:px-20 py-4", variant ? CardVariants(variant) : '', className)} {...props}>
            {children}
        </section>
    );
};

export default MaxWidthWrapper;