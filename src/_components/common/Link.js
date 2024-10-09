import { useRouter } from "next/router";
import NextLink from "next/link";

const Link = ({
    children,
    locale,
    href,
    ...rest
}) => {
    const router = useRouter();
    const linkLocal = locale || router.locale; 

    return (
        <NextLink href={href || "#"} {...rest} locale={linkLocal}>{children}</NextLink>
    );
}

export default Link;
