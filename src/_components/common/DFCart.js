/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
import React, { useContext, useEffect, useState } from "react";
import BreadCrumbs from "@/_components/common/breadcrumbs";
import Head from "next/head";
import Link from "next/link";
import { DfCartItemDetails } from "@/_utils/customApiData";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { LoginContext } from "@/_utils/loginCotext";
import { useDispatch, useSelector } from "react-redux";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { mergeCartDataClient } from "@/_utils";
import { cartDetails } from "@/_store/cart.slice";
import Modal from "../modal";
import { LoadingButton } from "@mui/lab";
import { Purchase } from "./googleMap/constant";
import { FormattedMessage } from "react-intl";
import DFTalkToExpert from "@/_components/common/DFTalkToExpert"
import Chip from "@mui/material/Chip";
import { useIntl } from 'react-intl';

function DFCart({ translateId, currency, storeObjectId }) {
  const [pageName] = useState("Cart");
  const [expanded, setExpanded] = useState(false);
  const [confrimModalData, setConfrimModalData] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [couponDetails, setCouponDetails] = useState({});
  const [promotionDetails, setPromotionDetails] = useState([]);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProductRemoveConfirmation, setIsProductRemoveConfirmation] =
    useState(false);
  const { cartDetails: cartDetail } = useSelector((state) => state.cart);
  const { userDetails } = useSelector((state) => state.auth);
  const intl = useIntl();
  const {
    getCartData,
    removeProductFromCart,
    getCartService,
    applyCoupon,
    removeCoupon,
  } = useAuthHelper();
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState([]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const orderDetailList = [
      { title: "Insured delivery", price: "Free" },
      {
        title: "Total with taxes",
        price: cartDetail?.orderPrice?.subtotal ?? 0,
      },
      { title: "UK VAT (20%)", price: cartDetail?.orderPrice?.tax ?? 0 },
    ];
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
      orderDetailList.push({
        title: `Coupon (${couponToShow?.[0]?.value})`,
        price: `-${discountDetail?.[0]?.amount}`,
      });
    }
    orderDetailList.push({
      title: "Grand Total",
      price: cartDetail?.orderPrice?.amount ?? 0,
    });
    setOrderDetails(orderDetailList);
  }, [cartDetail]);

  const handleCloseModal = () => {
    setIsProductRemoveConfirmation(false);
    setConfrimModalData(null);
  };

  const removeProductFormCart = async () => {
    const resp = await removeProductFromCart({
      orderId: cartDetail.id,
      orderLineItemId: confrimModalData.id,
    });
    if (resp) {
      fetchCartData();
      handleCloseModal();
    }
  };

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
      dispatch(cartDetails({ ...cartDetail, orderLineItems: tempdata }));
    }
  };

  const imgPath = [
    "/assets/images/diamond-factory/cart/master-card.png",
    "/assets/images/diamond-factory/cart/master-card-2.png",
    "/assets/images/diamond-factory/cart/visa.png",
    "/assets/images/diamond-factory/cart/paypal.png",
    "/assets/images/diamond-factory/cart/retail-finance.png",
  ];
  const { openLoginModal } = useContext(LoginContext);


  const [model, setModel] = useState(false);
  const [thModal, setThmodal] = useState(false);
  const [jewellaryModal, setJewellaryModal] = useState(false);
  const [whiteGoldmodal, setWhiteGoldModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpen = () => setModel(true);
  const handleClose = () => setModel(false);

  const handleTHOpen = () => setThmodal(true);
  const handleTHClose = () => setThmodal(false);

  const handleJewellaryOpen = () => setJewellaryModal(true);
  const handleJewellaryClose = () => setJewellaryModal(false);

  const handleWhiteGoldOpen = () => setWhiteGoldModal(true);
  const handleWhiteGoldClose = () => setWhiteGoldModal(false);

  const handleCloseThModal = () => {
    handleTHClose();
    handleJewellaryClose();
    handleWhiteGoldClose();
  };

  const addRemoveCoupon = async () => {
    let resp = null;

    if (coupon && coupon?.length > 0) {
      if (couponApplied) {
        setIsLoading(true);
        resp = await removeCoupon(cartDetail.objectId, coupon);
        if (resp) {
          setErrorMessage(resp?.message);
        }
        setIsLoading(false);
      } else {
        setIsLoading(true);
        resp = await applyCoupon(cartDetail.objectId, coupon);
        if (resp) {
          setErrorMessage(resp?.message);
        }
        setIsLoading(false);
      }
      if (resp) {
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
        }
      }
    } else {
      setErrorMessage("Please enter a coupon code!");
    }
  };

  const handleSelectTermChange = (event) => {
    if (event && event?.target?.value) {
      const selectedValue = event?.target?.value;
      if (selectedValue) {
        handleTHOpen();
      }
    }
  };

  const handleChangeSelectedjewellaryChange = (event) => {
    if (event && event?.target?.value) {
      const selectedValue = event?.target?.value;
      if (selectedValue) {
        handleJewellaryOpen();
      }
    }
  };

  const handleClickAcceptInformation = () => {
    //here open second modal code
    handleWhiteGoldOpen();
  };

  useEffect(() => {
    fetchCartData()
  }, [userDetails?.storeId])

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/df-cart.css" />
      </Head>
      <div className="df-cart-wrap">
        <BreadCrumbs currentPage={pageName} />
        <div className="container">
          <div className="df-cart-content-wrap">
            <div className="cart-left-block">
              <div className="cart-header-content">
                <h2><FormattedMessage id="dfCart.shoppingBag" /></h2>
                {userDetails?.isGuest && (
                  <p className="mb-30">
                    <Link onClick={() => openLoginModal()} href={"#"}>
                      <FormattedMessage id="dfCart.signIn" />
                    </Link> {" "}
                    or
                    {" "}
                    <Link href="/account-login"><FormattedMessage id="dfCart.CreateAccount" /></Link>
                    {" "}
                    <FormattedMessage id="dfCart.toSaveItems" />
                  </p>
                )}
                <div className="price-block d-flex align-items-center">
                  <h4 className="final-price mb-0">
                    <FormattedMessage id="dfCart.Total" />{currency} {cartDetail?.orderPrice?.amount}
                  </h4>
                  <p className="p-price">
                    {currency} {cartDetail?.orderPrice?.tax}{" "}
                    <span>(vat.incl.)</span>
                  </p>
                  {cartDetail?.orderPrice?.discount > 0 && (
                    <Chip label={
                      <>
                        <FormattedMessage id="dfCart.youSave" /> {currency} {cartDetail?.orderPrice?.discount}
                      </>
                    } className="df-badge-1" />
                  )}
                </div>
              </div>
              {cartDetail &&
                cartDetail?.orderLineItems?.length > 0 &&
                cartDetail?.orderLineItems?.map((item) => {
                  const discountDetail =
                    item?.orderLineItemPrice?.priceInfos?.filter(
                      (item) => item.name === "Coupon"
                    );
                  const dataToShow =
                    discountDetail?.[0]?.priceInfoPropertyValues?.filter(
                      (item) => item?.name === "Coupon Id"
                    );
                  return (
                    <>
                      <div className="row mt-30 cart-items-wrap m-0 pb-30">
                        <div className="col-xl-4 col-lg-4 col-sm-12">
                        <div className="cart-item-img">
                          <img
                            className="cart-img"
                            src={`assets/images/${DfCartItemDetails[0]?.ProductImng}`}
                            alt="Product Image"
                          />
                          <span
                            onClick={handleOpen}
                            class="material-symbols-outlined card-remove-text f-12 d-flex align-items-center justify-content-center cursorP mt-2"
                          >
                            <span class="mr-5 f-18">&times;</span> <FormattedMessage id="common.remove" />
                          </span>
                        </div>
                        </div>
                        <div className="col-xl-8 col-lg-8 col-sm-12">
                        <div className="cart-item-content">
                          <div className="cart-item-header d-grid-2-1">
                            <h4 className="product-name">
                              {item?.product?.name || "White Gold Oval Halo Diamond Engagement Ring"}
                            </h4>
                            <h4 className="cart-price-value">
                              {currency} {item?.orderLineItemPrice?.price ?? 0}
                            </h4>
                            {/* <div className="modal-close-btn cursorP">
                              <p
                                onClick={() => {
                                  setIsProductRemoveConfirmation(true);
                                  setConfrimModalData(item);
                                }}
                              >
                                <span className="icons-small material-icons-outlined">
                                  close
                                </span>
                              </p>
                            </div> */}
                          </div>
                          <div className="cart-items-inner">
                            <ul>
                              {item?.productData?.[0]?.variantOption?.[0]?.componentsList?.map(
                                (item1) => {
                                  return (
                                    <li className="f-16 d-flex gap-5 align-items-center">
                                      {
                                        item1?.componentProperty
                                          ?.componentPropertyTranslates?.[0]?.name
                                      }{" "}
                                      <span className="span-values semi-bold">
                                        {
                                          item1?.componentPropertyValues
                                            ?.componentPropertyValueTranslates?.[0]
                                            ?.value
                                        }
                                      </span>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                          <div className="text-right">
                          <Button variant="text"><span class="material-icons-outlined">edit</span></Button>
                          </div>
                          <p className="delivery-info mt-15 semi-bold f-14">
                            <FormattedMessage id="dfCart.estimateddelivery" />2-3 <FormattedMessage id="dfCart.workingWeeks" />.
                          </p>
                        </div>
                        </div>
                      </div>
                      {item?.groupedLineItem?.map((item1) => {
                        return (
                          <div className="jewellary-insurance">
                            <h6 className="mb-0">
                              {`${item1?.product?.name}:`}
                            </h6>
                          </div>
                        );
                      })}
                      {item?.extraService?.map((item1) => {
                        return (
                          <div className="jewellary-insurance">
                            <h6 className="mb-0">
                              {`Add ${item1?.product?.name}:`}
                            </h6>
                            <select className="jewellary-select">
                              {item1.values.map(({ value, label }, index) => {
                                return (
                                  <option value={value} key={index}>
                                    {label}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        );
                      })}
                    </>
                  );
                })}
              <div className="jewellary-insurance">
                <h6 className="mb-0">
                  <FormattedMessage id="dfCart.jewelleryInsurance" />
                </h6>
                <select
                  className="jewellary-select"
                  onChange={handleSelectTermChange}
                >
                  <option value=""> <FormattedMessage id="common.selectTerm" /></option>
                  <option value="one"> 1 <FormattedMessage id="common.year" /> - £13.69</option>
                  <option value="two">3 <FormattedMessage id="common.year" /> - £24.98</option>
                </select>
              </div>
              <div className="jewellary-insurance">
                <h6 className="mb-0"><FormattedMessage id="dfCart.jewellaryCar" /></h6>
                <select
                  className="jewellary-select"
                  onChange={handleChangeSelectedjewellaryChange}
                >
                  <option><FormattedMessage id="common.selectTerm" /></option>
                  <option>1 <FormattedMessage id="common.year" /> - £99</option>
                  <option>2 <FormattedMessage id="common.year" /> - £180</option>
                  <option>3 <FormattedMessage id="common.year" /> - £250</option>
                </select>
              </div>

              <div className="recommanded-accessories">
                <div className="recommanded-heading">
                  <h4 className="recommanded-title"><FormattedMessage id="dfCart.recommendedAccessories" /></h4>
                  <p className="recommanded-description">
                    <FormattedMessage id="dfCart.recommendedDescription" />
                  </p>
                </div>
              </div>
              <div className="jewellary-recommand">
                <img
                  className="jewellary-cloth-image"
                  src="/assets/images/diamond-factory/cart/6_max-2.png"
                  alt="jewellary-cloth-image"
                />
                <p className="jewellary-title"><FormattedMessage id="dfCart.jewelleryCloth" /></p>
                <h4>£18</h4>
                <Button className="jewellary-button" variant="contained"><FormattedMessage id="common.add" /></Button>
              </div>
              <div className="jewellary-recommand">
                <img
                  className="jewellary-cloth-image"
                  src="/assets/images/diamond-factory/cart/6_max-3.png"
                  alt="jewellary-cloth-image"
                />
                <p className="jewellary-title"><FormattedMessage id="dfCart.jewelleryCloth" /></p>
                <h4>£18</h4>
                <Button className="jewellary-button" variant="contained"><FormattedMessage id="common.add" /></Button>
              </div>
              <div className="coupon-or-gifts">
                <p className="coupon-gift-heading semi-bold"><FormattedMessage id="dfCart.couponGift" /></p>
                <div className="coupon-wrapper mb-15">
                  <input
                    className="btn1"
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter Coupon Code"
                  />
                  <Button variant="contained" onClick={addRemoveCoupon}>{couponApplied ? "Remove" : "Apply"}</Button>
                </div>
                {errorMessage &&
                <Typography pt={0} mb={errorMessage ? 2 : 1} color="error">
                  {errorMessage}
                </Typography>
                }
                <div className="coupon-wrapper mb-30">
                  <input className="btn1" placeholder={intl.formatMessage({ id: 'dfCart.giftCertificate' })} />
                  <Button variant="contained"><FormattedMessage id="common.apply" /></Button>
                </div>
              </div>
              <Button className="place-order-btn" variant="contained" fullWidth><FormattedMessage id="common.placeOrder" /></Button>
            </div>
            <div className="cart-right-block">
              <div className="text-center order-summary-block">
                <h2 className="summary-title"><FormattedMessage id="common.orderSummary" /></h2>
                <div className="order-details">
                  <div className="detail-data mt-30 mb-30">
                    {orderDetails?.map((item,index) => {
                        return (
                          <p className="d-flex justify-content-between mb-1 f-14" key={index}>
                            <span>{item.title}</span>
                            <span className="semi-bold">{currency} {item.price}</span>
                          </p>
                        );
                      })}
                  </div>
                  <Button className="place-order-btn mb-30" variant="contained" fullWidth>
                    <FormattedMessage id="common.placeOrder" />
                  </Button>
                  <div className="detail-data">
                    <div className="content-title-box">
                      {promotionDetails.map((item) => {
                        return <div className="content-title-text">{item}</div>;
                      })}
                    </div>
                  </div>
                  <div className="payment-group">
                    {imgPath.map((item, i) => (
                      <img key={i} src={item} alt="" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="delivery-and-collection-info">
                <div className="text-center">
                  <h3 className="mb-4"><FormattedMessage id="dfCart.collectionInfo" /></h3>
                  <div className="text-center">
                    <p className="stack-frame-text mb-0">
                      <FormattedMessage id="dfCart.stackFrametext" />
                    </p>
                    <div className="stack-titles mt-30 mb-30">
                      <h3 className="mb-4"><FormattedMessage id="dfCart.needAssistance" /></h3>
                      <p className="stack-descriptions semi-bold">
                        <a href="#live-chat" className="underline"><FormattedMessage id="dfCart.chartCall" /></a>
                        {" "}
                        <FormattedMessage id="common.ortext" />
                        {" "}
                        <FormattedMessage id="common.calltext" />
                        {" "}
                        <a href="tel:0808 250 2394" className="underline">0808 250 2394</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="purchase-with-confidence">
                <div className="purchase-stack">
                  <div className="purchase-heading-wrapper">
                    <h3 className="text-center"><FormattedMessage id="dfCart.purchaseConfidence" /></h3>
                  </div>
                  <div className="purches-descriptions">
                    <div className="accordion-wrapper">
                      {Purchase.map((items, index) => {
                        return (
                          <>
                            <Accordion
                              // expanded={expanded === `panel-${items.id}`}
                              onChange={handleChange(`panel-${items.id}`)}
                              key={`${index}-faqList`}
                            >
                              <AccordionSummary
                                expandIcon={
                                  <>
                                    <span className="material-icons-outlined plus-icon">
                                      add
                                    </span>
                                    <span className="material-icons-outlined minus-icon">
                                      remove
                                    </span>
                                  </>
                                }
                                aria-controls={`panel-${items.id}bh-content`}
                                id={`panel-${items.id}bh-header`}
                              >
                                <h6 className="mb-0">{items.title}</h6>
                              </AccordionSummary>
                              <AccordionDetails>
                                <p className="mb-0">{items.content}</p>
                              </AccordionDetails>
                            </Accordion>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          onClose={handleCloseModal}
          onSubmit={() => removeProductFormCart()}
          onOk={() => handleCloseModal()}
          isOpen={isProductRemoveConfirmation}
          title={`Are you sure you want to remove ${confrimModalData?.product?.name
            } (${currency} ${confrimModalData?.orderLineItemPrice?.amount ?? 0})`}
          okText="Confirm"
          className="confirm-modal"
          isDF
        ></Modal>
        <DFTalkToExpert />
        <Modal
          isOpen={model}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          isDF
          className="confirm-modal"
        >
          <div className="m-auto" style={{maxWidth: "720px"}}>
          <p className="text-center">Are you sure you want to remove {`Are you sure you want to remove ${confrimModalData?.product?.name
            } (${currency} ${confrimModalData?.orderLineItemPrice?.amount ?? 0})`}</p>
          <div className="d-grid-2">
             <Button variant="contained" onClick={handleClose}>Cancel</Button>
             <Button variant="outlined" onClick={removeProductFormCart}>Confirm</Button>
          </div>
          </div>
        </Modal>
        <Modal
          isOpen={jewellaryModal}
          onClose={handleJewellaryClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="jewellary-modal">
            <h6>
              <FormattedMessage id="dfCart.jewelleryCare" />
            </h6>
            <div className="jewellary-content">
              <p>
                <FormattedMessage id="dfCart.insuranceOptionaltext" />
              </p>
              <ul>
                <li><FormattedMessage id="dfCart.retipping" /></li>
                <li>
                  <FormattedMessage id="dfCart.rhodium" />
                </li>
                <li><FormattedMessage id="dfCart.chainbracelet" /></li>
                <li>
                  <FormattedMessage id="dfCart.resettingtext" />
                </li>
                <li><FormattedMessage id="dfCart.cleaningInspection" /></li>
                <li><FormattedMessage id="dfCart.replacementbacks" /></li>
                <li><FormattedMessage id="dfCart.soldering" /></li>
                <li>
                  <FormattedMessage id="dfCart.claspReplacement" />
                </li>
                <li>
                  <FormattedMessage id="dfCart.ringSizingsUp" />
                </li>
              </ul>
              <p>
                <FormattedMessage id="dfCart.forMoreInfo" />
              </p>
              <p>
                {" "}
                <FormattedMessage id="dfCart.importantjewelleryInfo" />
                <a href="#" className="jewelley-model-link">
                  <FormattedMessage id="common.clickHereInfo" />
                </a>
              </p>
            </div>
            <div className="jewellary-modal-buttons">
              <button
                className="jewellary-modal-btn"
                onClick={handleCloseThModal}
              >
                &lt; <FormattedMessage id="common.backToProduct" />
              </button>
              <button className="jewellary-modal-btn">
                <FormattedMessage id="common.acceptInformation" /> &gt;
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={thModal}
          onClose={handleTHClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="th-modal-parent"
        >
          <div className="th-modal-container">
            <h2 className="text-center mb-30">
              <FormattedMessage id="dfCart.THMarchCustomer" />
            </h2>
            <div className="th-modal-wrapper">
              <div className="th-modal-text">
                <p>
                  <FormattedMessage id="dfCart.insuranceOptional" />
                </p>
                <p>
                  <FormattedMessage id="dfCart.insuranceAdministeredTH" />
                </p>
                <p>
                  <FormattedMessage id="dfCart.checkedFinancial" />
                </p>
                <p>
                  <FormattedMessage id="dfCart.unlikelyEvent" />
                </p>
                <p>
                  <FormattedMessage id="dfCart.certificatedetails" />
                </p>
                <a
                  href="/assets/document/diamond-factory/th_march_insurance.pdf"
                  download="th_march_insurance"
                  className="f-16 underline"
                >
                  <FormattedMessage id="dfCart.clickHereInsurance" />
                </a>
              </div>
              <div className="th-modal-buttons mt-30">
                <Button className="th-modal-btn" onClick={handleCloseThModal} variant="contained" fullWidth>
                  {" "}
                  &lt; <FormattedMessage id="common.backToProduct" />
                </Button>
                <Button
                  className="th-modal-btn"
                  onClick={handleClickAcceptInformation}
                  variant="contained" fullWidth
                >
                  <FormattedMessage id="common.acceptInformation" /> &gt;
                </Button>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={whiteGoldmodal}
          onClose={handleWhiteGoldClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="th-modal-parent th-modal-parent-2 th-insuramce-modal"
        >
          <div className="modal-full-width-img mt-30">
          <img
            className="white-gold-banner-img"
            src="/assets/images/popupbanner1.png"
            alt="banner"
          />
          </div>
          <div className="white-gold-modal">
            <h3 className="mt-30 mb-30 text-center">
              <FormattedMessage id="dfCart.addTheft" /> £185.63
            </h3>
            <div className="row">
            <div className="col-xl-4 col-lg-4 col-sm-12">
              <img
                className="w-100"
                src="/assets/images/white-gold-ring.png"
                alt=""
              />
              </div>
              <div className="col-xl-8 col-lg-8 col-sm-12">
              <div className="white-gold-ring-info">
                <h4 className="white-gold-ring-heading">
                  <FormattedMessage id="dfCart.whiteGoldOval" />
                </h4>
                <div className="d-flex align-items-center gap-10">
                  <h4 className="mb-0"><FormattedMessage id="dfCart.Total" /> £2,704 </h4>
                  <div className="d-flex align-items-center gap-10">
                    <p className="f-18 mb-0" style={{color: "#858586"}}>
                      <span className="discount-price">£236 </span>
                      <span className="discount-price-rrp f-12"><FormattedMessage id="common.RRP" /> </span>
                    </p>
                    <Chip label={
                      <>
                        <FormattedMessage id="dfCart.youSave" /> £86
                      </>
                    } className="df-badge-1" />
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div className="white-gold-descriptions mt-30">
              <div className="white-gold-informations">
                <p>
                  <FormattedMessage id="dfCart.ourUkCustomertext" />
                </p>
                <p className="ul-heading mb-0"><FormattedMessage id="dfCart.mainPolicy" /></p>
                <ul>
                  <li className="f-16"><FormattedMessage id="dfCart.noExcessClaims" /></li>
                  <li className="f-16"><FormattedMessage id="dfCart.simpleArrange" /></li>
                  <li className="f-16"><FormattedMessage id="dfCart.accidentalDamage" /></li>
                  <li className="f-16"><FormattedMessage id="dfCart.theftCover" /></li>
                  <li className="f-16"><FormattedMessage id="dfCart.worldwideCover" /></li>
                  <li className="f-16"><FormattedMessage id="dfCart.accidentalLoss" /></li>
                  <li className="f-16">
                    <FormattedMessage id="dfCart.allClaims" />
                  </li>
                  <li className="f-16">
                    <FormattedMessage id="dfCart.yearPolicies" />
                  </li>
                </ul>
                <p><FormattedMessage id="dfCart.subjectToterms" /></p>
                <a
                  href="/assets/document/diamond-factory/th_march_insurance_1.pdf"
                  download={"th_march_insurance_1"}
                  className="color-bistre-brown underline f-16 mb-15 d-block"
                >
                  <FormattedMessage id="dfCart.clickHereInsurance" />
                </a>
                <a
                  href="/assets/document/diamond-factory/full_policy_wording.pdf"
                  download="full_policy_wording"
                  className="color-bistre-brown underline f-16 mb-15 d-block"
                >
                  <FormattedMessage id="dfCart.clickHeredownload" />
                </a>
                <p className="ul-heading mb-0"><FormattedMessage id="common.pleaseBeAware" /></p>
                <ul>
                  <li className="f-16"><FormattedMessage id="dfCart.UKresidentsonly" /></li>
                  <li className="f-16"><FormattedMessage id="dfCart.noCoverwear" /></li>
                  <li className="f-16">
                    <FormattedMessage id="dfCart.noCoverItem" />
                  </li>
                  <li className="f-16"><FormattedMessage id="dfCart.noCover" /></li>
                  <li className="f-16">
                    <FormattedMessage id="dfCart.coolingOff" />
                  </li>
                  <li className="f-16">
                    <FormattedMessage id="dfCart.initialterm" />
                  </li>
                  <li className="f-16">
                    <FormattedMessage id="dfCart.itsnotpossible" />
                  </li>
                  <li className="f-16">
                    <FormattedMessage id="dfCart.policywording" />
                  </li>
                </ul>
                <p>
                  <FormattedMessage id="dfCart.importantNotice" />
                </p>
              </div>
              <div className="white-gold-buttons">
                <Button className="white-gold-btn" variant="contained" fullWidth onClick={handleCloseThModal}>
                  {" "}
                  &lt; <FormattedMessage id="common.backToProduct" />
                </Button>
                <Button className="white-gold-btn" variant="contained" fullWidth>
                  {" "}
                  <FormattedMessage id="dfCart.addone" />  &gt;
                </Button>
                <Button className="white-gold-btn" variant="contained" fullWidth>
                  {" "}
                  <FormattedMessage id="dfCart.addthree" /> &gt;
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default DFCart;
