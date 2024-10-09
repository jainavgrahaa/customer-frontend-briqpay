import useAuthHelper from "@/_hooks/useAuthHelper";
import { logoutUser } from "@/_store/auth.slice";
import { ASM_TOKEN_KEY, ASM_USER_EMAIL, TOKEN_KEY } from "@/_utils/userToken";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

const AsmHeader = ({ asmUserEmail, storeId }) => {
  const { userDetails } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const { getAuthToken, getASMNavigationByStore } = useAuthHelper();
  const isAsmCustomerSelected = userDetails?.firstname && asmUserEmail;
  const isAsmUser = !userDetails?.firstname && asmUserEmail;

  const handleLogout = async () => {
    deleteCookie(ASM_TOKEN_KEY);
    deleteCookie(ASM_USER_EMAIL);
    const domain = localStorage?.getItem("domain");
    const result = await getAuthToken(domain);
    setCookie(TOKEN_KEY, result?.token);
    dispatch(logoutUser());
    router.push("/asm-admin");
  };

  const handleChange = () => {
    router.push("/asm-admin");
  };

  const fetchAsmNavigation = async () => {
    const response = await getASMNavigationByStore(storeId);
    setLinks(response);
    setLoading(false);
  };

  useEffect(() => {
    if (storeId) {
      fetchAsmNavigation();
    }
  }, [storeId]);

  if (loading) return null;

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#F0E68C",
          padding: 2,
        }}
      >
        <span><FormattedMessage id="asm.loggedInUser" /></span>
        {isAsmCustomerSelected ? <FormattedMessage id="asm.onBehalf" /> : ""}
        <span style={{ paddingLeft: 5, fontWeight: 700 }}>
          {isAsmUser ? getCookie(ASM_USER_EMAIL) : ""}
          {isAsmCustomerSelected
            ? userDetails?.firstname + " " + userDetails?.lastname
            : ""}
        </span>{" "}
        -{" "}
        <span
          onClick={handleChange}
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          {isAsmUser ? <FormattedMessage id="asm.selectCustomer" /> : ""}
          {isAsmCustomerSelected ? <FormattedMessage id="asm.changeCustomer" /> : ""}
        </span>{" "}
        -{" "}
        <span
          onClick={handleLogout}
          style={{ cursor: "pointer", fontWeight: 700 }}
        >
          <FormattedMessage id="common.Logout" />
        </span>
      </div>
      {(isAsmUser || isAsmCustomerSelected) && links?.length ? (
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#F0E68C",
            padding: 2,
          }}
        >
          {links.map((ele, i) => (
            <>
              <span
                role="button"
                onClick={() => router.push(ele.urlSlug)}
                style={{ paddingLeft: 5, fontWeight: 700 }}
              >
                {ele.title}
              </span>{" "}
              <span>{i < links?.length - 1 ? "|" : ""}</span>
            </>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AsmHeader;
