import React, { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";
import { CardVariants, CardVariantsEnum } from "@/shared/consts/CardVariants";

const MaxWidthWrapper = forwardRef<HTMLDivElement, {
    className?: string,
    children?: React.ReactNode,
    variant?: CardVariantsEnum
} & HTMLAttributes<HTMLDivElement>>(({className, children, variant, ...props}, ref) => {
    return (
        <section ref={ref} className={cn("mx-auto w-full max-w-screen-xl px-2.5 md:px-20 py-4", variant ? CardVariants(variant) : '', className)} {...props}>
            {children}
        </section>
    );
});

export default MaxWidthWrapper;