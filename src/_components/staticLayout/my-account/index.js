import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import SubHeadTabs from "@/_components/common/myAccount/wishlist/SubHeadTabs";
import SliderSectionCustomArrow from "@/_components/common/sliders/SliderSectionCustomArrow";
import { bestsellerData } from "@/_utils/customApiData";
import { getCookie } from 'cookies-next';
import { ASM_TOKEN_KEY, TOKEN_KEY } from "@/_utils/userToken";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

const WishList = ({ storeId, translateId, currency }) => {
  const { userDetails } = useSelector((state) => state.auth);
  const userToken = getCookie(TOKEN_KEY);
  const router = useRouter();

  useEffect(() => {
    if (!userToken) {
      router.push('/account-login');
    }
  }, [userToken]);

  if((!userDetails || userDetails?.isGuest) && !getCookie(ASM_TOKEN_KEY)) return null;

  return (
    <div className="wishlist_page">
      <Head>
        <link rel="stylesheet" href="/assets/css/myAccount.css" />
      </Head>
      <SubHeadTabs storeId={storeId} translateId={translateId} currency={currency} />
      {/* {user && (
        <div>
          Name: {user.firstname} {user.lastname}
        </div>
      )} */}
      <SliderSectionCustomArrow
        images={bestsellerData}
        titleText={<FormattedMessage id="wishlist.bestSelling" />}
        extraClass="theme-02"
        type="type1"
        slideView={2}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 6 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
        }}
      />
      {/* <AppointmentBlock /> */}
    </div>
  );
};

WishList.isProtectedPage = true;

export default WishList;
