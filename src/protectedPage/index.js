/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import {  ASM_USER_EMAIL, TOKEN_KEY } from "@/_utils/userToken";
import { getCookie } from 'cookies-next';
import { loginUser, userDetail } from "@/_store/auth.slice";
import { usePathname } from "next/navigation";
import useAuthHelper from "@/_hooks/useAuthHelper";

const ProtectedPage = ({ children }) => {
    const { user, userDetails } = useSelector(state => state.auth);
    const [isInit, setInit] = useState(false);
    const asmUserEmail = getCookie(ASM_USER_EMAIL)
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname()
    const { getUserDetails } = useAuthHelper();

    useEffect(() => {
        setInit(true);
    }, []);

    useEffect(() => {
        if(getCookie(TOKEN_KEY) && !userDetails) {
            (async () => {
                const details = await getUserDetails();
                dispatch(userDetail(details?.data));
            })()
        }
    }, [getCookie(TOKEN_KEY)])

    useEffect(() => {
        if (!isInit) {
            return;
        }

        const token = getCookie(TOKEN_KEY);

        // Check has user detail
        if (userDetails?.isGuest && pathname === '/my-account' && !asmUserEmail) {
            // Set on the session once sign-in user will be redirect on this path
            // setRedirectUrl(router.route);
            router.push(`/account-login`); // Redirect to sign-in
        }

        const details = token ? jwtDecode(token) : null;
        if(!user) {
            dispatch(loginUser(details));
        }


    }, [isInit, router?.asPath, userDetails?.isGuest]);

    // if user has detail show protected page
    if (isInit && !userDetails?.isGuest) {
        return children;
    }

    /* otherwise don't return anything, it will redirect from useEffect */
    return children;
}

export default ProtectedPage;
