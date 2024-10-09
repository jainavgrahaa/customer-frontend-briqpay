// import SliderSectionMyAcc from '@/_components/common/myAccount/wishlist/SliderSectionCustomArrow';
import SubHeadTabs from "@/_components/common/myAccount/wishlist/SubHeadTabs";
import SliderSectionCustomArrow from "@/_components/common/sliders/SliderSectionCustomArrow";
import { bestsellerData } from "@/_utils/customApiData";
import { useSelector } from "react-redux";
const Wishlist = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <SubHeadTabs />
      {user && (
        <div>
          Name: {user.firstname} {user.lastname}
        </div>
      )}
      <SliderSectionCustomArrow
        images={bestsellerData}
        titleText={"Bestselling"}
        extraClass="theme-02"
        type="type1"
        slideView={2}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 6 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
        }}
      />
    </>
  );
};
export default Wishlist;
