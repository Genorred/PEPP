import React from 'react';
import MaxWidthWrapper from "@/shared/ui/MaxWidthWrapper";
import Link from "next/link";
import NavItem from "@/widgets/Navbar/NavItem";
import { CardVariants } from "@/shared/consts/CardVariants";

const Navbar = () => {
    return (
        <MaxWidthWrapper className="my-4" role={"navigation"} variant={'section'}>
                <ul className="flex gap-3">
                    <NavItem title="Topics" href="/topics"/>
                    <NavItem title="Posts" href="/posts"/>
                    <NavItem title="Saved" href="/saved"/>
                    <NavItem title="My Posts" href="/my-posts"/>
                    <NavItem title="Create" href="/create-post"/>
                    <NavItem title="Drafts" href="/drafts" className="mr-auto"/>
                    <NavItem title="Analityc" href="/analityc"/>

                    <NavItem title="Friends" href="/friends"/>
                    <NavItem title="Notifications" href="/notifications"/>
                    <NavItem title="Settings" href="/settings"/>
                    <NavItem title="Profile" href="/profile"/>
                </ul>
        </MaxWidthWrapper>
    );
};

export default Navbar;