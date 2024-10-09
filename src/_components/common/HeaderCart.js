/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import OrderSummary from "./OrderSummary";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { useDispatch, useSelector } from "react-redux";
import { cartDetails } from "@/_store/cart.slice";
import Loader from "./loader";

const HeaderCart = ({
  visibility,
  hideHeader,
  translateId,
  currency,
  domain,
  menuShrinked,
}) => {
  const ref = useRef();
  const { getCartData, removeProductFromCart } = useAuthHelper();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { cartDetails: cartDetail } = useSelector((state) => state.cart);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        hideHeader();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hideHeader]);

  const fetchCartData = async () => {
    const cartDetail = await getCartData(translateId);
    dispatch(cartDetails(cartDetail));
    setLoader(false);
  };

  const removeProductFormCart = async (item) => {
    setLoader(true);
    const resp = await removeProductFromCart({
      orderId: cartDetail.id,
      orderLineItemId: item.id,
    });
    if (resp) {
      fetchCartData();
    } else {
      setLoader(false);
    }
  };

  if (!visibility) {
    return "";
  }

  return (
    <div
      className={`header-cart header-cart-modal-bg ${menuShrinked? "header-stick":null}`}
      onClick={() => hideHeader()}
      ref={ref}
    >
      <div className="cart-wrapper">
        <div
          className="header-cart-container"
          onClick={(e) => e.stopPropagation()}
        >
          {loader && <Loader domain={domain} />}
          {cartDetail && cartDetail?.orderLineItems?.length > 0 ? (
            <>
              {/* <span
                onClick={() => hideHeader()}
                className="material-icons-outlined icons-small content-close"
              >
                close
              </span> */}
              <ul className="products-thumb-list">
                {cartDetail?.orderLineItems?.map((item) => {
                  return (
                    <li>
                      <div className="row product-thumb">
                        <div className="col-4 thumb-img thumb-img-lg">
                          <img src="/assets/images/cart-thumb-img-01.png" />
                          <div className="action-with-icon add-to-wishlist">
                            <Link href="#">
                              <svg>
                                <use
                                  href={`/assets/icons/icons.svg#favorite-icon-grey`}
                                />
                              </svg>
                              <p>Add to Wishlist</p>
                            </Link>
                          </div>
                        </div>
                        <div className="col-8 detailed-product-desc">
                          <div className="basic-product-details">
                            <div className="product-desc">
                              <h4 className="thumb-clear">
                                {item?.product?.name}
                              </h4>
                              <div className="thumb-price">
                                {item?.orderLineItemPrice?.price -
                                  item?.orderLineItemPrice?.amount >
                                  0 && (
                                  <span className="old-price">
                                    {currency}
                                    {item?.orderLineItemPrice?.price}
                                  </span>
                                )}
                                <span className="discounted-price">
                                  {currency}
                                  {item?.orderLineItemPrice?.amount ?? 0}
                                </span>
                              </div>
                              <div className="discount-message">
                                <Link href="#">
                                  {item?.orderLineItemPrice?.priceInfos
                                    ?.filter((item) => item.name === "Coupon")
                                    ?.map((item) => {
                                      return (
                                        <span>
                                          {
                                            item?.priceInfoPropertyValues?.filter(
                                              (item) =>
                                                item.name === "Display Name"
                                            )?.[0]?.value
                                          }
                                        </span>
                                      );
                                    })}
                                </Link>
                              </div>
                            </div>

                            <div className="thumb-action-close">
                              <p
                                className="cursorP"
                                onClick={() => removeProductFormCart(item)}
                              >
                                <span className="material-icons-outlined icons-small">
                                  close
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}

                {/* <li>
            <div className="row product-thumb">
              <div className="col-4 thumb-img-lg thumb-img">
                <img src="/assets/images/cart-page-thumb-lg.png" />
              </div>
              <div className="col-8 more-product-details">
                <div className="product-desc">
                  <h4>Diamond Earrings</h4>
                  <Link className="discount-message" href="#">
                    <span className="material-icons-outlined icons-small">
                      <span className="material-symbols-outlined">
                        redeem
                      </span>
                    </span>
                    <span>Purchase more than $1,000</span>
                  </Link>
                </div>
                <div className="thumb-price thumb-price-col">
                  <p>Free</p>
                </div>
              </div>
            </div>
          </li> */}
              </ul>
              <OrderSummary
                headerCart={true}
                currency={currency}
                translateId={translateId}
              />
            </>
          ) : (
            <>
              <span
                onClick={() => hideHeader()}
                className="material-icons-outlined icons-small empty-close"
              >
                close
              </span>
              <div className="empty-cart">
                <h2 className="title">Your shopping bag is empty </h2>
                <span className="empty-content">
                  You currently there are no products in your shopping bag.
                  Browse to find your perfect jewellery!
                </span>
                {/* <Link href="#" className="empty-btn">
                  Continue Shopping
                </Link> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderCart;
