import { logoutUser } from "@/_store/auth.slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { TOKEN_KEY } from "@/_utils/userToken";
import { setCookie } from "cookies-next";
import useAuthHelper from "@/_hooks/useAuthHelper";
import CircularLoader from "@/_components/common/loader/circular-loader";

function Logout({domain}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { getAuthToken } = useAuthHelper();
  const [loading, setLoading] = useState(true);

  const handleLogOut = async () => {
    dispatch(logoutUser());
    try {
      const result = await getAuthToken(domain);
      setCookie(TOKEN_KEY, result?.token);
    } catch (error) {
      console.error("Error during logout: ", error);
    } finally {
      setLoading(false);
      router.push('/my-account');
    }
  };
  
  useEffect(() => {
    handleLogOut()
  }, [])

    return (
      <>
      {loading && <CircularLoader/>}
      </>
    );
  }
  export default Logout;
  