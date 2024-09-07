import React from 'react';
import Link from "next/link";

const NavItem = ({href, title, className}: {
    href: string,
    title: string,
    className?: string,
}) => {
    return (
        <li className={className}>
            <Link href={href}>
                {title}
            </Link>
        </li>
    );
};

export default NavItem;