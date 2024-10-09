/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Order from "../../../staticLayout/my-account/Order";
import Address from "../../../staticLayout/my-account/Address";
import ProfileSetting from "../../../staticLayout/my-account/Profilesetting";
import { logoutUser } from "@/_store/auth.slice";
import { wishlist } from "@/_utils/customApiData";
import { stepCheck } from "@/_utils";
import { ASM_TOKEN_KEY, ASM_USER_EMAIL, TOKEN_KEY } from "@/_utils/userToken";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { FormattedMessage } from "react-intl";
import ShareWishListModal from "./Share-wishlist-modal";

const tabs = {
  wishlist: 1,
  order: 2,
  address: 3,
  profile: 4,
};

const SubHeadTabs = ({ storeId, translateId, currency }) => {
  const router = useRouter();
  const [toggleState, setToggleState] = useState(tabs[router.query?.tab] || 1);
  const [toggleComponent, setToggleComponent] = useState(2);
  const [shareModal, setshareModal] = useState(false);
  const [products, setProducts] = useState(null);
  const { getAuthToken, getWishList } = useAuthHelper();
  const userToken = getCookie(TOKEN_KEY);
  const dispatch = useDispatch();

  const fetchWishList = async () => {
    if (storeId) {
      const data = await getWishList(storeId);
      setProducts(data);
    }
  };

  useEffect(() => {
    if (!userToken) {
      router.push("/account-login");
    } else {
      fetchWishList();
    }
  }, [userToken]);
  const closeShareModal = () => {
    setshareModal(false);
  };
  const toggleTab = (index, type) => {
    setToggleState(index);
    router.replace(`/my-account?tab=${type}`);
  };

  const switchComponent = (index) => {
    setToggleComponent(index);
  };
  const mobileTabs = (event) => {
    event.currentTarget.classList.toggle("mobile-tab");
  };

  const handleLogOut = async () => {
    const domain = localStorage?.getItem("domain");
    deleteCookie(ASM_TOKEN_KEY);
    deleteCookie(ASM_USER_EMAIL);
    const result = await getAuthToken(domain);
    setCookie(TOKEN_KEY, result?.token);
    dispatch(logoutUser());
    router.push("/account-login");
  };

  return (
    <>
      <div className="wishlist_page">
        <ul className="heading_menu bloc-tabs-heading">
          <li
            className={
              stepCheck(toggleComponent, 1) ? "tabs active-tabs" : "tabs"
            }
            // onClick={() => switchComponent(1)}
          >
            <FormattedMessage id="common.home" />
          </li>{" "}
          /
          <li
            className={
              stepCheck(toggleComponent, 2) ? "tabs active-tabs" : "tabs"
            }
            onClick={() => switchComponent(2)}
          >
            <FormattedMessage id="commom.account" />
          </li>
        </ul>
      </div>

      <h2 className="heading mb-0 text-center">
        <FormattedMessage id="account.title" />
      </h2>

      <div
        className={
          stepCheck(toggleComponent, 1)
            ? "container content  active-content"
            : "content"
        }
      ></div>

      <div
        className={
          stepCheck(toggleComponent, 2)
            ? "content  active-content py-0"
            : "content"
        }
      >
        <ul className="bloc-tabs" onClick={mobileTabs}>
          <li
            className={
              stepCheck(toggleState, 1)
                ? "tabs active-tabs mob_menu"
                : "tabs hide_tab"
            }
            onClick={() => toggleTab(1, "wishlist")}
          >
            <div>
              <span className="material-icons-outlined">favorite_border</span>

              <span className="">
                <FormattedMessage id="wishlist.title" />
              </span>
            </div>
          </li>
          <li
            className={
              stepCheck(toggleState, 2)
                ? "tabs active-tabs mob_menu"
                : "tabs hide_tab"
            }
            onClick={() => toggleTab(2, "order")}
          >
            <div>
              <span className="material-icons-outlined">list_alt</span>
              <span className="">
                <FormattedMessage id="common.order" />
              </span>
            </div>
          </li>
          <li
            className={
              stepCheck(toggleState, 3)
                ? "tabs active-tabs mob_menu"
                : "tabs hide_tab"
            }
            onClick={() => toggleTab(3, "address")}
          >
            <div>
              <span className="material-icons-outlined">home</span>
              <span className="">
                <FormattedMessage id="common.address" />
              </span>
            </div>
          </li>
          <li
            className={
              stepCheck(toggleState, 4)
                ? "tabs active-tabs mob_menu"
                : "tabs hide_tab"
            }
            onClick={() => toggleTab(4, "profile")}
          >
            <div>
              <span className="material-icons-outlined">settings</span>

              <span className=" ">
                <FormattedMessage id="common.profileSetting" />
              </span>
            </div>
          </li>
          <li
            className={
              stepCheck(toggleState, 5)
                ? "tabs active-tabs"
                : "tabs hide_tab disabled"
            }
            onClick={() => handleLogOut()}
            disabled
          >
            <div>
              <span className="material-icons-outlined">logout</span>
              <span className=" ">
                <FormattedMessage id="common.Logout" />
              </span>
            </div>
          </li>
          <label className="arrow-dwn-mob">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M8 10L12 14L16 10"
                stroke="#1D1F1E"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </label>
        </ul>
        <div className="content-tabs container">
          {stepCheck(wishlist.length, 0) ? (
            <div className="add_wishlist">
              <div className="explore-wishlist">
                <div className="text-center">
                  <h3>
                    <FormattedMessage id="subHeadTabs.startAddingWishlist" />
                  </h3>
                  <p>
                    <FormattedMessage id="subHeadTabs.savedPieces" />
                  </p>
                </div>
                <button>
                  <FormattedMessage id="subHeadTabs.exploreJewellery" />
                </button>
              </div>
            </div>
          ) : (
            <div
              className={
                stepCheck(toggleState, 1)
                  ? "content  active-content"
                  : "content"
              }
            >
              <p
                className="share-wishlist mt-0 cursorP semibold"
                onClick={() => setshareModal(true)}
              >
                <span className="material-icons-outlined">drafts</span>
                <FormattedMessage id="subHeadTabs.shareYouWishlist" />
              </p>
              <section className="follow-us-sec">
                <div className="thumbNail">
                  {products?.map((wishlistData, index) => {
                    const productData = wishlistData?.prodcuctData?.[0];
                    return (
                      <div className="wishlistData" key={`${index}`}>
                        <div className="wishlistwrapper">
                          <div className="wishlist_head align-items-center ">
                            {stepCheck(productData?.bestseller, 1) ? (
                              <p className="bestseller">
                                <FormattedMessage id="subHeadTabs.bestseller" />
                              </p>
                            ) : (
                              <div></div>
                            )}

                            <p className="favourite p-0">
                              <span className="material-icons-outlined">
                                favorite
                              </span>
                            </p>
                          </div>
                          <div className="img-slider-wrap">
                            <div className="img-full-w">
                              <img
                                src={
                                  productData.media?.length > 0
                                    ? productData.media?.[0]?.url
                                    : "/assets/images/product-card-listings.png"
                                }
                                alt={productData?.alt || productData?.label}
                              />
                              <div className="progress-bar">
                                <span className="fill-color"></span>
                              </div>
                            </div>
                            {/* <div className="imgs-thumbnail">
                              <a href="">
                                <img
                                  alt={<FormattedMessage id="alt.yellowGold" />}
                                  src="/assets/icons/raw-svgs/yellow-gold.svg"
                                />
                              </a>
                              <a href="">
                                <img
                                  alt={<FormattedMessage id="alt.yellowGold" />}
                                  src="/assets/icons/raw-svgs/yellow-gold.svg"
                                />
                              </a>
                              <a href="">
                                <img
                                  alt={<FormattedMessage id="alt.yellowGold" />}
                                  src="/assets/icons/raw-svgs/yellow-gold.svg"
                                />
                              </a>
                              <a href="">
                                <img
                                  alt={<FormattedMessage id="alt.yellowGold" />}
                                  src="/assets/icons/raw-svgs/yellow-gold.svg"
                                />
                              </a>
                            </div> */}
                          </div>
                        </div>
                        <div className="product_info">
                          <h5 className="m-0 p-0">{productData?.name}</h5>
                          <p className="p-0 m-0">
                            <span className="price-from">
                              <FormattedMessage id="dfProduct.from" />{" "}
                            </span>
                            {productData?.price}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}
          <div
            className={
              stepCheck(toggleState, 2) ? "content  active-content" : "content"
            }
          >
            <Order translateId={translateId} currency={currency} />
          </div>
          <div
            className={
              stepCheck(toggleState, 3) ? "content  active-content" : "content"
            }
          >
            <Address storeId={storeId} />
          </div>
          <div
            className={
              stepCheck(toggleState, 4) ? "content  active-content" : "content"
            }
          >
            {!getCookie(ASM_USER_EMAIL) && <ProfileSetting storeId={storeId} />}
          </div>
        </div>
      </div>
      <ShareWishListModal
        storeId={storeId}
        modalClose={closeShareModal}
        modalOpen={shareModal}
      />
    </>
  );
};

export default SubHeadTabs;
