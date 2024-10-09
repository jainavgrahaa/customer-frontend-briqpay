/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
import { LoadingButton } from "@mui/lab";
import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { Checkout } from "@/_utils/customApiData";
import CollectionDetails from "@/_components/common/df-checkout-components/collection-details";
import ContactInfo from "@/_components/common/df-checkout-components/contactInfo";
import Payment from "@/_components/common/df-checkout-components/payment";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { useDispatch, useSelector } from "react-redux";
import { domainSelection, getStoreDetails } from "@/_utils";
import { TOKEN_KEY } from "@/_utils/userToken";
import { getCookie } from "cookies-next";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Faq from "@/_components/common/Faq";
import { isEqual } from "lodash";
import { checkoutPurchaseFaqData } from "@/_utils/customApiData";
import { FormattedMessage } from "react-intl";
import { Button } from "@mui/material";
import DFTalkToExpert from "@/_components/common/DFTalkToExpert";

const DfCheckoutPage = ({ currency, translateId, storeId }) => {
  const [open, setOpen] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectOption, setSelectedOption] = useState("login");
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderSummary, setOrderSummary] = useState(null);
  const [storeData, setStoreData] = useState();
  const userToken = getCookie(TOKEN_KEY);
  const { userDetails } = useSelector((state) => state.auth);
  const { cartDetails: cartDetail } = useSelector((state) => state.cart);
  const [openProductDetail, setOpenProductDetail] = useState({
    isOpen: false,
    id: "",
  });
  const { getCartData, getOrderSummary } = useAuthHelper();

  const [cartData, setCartData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEqual(cartDetail, cartData)) {
      setCartData(cartDetail);
    }
  }, [cartDetail]);

  const fetchCartData = async () => {
    const hostname = window.location.host;
    const domain = domainSelection[hostname];
    const storeDetail = await getStoreDetails(domain);
    dispatch(storeDetails(storeDetail));

    const cartDetail = await getCartData(translateId);
    dispatch(cartDetails(cartDetail));
  };

  const removeProductFormCart = async (item) => {
    const resp = await removeProductFromCart({
      orderId: cartData.id,
      orderLineItemId: item.id,
    });
    if (resp) {
      fetchCartData();
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
    });
    setLoading(false);
  };

  const fetchOrderDetails = async () => {
    const orderDetail = await getCartData(storeData?.defaultTranslate);
    setOrderDetails(orderDetail);
    fetchOrderSummary(orderDetail?.objectId);
  };

  useEffect(() => {
    fetchStoreData();
  }, []);

  useEffect(() => {
    if (storeData?.defaultTranslate && !!userDetails?.firstname) {
      fetchOrderDetails();
    }
  }, [open, userDetails?.firstname, storeData?.defaultTranslate]);

  useEffect(() => {
    if (userDetails?.firstname && !userDetails?.isGuest) {
      setOpen(2);
    }
  }, [userDetails?.firstname]);

  if (loading) return null;

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/df-checkout-page.css" />
      </Head>
      <div className="container checkout-wrapper">
        <div className="row">
          <h1 className="checkout-heading">
            <FormattedMessage id="checkout.title" />
          </h1>
          <div className="col-lg-7 col-md-12">
            {userDetails?.isGuest ? (
              <Accordion className="checkout-accordian" defaultExpanded onClick={() => setOpen(1)}>
                <AccordionSummary
                  expandIcon={
                    <>
                      <span className="material-icons-outlined expand-more">
                        expand_more
                      </span>
                    </>
                  }
                  aria-controls="login-content"
                  id="login-header"
                >
                  <p className="checkout-steps-heading">
                    <FormattedMessage id="checkout.loginRegister" />
                  </p>
                </AccordionSummary>
                {open === 1 ? (
                  <AccordionDetails>
                    <ContactInfo
                      heading={<FormattedMessage id="checkout.contactInfo" />}
                      name={
                        userDetails?.firstname + " " + userDetails?.lastname
                      }
                      mail={userDetails?.email}
                      phone={userDetails?.telephone}
                      userToken={userToken}
                      setOpen={setOpen}
                      open={open}
                      storeId={storeId}
                      selectOption={selectOption}
                      setSelectedOption={setSelectedOption}
                    />
                  </AccordionDetails>
                ) : null}
              </Accordion>
            ) : (
              <Accordion className="checkout-accordian" open={false} disabled>
                <AccordionSummary
                  expandIcon={
                    <>
                      <span className="material-icons-outlined expand-more">
                        expand_more
                      </span>
                    </>
                  }
                  aria-controls="login-content"
                  id="login-header"
                >
                  <p className="checkout-steps-heading">
                    <FormattedMessage id="checkout.loginRegister" />
                  </p>
                </AccordionSummary>
              </Accordion>
            )}
            <Accordion
              className="checkout-accordian"
              disabled={
                !(userDetails && orderDetails && storeData && open !== 1)
              }
            >
              <AccordionSummary
                expandIcon={
                  <>
                    <span className="material-icons-outlined expand-more">
                      expand_more
                    </span>
                  </>
                }
                aria-controls="shipping-content"
                id="shipping-header"
              >
                <p className="checkout-steps-heading">
                  <FormattedMessage id="checkout.billingDeliveryAddress" />
                </p>
              </AccordionSummary>
              {userDetails && orderDetails && storeData && open !== 1 ? (
                <AccordionDetails>
                  <CollectionDetails
                    heading={<FormattedMessage id="checkout.billingAddress" />}
                    setOpen={setOpen}
                    open={open}
                    orderDetails={orderDetails}
                    storeData={storeData}
                    mail={userDetails?.email}
                    storeId={storeId}
                  />
                </AccordionDetails>
              ) : null}
            </Accordion>
            <Accordion
              className="checkout-accordian"
              disabled={
                !(userDetails && orderDetails && storeData && open !== 1)
              }
            >
              <AccordionSummary
                expandIcon={
                  <>
                    <span className="material-icons-outlined expand-more">
                      expand_more
                    </span>
                  </>
                }
                aria-controls="billing-content"
                id="billing-header"
              >
                <p className="checkout-steps-heading">
                  <FormattedMessage id="checkout.shippingPayment" />
                </p>
              </AccordionSummary>
              <AccordionDetails>
                {userDetails && orderDetails && storeData && open !== 2 ? (
                  <Payment
                    open={open}
                    orderDetails={orderDetails}
                    orderSummary={orderSummary}
                    storeId={storeId}
                  />
                ) : (
                  <FormattedMessage id="checkout.completeBillingDeliveryAddress" />
                )}
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="col-lg-5 col-md-12">
            <div className="order-summery-wrapper">
              <div className="order-summary-main">
                <h3 className="order-summary-heading text-center">
                  <FormattedMessage id="checkout.orderSummary" />
                </h3>
                <div className="row mt-4">
                  {cartData &&
                    cartData?.orderLineItems?.length > 0 &&
                    cartData?.orderLineItems?.map((item, i) => {
                      return (
                        <>
                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 col-3">
                            {Checkout.map((orderItem, index) => {
                              return (
                                <Fragment key={index}>
                                  <img key={index} src={orderItem.url} />
                                  <Button className="watchlist-btn">
                                    <span class="material-icons-outlined color-bistre-brown mr-5">
                                      favorite_border
                                    </span>{" "}
                                    Add to your wishlist
                                  </Button>
                                </Fragment>
                              );
                            })}
                          </div>
                          <div
                            key={i}
                            className="col-lg-8 col-md-8  col-sm-8 col-xs-8 col-8"
                          >
                            <h6 className="mb-4">{item?.product?.name}</h6>
                            <div className="d-flex justify-content-between">
                              <p className="mb-0">Product ID:</p>
                              <p className="mb-0">
                                <strong>{item?.product?.referenceId}</strong>
                              </p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p>Design Number:</p>
                              <p>
                                <strong>RN0034131</strong>
                              </p>
                            </div>

                            {openProductDetail.isOpen &&
                              openProductDetail?.id === item?.id && (
                                <>
                                  <div>
                                    <FormattedMessage id="checkout.noData" />
                                  </div>
                                </>
                              )}
                            <LoadingButton
                              type="submit"
                              variant="text"
                              className="underline"
                              style={{ textTransform: "none" }}
                              onClick={() =>
                                setOpenProductDetail({
                                  isOpen: !openProductDetail?.isOpen,
                                  id: item?.id,
                                })
                              }
                            >
                              <FormattedMessage id="dfList.ViewMore" />
                            </LoadingButton>
                            <p className="text-left f-12 mt-2 mb-4">
                              <FormattedMessage id="common.estimanteDelivery" />
                            </p>
                          </div>
                          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 col-1">
                            <span className="material-icons-outlined edit cursorP">
                              edit
                            </span>
                          </div>
                        </>
                      );
                    })}

                  <div className="col-lg-12 col-md-12  col-sm-12 col-xs-12">
                    <div className="d-flex justify-content-between align-items-center">
                      {orderSummary?.vat && (
                        <p className="mb-0">
                          <FormattedMessage id="checkout.ukVat" /> (20%)
                        </p>
                      )}
                      {/* <p className="mb-0">{$120}</p> */}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      {orderSummary?.Coupon && (
                        <p className="mb-0">
                          {" "}
                          <FormattedMessage id="common.coupon" /> (SPRING10)
                        </p>
                      )}
                      <p className="mb-0">
                        <strong>{orderSummary?.Coupon}</strong>
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0">
                        <FormattedMessage id="checkout.grandTotal" />
                      </p>
                      <p className="mb-0">
                        <strong>{orderSummary?.["Total"]}</strong>
                      </p>
                    </div>
                  </div>

                  {/* <div className="col-lg-5 col-md-5  col-sm-5 col-xs-5 right desktop-view">
                    {Checkout.map((orderItem) => {
                      return (
                        <div key={orderItem.label} className="amt-wrapper">
                          <span className="red-text">
                            <s>{orderItem.mrpAmount}</s>
                          </span>
                          <span className="bold-text">
                            {orderItem.discountedPrice}
                          </span>
                        </div>
                      );
                    })}
                  </div> */}
                  {/* <div className="mobile-view col-lg-4 col-md-4  col-sm-4 col-xs-4 right">
                    {Checkout.map((orderItem) => {
                      return (
                        <Fragment key={orderItem.label}>
                          <p className="bold-text">{orderItem.label}</p>
                          <span className="red-text">
                            <s>{orderItem.mrpAmount}</s>
                          </span>
                          <span className="bold-text">
                            {orderItem.discountedPrice}
                          </span>
                          <p className="secondery-bold">{orderItem.couponName}</p>
                        </Fragment>
                      );
                    })}
                  </div> */}
                </div>
                {/* <div className="delivery-box-wrapper">
                  <div className="row">
                    <div className="col-lg-8 col-md-8 left">
                      <p className="desc">Insured delivery</p>
                      <p className="desc">Sub-Total</p>
                      {orderSummary?.vat && <p className="desc">UK VAT (20%)</p>}
                  
                    </div>
                    <div className="col-lg-4 col-md-4 right delivery-values">
                      {Checkout.map((orderItem) => {
                        return (
                          <Fragment key={orderItem.diliveryType}>
                            <p className="desc">
                              {orderSummary?.["Insured delivery"]}
                            </p>
                            <p className="desc">{orderSummary?.["Sub-Total"]}</p>
                            {orderSummary?.["vat"] && (
                              <p className="desc">{orderSummary?.["vat"]}</p>
                            )}
                           
                          </Fragment>
                        );
                      })}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-lg-8 col-md-8 left">
                      <p className="desc total">Total</p>
                    </div>
                    <div className="col-lg-4 col-md-4 right">
                      <p className="desc total">{orderSummary?.["Total"]}</p>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="delivery-collection-info mt-5">
                <h3 className="text-center">
                  <FormattedMessage id="checkout.deliveryCollectionInfo" />
                </h3>
                <p className="mb-5">
                  <FormattedMessage id="checkout.freeDeliveryInfo" /> <br />{" "}
                  <FormattedMessage id="checkout.freeDeliveryInfo2" />{" "}
                  <strong>
                    {" "}
                    <FormattedMessage id="checkout.freeDeliveryInfo3" />.
                  </strong>{" "}
                  <br />
                  <strong>
                    <FormattedMessage id="checkout.freeDeliveryInfo4" />?
                  </strong>{" "}
                  <FormattedMessage id="checkout.freeDeliveryInfo5" /> 020 7138
                  3672
                </p>
              </div>
              <div className="delivery-collection-info mb-4">
                <h3 className="text-center">
                  <FormattedMessage id="needAssistance.assistance" />
                </h3>
                <p>
                  {" "}
                  <strong className="underline">
                    <FormattedMessage id="common.chatNow" />
                  </strong>{" "}
                  <FormattedMessage id="common.or" />{" "}
                  <FormattedMessage id="common.call" />{" "}
                  <a href="tel:0808 250 2394" className="underline">
                    <strong>0808 250 2394</strong>
                  </a>{" "}
                </p>
              </div>
              <div className="col-lg-12 purchase-confidence mb-4 pt-5">
                <h3 className="order-summary-heading text-center">
                  <FormattedMessage id="checkout.purchaseConfidence" />
                </h3>
                <Faq data={checkoutPurchaseFaqData[0].subfaq} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DFTalkToExpert />
    </>
  );
};

export default DfCheckoutPage;
