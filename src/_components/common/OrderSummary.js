/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { React, useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { useDispatch, useSelector } from "react-redux";
import { cartDetails } from "@/_store/cart.slice";
import { LoadingButton } from "@mui/lab";
import { storeTypes } from "@/_utils";
import Modal from "@/_components/modal";
import { FormattedMessage } from "react-intl";
import { ASM_USER_EMAIL } from "@/_utils/userToken";
import { getCookie } from "cookies-next";

const OrderSummary = ({ headerCart, currency, translateId, orderSummaryData, isCheckout = false }) => {
  const dispatch = useDispatch();
  const { cartDetails: cartDetail } = useSelector((state) => state.cart);
  const { user, userDetails } = useSelector((state) => state.auth);
  const isAsmUser = Boolean(user?.actor || userDetails?.isAsmUser) || getCookie(ASM_USER_EMAIL);

  // const [coupon, setCoupon] = useState('RING15OFF')
  const [coupon, setCoupon] = useState("");
  const [isAvailableCoupon, setIsAvailableCoupon] = useState(false);
  const [couponDetails, setCouponDetails] = useState({});
  const [promotionDetails, setPromotionDetails] = useState([]);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [couponApplied, setCouponApplied] = useState(false);
  const { applyCoupon, removeCoupon, getCartData, getAvailableCoupons } = useAuthHelper();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showCartSummary, setshowCartSummary] = useState(true);
  useEffect(() => {
    function handleResize() {
      if (!headerCart) {
        setshowCartSummary(window.innerWidth > 992);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const promotionDetail = cartDetail?.orderPrice?.priceInfos?.filter(
      (item) => item.name === "Promotion"
    );
    if (promotionDetail?.length > 0) {
      const promotionList = [];
      promotionDetail?.map((item) => {
        const promotionName = item?.priceInfoPropertyValues?.filter(
          (item) => item?.name === "Display Name"
        );
        promotionList.push(promotionName?.[0]?.value);
      });
      setPromotionDetails(promotionList);
    } else {
      setPromotionDetails([]);
    }

    const discountDetail = cartDetail?.orderPrice?.priceInfos?.filter(
      (item) => item.name === "Coupon"
    );
    const couponToShow = discountDetail?.[0]?.priceInfoPropertyValues?.filter(
      (item) => item?.name === "Coupon Id"
    );

    if (couponToShow?.length > 0) {
      setCouponDetails({
        coupon: couponToShow?.[0]?.value,
        amount: discountDetail?.[0]?.amount,
      });
      setCoupon(couponToShow?.[0]?.value);
      setCouponApplied(true);
    }
  }, [cartDetail]);

  const addRemoveCoupon = async (code = "") => {
    let resp = null;
    const couponCode = code === "" ? coupon : code;
    
    if (couponApplied) {
      setLoading(true);
      resp = await removeCoupon(cartDetail.objectId, couponCode);
      setErrorMessage("");
      setLoading(false);
    } else {
      setLoading(true);

      resp = await applyCoupon(cartDetail.objectId, couponCode);
      if (resp && resp?.response?.data?.error?.message) {
        setErrorMessage(resp?.response?.data?.error?.message);
      } else {
        if (
          resp?.order?.orderPrice?.coupon === "0.000" ||
          resp?.order?.orderPrice?.coupon === 0.0
        ) {
          setErrorMessage(resp?.message || resp?.error?.message);
        } else {
          setErrorMessage("");
        }
      }
      setLoading(false);
    }
    if (resp) {
      setLoading(true);

      const cartData = await getCartData(translateId);
      if (cartData) {
        dispatch(cartDetails(cartData));
        const discountDetail = cartData?.orderPrice?.priceInfos?.filter(
          (item) => item.name === "Coupon"
        );
        const couponToShow =
          discountDetail?.[0]?.priceInfoPropertyValues?.filter(
            (item) => item?.name === "Coupon Id"
          );

        if (couponToShow?.length > 0) {
          setCouponDetails({
            coupon: couponToShow?.[0]?.value,
            amount: discountDetail?.[0]?.amount,
          });
          setCoupon(couponToShow?.[0]?.value);
          setCouponApplied(true);
        } else {
          setCouponDetails({});
          setCoupon("");
          setCouponApplied(false);
        }
        setLoading(false);
      }
      setLoading(false);
    }
  };

  const imgPath = [
    "/assets/images/diamond-factory/cart/master-card.png",
    "/assets/images/diamond-factory/cart/american-ex.png",
    "/assets/images/diamond-factory/cart/visa.png",
    "/assets/images/diamond-factory/cart/paypal.png",
    "/assets/images/diamond-factory/cart/retail-finance.png",
  ];

  const handleCouponModalOpen = () => {
    setIsAvailableCoupon(true)
  }

  const handleCouponModalClose = () => {
    setIsAvailableCoupon(false)
  }

  const fetchAvailableCoupons = async () => {
    const availableCouponsData = await getAvailableCoupons();
    setAvailableCoupons(availableCouponsData)
  }

  useEffect(() => {
    fetchAvailableCoupons()
  }, [])

  return (
    <div className="order-summary">
      {!headerCart && !isCheckout && (
        <div className="order-summary-title">
          <h4><FormattedMessage id="checkout.orderSummary" /></h4>
        </div>
      )}
      {!headerCart && (
        <div className="drag-order-summary-btn">
          <Link href="#">
            {!showCartSummary && (
              <span
                className="material-icons-outlined icons-small show-summary"
                onClick={() => setshowCartSummary(!showCartSummary)}
              >
                keyboard_arrow_up
              </span>
            )}
            {showCartSummary && (
              <span
                className="material-icons-outlined icons-small hide-summary"
                onClick={() => setshowCartSummary(!showCartSummary)}
              >
                keyboard_arrow_down
              </span>
            )}
          </Link>
        </div>
      )}
      <div className="order-summary-content">
        {showCartSummary && (
          <div className="hidden-order-summary">
            <ul className="order-summary-details">
              <li>
                <p style={{ color: "black", fontWeight: 600 }}>
                  <FormattedMessage id="checkout.InsDelivery" />
                </p>
                {cartDetail?.orderPrice?.shipping > 0 ? (
                  <p style={{ color: "black", fontWeight: 600 }}>
                    {currency} {Number(cartDetail?.orderPrice?.shipping ?? 0)?.toFixed(2)}
                  </p>
                ) : (
                  <p style={{ color: "black", fontWeight: 600 }}>Free</p>
                )}
              </li>
              <li>
                <p style={{ color: "black", fontWeight: 600 }}>Sub-Total</p>
                <p style={{ color: "black", fontWeight: 600 }}>
                  {currency} {Number(cartDetail?.orderPrice?.subtotal ?? 0)?.toFixed(2) ?? 0}
                </p>
              </li>
              <li>
                <p style={{ color: "black", fontWeight: 600 }}><FormattedMessage id="checkout.ukVat" /> (20%)</p>
                <p style={{ color: "black", fontWeight: 600 }}>
                  {currency} {Number(cartDetail?.orderPrice?.tax ?? 0)?.toFixed(2) ?? 0}
                </p>
              </li>
              {/* {orderSummaryData?.promotions?.length > 0 && (
                <>
                  <li>
                    <p style={{ color: "black", fontWeight: 600 }}>
                      <FormattedMessage id="orderSummery.promotionApplied" /> :
                    </p>
                    <p style={{ color: "black", fontWeight: 600 }}>
                      -{currency} {cartDetail?.orderPrice?.discount ?? 0}
                    </p>
                  </li>
                  <ul>
                    {orderSummaryData?.promotions.map((item) => {
                      return (
                        <li key={item?.displayName}>
                          <p style={{ color: "black", fontWeight: 600 }}>
                            {item?.displayName}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )} */}
              {orderSummaryData?.promotions?.length > 0 && orderSummaryData?.promotions?.map((item, i) =>
                <li key={item?.displayName + i}>
                  <p
                    style={{ color: "black", fontWeight: 600 }}
                  ><FormattedMessage id="orderSummery.promotionApplied" />: <br />{item.displayName}</p>
                  <p style={{ color: "black", fontWeight: 600 }}>
                    -{item?.amount ?? 0}
                  </p>
                </li>
              )}
              {orderSummaryData?.coupons?.length > 0 && orderSummaryData?.coupons?.map((item, i) =>
                <li key={item?.amount + i}>
                  <p
                    style={{ color: "black", fontWeight: 600 }}
                  >{`Coupon applied: ${item.displayName ?? " - "}`}</p>
                  <p style={{ color: "black", fontWeight: 600 }}>
                    -{item?.amount ?? 0}
                  </p>
                </li>
              )}
            </ul>
          </div>
        )}
        {isAsmUser && (
          <>
            <div className="order-total mb-2">
              <p style={{ color: "black", fontWeight: 600 }}>Amount Paid</p>
              <p style={{ color: "black", fontWeight: 600 }}>
                {currency} {Number(cartDetail?.orderPrice?.previousPaidAmount ?? 0)?.toFixed(2) ?? 0}
              </p>
            </div>
            <div className="order-total mb-2">
              <p style={{ color: "black", fontWeight: 600 }}>Amount Pending</p>
              <p style={{ color: "black", fontWeight: 600 }}>
                {currency} {(Number(cartDetail?.orderPrice?.amount ?? 0) - Number(cartDetail?.orderPrice?.previousPaidAmount ?? 0))?.toFixed(2) ?? 0}
              </p>
            </div>
          </>
        )}
        <div className="order-total">
          <p style={{ color: "black", fontWeight: 600, fontSize: 16 }}>Total</p>
          <p style={{ color: "black", fontWeight: 600, fontSize: 16 }}>
            {currency} {Number(cartDetail?.orderPrice?.amount ?? 0)?.toFixed(2) ?? 0}
          </p>
        </div>
        {!headerCart && showCartSummary && !isCheckout && (
          <>
            <div className="apply-coupon" style={{ marginBottom: "40px" }}>
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter Coupon Code"
                readOnly={couponApplied}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <LoadingButton
                  variant="outlined"
                  sx={{
                    mt: 3,
                    mb: 0,
                    border: 1,
                  }}
                  size="large"
                  loading={isLoading}
                  onClick={() => addRemoveCoupon("")}
                >
                  {couponApplied ? "Remove" : "Apply"}
                </LoadingButton>
              </div>
            </div>
            <div>
              <Typography color="red" sx={{ mb: 2 }}>
                {errorMessage && errorMessage}
              </Typography>
            </div>
            {isAsmUser && (
              <div>
                <Button variant="text" onClick={handleCouponModalOpen}>
                  View Available Coupons
                </Button>
                <Modal
                  isOpen={isAvailableCoupon}
                  onClose={handleCouponModalClose}
                  onSubmit={handleCouponModalClose}
                  title={"Available Coupons"}
                  className="sm-modal"
                >
                  <div className="col-md-12">
                    {
                      availableCoupons?.map((coupon) => (
                        <div key={coupon} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                          <div>{coupon?.coupon?.name}</div>
                          <LoadingButton
                            variant="outlined"
                            sx={{
                              mb: 0,
                              border: 1,
                            }}
                            size="large"
                            loading={isLoading}
                            onClick={() => addRemoveCoupon(coupon?.coupon?.code)}
                          >
                            {couponApplied ? "Remove" : "Apply"}
                          </LoadingButton>
                        </div>
                      ))
                    }
                  </div>
                </Modal>
              </div>
            )}
            <>
              {promotionDetails?.length > 0 && (
                <div className="hidden-order-summary">
                  {/* <h4 className="thumb-clear">Applied Promotion List</h4> */}
                </div>
              )}
            </>
          </>
        )}
        <div className="order-summary-actions">
          {headerCart && (
            <Button
              href={window.location.pathname.includes("/cart") ? "" : "/cart"}
              variant="outlined"
              className="view-cart-btn"
              sx={{ mt: 3, mb: 2 }}
              size="large"
            >
              <FormattedMessage id="common.viewCart" />
            </Button>
          )}
          {
            !isCheckout &&
            <Button
              href={"/checkout"}
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                color: "#fff !important",
              }}
            >
              <FormattedMessage id="cart.checkout" />
            </Button>
          }
        </div>
        {!headerCart && !isCheckout ? (
          <div className="payment-group">
            {imgPath.map((item, i) => (
              <img key={i} src={item} width={60} alt="card-image" />
            ))}
          </div>
        ) : null}
        {/* {!headerCart && (
          <ul className="payment-options">
            <li>
              <Link href="#">
                <img src="/assets/images/applePay.png" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <img src="/assets/images/applePay.png" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <img src="/assets/images/applePay.png" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <img src="/assets/images/applePay.png" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <img src="/assets/images/applePay.png" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <img src="/assets/images/applePay.png" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <img src="/assets/images/applePay.png" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <img src="/assets/images/applePay.png" />
              </Link>
            </li>
          </ul>
        )} */}
      </div>
    </div>
  );
};

export default OrderSummary;
