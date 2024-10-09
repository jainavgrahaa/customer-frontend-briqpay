/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
import { Fragment, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Checkout } from "@/_utils/customApiData";
import CollectionDetails from "@/_components/common/checkout-components/collection-details";
import ContactInfo from "@/_components/common/checkout-components/contactInfo";
import Payment from "@/_components/common/checkout-components/payment";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { isEqual } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { domainSelection, getStoreDetails } from "@/_utils";
import { ASM_TOKEN_KEY, TOKEN_KEY } from "@/_utils/userToken";
import { getCookie } from "cookies-next";
import { cartDetails } from "@/_store/cart.slice";
import { FormattedMessage } from "react-intl";
import OrderSummary from "../common/OrderSummary";

const CheckoutPage = ({ currency, translateId, storeId, deviceTypeServer }) => {
  const paymentRef = useRef();
  const isAsmUser = getCookie(ASM_TOKEN_KEY);
  const [open, setOpen] = useState(isAsmUser ? 2 : 1);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderSummary, setOrderSummary] = useState(null);
  const [storeData, setStoreData] = useState();
  const userToken = getCookie(TOKEN_KEY);
  const { userDetails } = useSelector((state) => state.auth);
  const { cartDetails: cartDetail, storeDetails: storeDetail } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (userDetails && orderDetails && storeData && open !== 1) {
      // Scroll to the Payment section
      paymentRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open]);

  const { getCartData, getOrderSummary } = useAuthHelper();

  const [cartData, setCartData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEqual(cartDetail, cartData)) {
      setCartData(cartDetail);
    }
  }, [cartDetail]);

  const fetchCartData = async () => {
    const cartDetail = await getCartData(translateId);
    if (cartDetail) {
      const serviceData = await Promise.all(
        cartDetail?.orderLineItems?.map(
          async (item) =>
            await getCartService(storeObjectId, item.id, translateId)
        )
      );
      const tempdata = mergeCartDataClient(
        cartDetail?.orderLineItems,
        serviceData
      );
      fetchOrderSummary(cartDetail?.objectId)
      dispatch(cartDetails({ ...cartDetail, orderLineItems: tempdata }));
    }
  };

  const fetchOrderSummary = async (objectId) => {
    const summary = await getOrderSummary(objectId);
    setOrderSummary(summary);
  };

  const fetchStoreData = async () => {
    const hostname = window.location.host;
    const domain = domainSelection[hostname];
    const details = await getStoreDetails(domain);
    setStoreData({
      objectId: details?.objectId,
      allowDifferentAddress: details?.allowDifferentShippingAndBillingAddress,
      defaultCountry: details?.defaultCountry,
      defaultTranslate: details?.defaultTranslate,
      v12RetailerGUID: details?.v12RetailerGUID,
      v12RetailerId: details?.v12RetailerId,
    });
    setLoading(false);
  };

  const fetchOrderDetails = async () => {
    const orderDetail = await getCartData(storeData?.defaultTranslate);
    setOrderDetails(orderDetail);
    fetchOrderSummary(orderDetail?.objectId);
    dispatch(cartDetails({ ...orderDetail }));
  };

  useEffect(() => {
    fetchStoreData();
  }, []);

  useEffect(() => {
    if (storeData?.defaultTranslate) {
      fetchOrderDetails();
    }
  }, [open, userDetails?.firstname, storeData?.defaultTranslate]);

  useEffect(() => {
    if (userDetails?.firstname) {
      setOpen(2);
    }
  }, [userDetails?.firstname]);

  if (loading) return null;

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/checkout-page.css" />
      </Head>
      <div className="container checkout-wrapper">
        <div className="row">
          <h1 className="checkout-heading"> <FormattedMessage id="checkout.title" /></h1>
          <div className="col-lg-7 col-md-12" ref={paymentRef}>
            {
              isAsmUser ? null :
                <ContactInfo
                  heading={<FormattedMessage id="checkout.contactInfo" />}
                  name={userDetails?.firstname + " " + userDetails?.lastname}
                  mail={userDetails?.email}
                  phone={userDetails?.phoneNumber}
                  userToken={userToken}
                  setOpen={setOpen}
                  open={open}
                  storeId={storeId}
                />
            }
            {
              isAsmUser ? <div className="checkout-child-wrapper">
                <h3 className={orderDetails && storeData && open !== 1 ? "" : "mb-0 opacity-25"}> <FormattedMessage id="checkout.deliveryDetails" /></h3>
                {orderDetails && storeData && open !== 1 ? (
                  <CollectionDetails
                    heading={<FormattedMessage id="checkout.deliveryDetails" />}
                    setOpen={setOpen}
                    open={open}
                    orderDetails={orderDetails}
                    storeData={storeData}
                    mail={userDetails?.email}
                    deviceTypeServer={deviceTypeServer}
                    storeId={storeId}
                  />
                ) : null}
              </div> : <div className="checkout-child-wrapper">
                <h3 className={orderDetails && storeData && open !== 1 ? "" : "mb-0 opacity-25"}> <FormattedMessage id="checkout.deliveryDetails" /></h3>
                {orderDetails && storeData && open !== 1 ? (
                  <CollectionDetails
                    heading={<FormattedMessage id="checkout.deliveryDetails" />}
                    setOpen={setOpen}
                    open={open}
                    orderDetails={orderDetails}
                    storeData={storeData}
                    mail={userDetails?.email}
                    deviceTypeServer={deviceTypeServer}
                    storeId={storeId}
                  />
                ) : null}
              </div>
            }
            {orderDetails && storeData && open !== 1 && open !== 2 ? (
              <Payment
                open={open}
                orderDetails={orderDetails}
                storeData={storeData}
                orderSummary={orderSummary}
                storeId={storeId}
                currency={currency}
              />
            ) : (
              <div className="checkout-child-wrapper">
                <h3 style={{ color: "black", marginBottom: 0, opacity: 0.2 }}><FormattedMessage id="checkout.payment" /></h3>
              </div>
            )}
          </div>
          <div className="col-lg-5 col-md-12">
            <div className="order-summery-wrapper">
              <h3><FormattedMessage id="checkout.orderSummary" /></h3>
              {cartData &&
                cartData?.orderLineItems?.length > 0 &&
                cartData?.orderLineItems?.map((item, i) => {
                  return (
                    <div className="row mt-2" key={i}>
                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 left ">
                        <img src={"/assets/images/rings-thumb.png"} />
                      </div>
                      <div className="col-lg-4 col-md-4  col-sm-4 col-xs-4 right desktop-view">
                        <p className="bold-text">{item?.product?.name}</p>
                        {/* 10% off coupon applied  */}
                        {item?.product?.coupon && (
                          <p className="secondery-bold">
                            {item?.product?.coupon} <FormattedMessage id="checkout.couponApplied" />{" "}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-5 col-md-5  col-sm-5 col-xs-5 right desktop-view">
                        <div className="amt-wrapper">
                          {item?.orderLineItemPrice?.discount > 0 ? (
                            <span className="red-text">
                              <s>
                                {currency}
                                {item?.orderLineItemPrice?.discount ?? 0}
                              </s>
                            </span>
                          ) : null}
                          <span className="bold-text">
                            {currency} {item?.orderLineItemPrice?.amount ?? 0}
                          </span>
                        </div>
                      </div>
                      <div className="mobile-view col-lg-4 col-md-4  col-sm-4 col-xs-4 right">
                        <p className="bold-text">{item?.product?.name}</p>
                        {item?.orderLineItemPrice?.discount > 0 ? (
                          <span className="red-text">
                            <s>
                              {currency}
                              {item?.orderLineItemPrice?.discount ?? 0}
                            </s>
                          </span>
                        ) : null}
                        <span className="bold-text">
                          {currency} {item?.orderLineItemPrice?.amount ?? 0}
                        </span>
                        {item?.product?.coupon && (
                          <p className="secondery-bold">
                            {item?.product?.coupon} <FormattedMessage id="checkout.couponApplied" />{" "}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}

              <div className="delivery-box-wrapper p-0">
                {
                  orderSummary &&
                  <OrderSummary
                    currency={currency}
                    translateId={translateId}
                    orderSummaryData={orderSummary}
                    isCheckout
                  />
                }
              </div>
              <div className="question-sec-wrapper">
                <p className="question-heading"><FormattedMessage id="common.questionHelp" />.</p>
                <div className="row mail-number">
                  <div className="col-lg-7 col-md-12">
                    <a
                      href="mailto:service@austenblake.com?subject=Questions? We can help"
                      className="mail"
                    >
                      service@austenblake.com
                    </a>
                  </div>
                  <div
                    className="col-lg-5 col-md-12"
                    style={{ border: "none" }}
                  >
                    <p className="mail" style={{ cursor: "pointer" }}>
                      <a href="tel:020 7660 1529">020 7660 1529</a>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-d-12 text-with-icon">
                    <div>
                      <img src="/assets/images/icons/guard-icon.png" />
                    </div>
                    <div>
                      <p className="mainText capital">
                        <FormattedMessage id="checkout.secureInsuredInfo" />
                      </p>
                      <p className="mainText">
                        <FormattedMessage id="checkout.recieveYourOrderInfo" />.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-d-12 text-with-icon">
                    <div>
                      <img src="/assets/images/icons/resize-icon.png" />
                    </div>
                    <div>
                      <p className="mainText capital">
                        <FormattedMessage id="checkout.freeReturns" />
                      </p>
                      <p className="mainText">
                        <FormattedMessage id="checkout.getYourPieceInfo" />.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-d-12 text-with-icon">
                    <div>
                      <img src="/assets/images/icons/squre-icon.png" />
                    </div>
                    <div>
                      <p className="mainText capital"><FormattedMessage id="checkout.disecretPackage" /></p>
                      <p className="mainText"><FormattedMessage id="checkout.toKeepYourGift" />.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
