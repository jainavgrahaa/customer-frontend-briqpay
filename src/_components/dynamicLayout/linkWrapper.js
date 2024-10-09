import React, { Fragment } from "react";
import Link from "../common/Link";

const LinkWrapper = ({
    data = {},
    fallBackAs = Fragment,
    structure = {},
    children,
    className,
    deviceType
}) => {
    const HeadType = data.link ? Link : fallBackAs;
    const linkProps = {};
    if (data.link) {
        linkProps.href = data.link;
        linkProps.target = ["window", "newTab"].includes(structure.linkTarget?.[deviceType]) ? "_blank" : "";
        linkProps.className = className
    }

    return (
        <HeadType {...linkProps}>
            {children}
        </HeadType>
    );
}

export default LinkWrapper;
