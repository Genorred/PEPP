import React, { HTMLAttributes } from "react";
import { CardVariants, CardVariantsEnum } from "@/shared/consts/CardVariants";
import { cn } from "@/shared/lib/utils";

const Card = ({className, children, variant = 'subSection', ...props}: {
    className?: string,
    children?: React.ReactNode,
    variant?: CardVariantsEnum
} & HTMLAttributes<HTMLDivElement>) => {
    return (
        <section className={cn("mx-auto w-full px-2.5 py-4 flex flex-col", variant ? CardVariants(variant) : '', className)} {...props}>
            {children}
        </section>
    );
};

export default Card;