import SliderSectionCustomArrow from "@/_components/common/sliders/SliderSectionCustomArrow";
import TopBanner from "@/_components/common/TopBanner";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { categoryData } from "@/_utils/customApiData";
import { bestsellerData } from "@/_utils/customApiData";
import Link from "next/link";

export const EmptyCart = () => {
  const { deviceType } = useDeviceHelper();

  return (
    <div className="container">
      <div className="empty-cart-page">
        <div className="empty-shopping-bag">
          <div className="empty-shopping-bag-title">
            <h1>Shopping Bag</h1>
          </div>
          <div className="empty-shopping-bag-content">
            <h4>Your shopping bag is empty</h4>
            <p>
              You currently there are no products in your shopping bag. Browse
              to find your perfect jewellery!
            </p>
            <Link href="/" className="btn-link-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
        <SliderSectionCustomArrow
          images={categoryData}
          titleText={"Shop by"}
          titleHighlightText="Category"
          extraClass="theme-02 type-fixed"
          type="type1"
          slideView={2.1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 6 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
        />
        <div className="winter-sale-banner mb-5">
          {deviceType !== "mobile" &&
          <img src={"/assets/images/winter-sale.png"} alt="winter-sale" className="w-100" />
          }
           {deviceType === "mobile" &&
          <img src={"/assets/images/winter-sale-mobile.png"} alt="winter-sale" className={`w-100 ${deviceType === "mobile" ? "mt-4" : ""}`} />
           }
        </div>
        <SliderSectionCustomArrow
          images={bestsellerData}
          titleText={"Bestselling"}
          extraClass="theme-02 pb-0"
          type="type1"
          slideView={1.7}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 6 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
        />
      </div>
    </div>
  );
};
