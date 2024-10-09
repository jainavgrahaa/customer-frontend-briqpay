/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { React, useState, useEffect, useCallback } from "react";
import { Button, Box } from "@mui/material";

import OrderSummary from "@/_components/common/OrderSummary";
import ShippingInfo from "@/_components/common/ShippingInfo";
import CustomAccordion from "@/_components/common/CustomAccordion";

import {
  cartAccordionData,
  ShippingInformationData,
} from "@/_utils/customApiData";

import ProductThumb from "@/_components/common/ProductThumb";

import useAuthHelper from "@/_hooks/useAuthHelper";
import { useDispatch, useSelector } from "react-redux";
import { cartDetails } from "@/_store/cart.slice";
import CircularLoader from "../../common/loader/circular-loader";
import { getApiUrl, mergeCartDataClient } from "@/_utils";
import { EmptyCart } from "./empty-cart";
import { THModalInsurance } from "./th-insurance-modal";
import Modal from "@/_components/modal";
import { JewelleryCareModal } from "./jewellery-care-modal";
import { TheftAndCareModal } from "./theft-damage-care";
import apiService from "@/_utils/apiService";
import { FormattedMessage } from "react-intl";
import ProductCard from "@/_components/common/ProductCard";
import Image from "next/image";

const Cart = ({ translateId, currency, storeObjectId }) => {
  const [isCustomerModal, setIsCustomerModal] = useState(false);
  const [isRemoveProductModal, setsisRemoveProductModal] = useState(false);
  const [isInsuranceRemoveModal, setIsInsuranceRemoveModal] = useState(false);
  const [isInsuranceInfoModal, setIsInsuranceInfoModal] = useState(false);
  const [isJewelleryPlanModal, setIsJewelleryPlanModal] = useState(false);
  const [showStickySummary, setShowStickySummary] = useState(false);
  const [confrimModalData, setConfrimModalData] = useState(null);
  const [isChooseFilter, setChooseFilterData] = useState(false);
  const [addJwellaryCareData, setAddJwellaryCareData] = useState([]);
  const [addPlanData, setPlanData] = useState({});
  const [productPlan, setProductPlan] = useState();
  const [accept, setAccept] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const { getCartData, removeProductFromCart, getCartService, getOrderSummary, getCartAddons } =
    useAuthHelper();
  const dispatch = useDispatch();
  const { cartDetails: cartDetail } = useSelector((state) => state.cart);
  const { userDetails } = useSelector((state) => state.auth);
  const [value, setValue] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderSummaryData, setOrderSummaryData] = useState(null);
  const [addonData, setAddonDataData] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = useCallback(() => {
    if (window.pageYOffset > 680) {
      setShowStickySummary(true);
    } else {
      setShowStickySummary(false);
    }
  }, []);

  const handleCloseModal = () => {
    setIsCustomerModal(false);
    setsisRemoveProductModal(false);
    setIsInsuranceRemoveModal(false);
    setIsJewelleryPlanModal(false);
    setIsInsuranceInfoModal(false);
  };

  const onActionAddClick = async () => {
    setIsInsuranceRemoveModal(false);
    setIsJewelleryPlanModal(false);
    setIsInsuranceInfoModal(false);
    const {
      value,
      orderLineItemId: groupedOrderLineItemId,
      index,
    } = addPlanData;
    const body = {
      items: {
        group: {
          serviceIds: [value],
          groupedOrderLineItemId,
        },
      },
    };
    const apiUrl = getApiUrl(`/order/item/add`);
    try {
      const dataApi = await apiService().post(apiUrl, body);

      if (dataApi) {
        setAddJwellaryCareData([
          ...addJwellaryCareData,
          { groupedOrderLineItemId, value, index },
        ]);
        fetchCartData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onAddonAddClick = async (id) => {
    const body = {
      items: {
        group: {
          addOnIds: [id],
        },
      },
    };
    const apiUrl = getApiUrl(`/order/item/add`);
    try {
      const dataApi = await apiService().post(apiUrl, body);

      if (dataApi) {
        fetchCartData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
      fetchOrderSummary(cartDetail?.objectId)
      if (userDetails?.storeId) {
        const addonData = await getCartAddons(userDetails?.storeId, translateId)
        setAddonDataData(addonData)
      }
      dispatch(cartDetails({ ...cartDetail, orderLineItems: tempdata }));
    }
  };

  const emptyCart = !(cartDetail?.orderLineItems?.length > 0);

  const removeProductFormCart = async () => {
    setLoading(true);
    const resp = await removeProductFromCart({
      orderId: cartDetail.id,
      orderLineItemId: confrimModalData?.id,
    });
    if (resp) {
      fetchCartData();
      handleCloseModal();
    }
    setLoading(false);
  };

  const fetchOrderSummary = async (objectId) => {
    const summary = await getOrderSummary(objectId);
    setOrderSummaryData(summary)
  };

  useEffect(() => {
    fetchCartData()
  }, [userDetails?.storeId])

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/cart.css" />
      </Head>

      {!cartDetail?.orderLineItems && (
        <Box display="flex">
          <CircularLoader />
        </Box>
      )}
      {loading && (
        <Box display="flex">
          <CircularLoader />
        </Box>
      )}
      {!emptyCart && cartDetail?.orderLineItems !== undefined && (
        <>
          <div className="cart-page">
            <div className="container">
              <div className="action-with-icon mt-5">
                <Link href="/">
                  <span className="icons-small material-icons-outlined">
                    chevron_left
                  </span>
                  Continue Shopping
                </Link>
              </div>
              <div className="cart-shopping-bag">
                <div className="cart-shopping-title text-center mb-5">
                  <h1><FormattedMessage id="dfCart.shoppingBag" /></h1>
                </div>
                <div className="cart-shopping-content row">
                  <div className="col-lg-7 col-md-12 cart-shopping-content-left">
                    <ul className="products-thumb-list">
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
                            <li>
                              <ProductCard item={item} isChooseFilter={isChooseFilter} currency={currency} dataToShow={dataToShow} canRemove={true} canWishlist={true} setIsInsuranceRemoveModal={setIsInsuranceRemoveModal}
                                setConfrimModalData={setConfrimModalData} />
                              {item?.groupedLineItem?.map((item1, index) => {
                                return (
                                  <>
                                    <ProductThumb
                                      imgUrl={
                                        item1?.product.name
                                          .split("-")
                                          .at(0)
                                          .trim() !== "Jewellery Care Plan"
                                          ? "/assets/images/austen-and-blake/cart/march.png"
                                          : "/assets/images/austen-and-blake/cart/care.png"
                                      }
                                      orderLineItemId={item.id}
                                      price={item1?.orderLineItemPrice?.amount}
                                      item={item}
                                      item1={item1}
                                      description={item1?.product.name}
                                      currency={currency}
                                      actionClose={false}
                                      actionAdd={false}
                                      onActionAddClick={onActionAddClick}
                                      setIsJewelleryPlanModal={
                                        setIsJewelleryPlanModal
                                      }
                                      setConfrimModalData={setConfrimModalData}
                                      onImgClick={() => {
                                        setIsCustomerModal(true);
                                        setConfrimModalData(item1);
                                      }}
                                      onActionCloseClick={() => {
                                        setIsInsuranceRemoveModal(true);
                                        setAddJwellaryCareData({});
                                      }}
                                      index={index}
                                      setPlanData={setPlanData}
                                    />
                                  </>
                                );
                              })}
                              {item?.extraService?.map((item1, index) => {
                                return (
                                  <>
                                    <ProductThumb
                                      imgUrl={
                                        item1?.label !== "Jewellery Care Plan"
                                          ? "/assets/images/austen-and-blake/cart/march.png"
                                          : "/assets/images/austen-and-blake/cart/care.png"
                                      }
                                      title={item1.label}
                                      orderLineItemId={item.id}
                                      price={item1?.value?.map(
                                        (data) => data?.price
                                      )}
                                      value={value}
                                      setValue={setValue}
                                      item={item}
                                      item1={item1}
                                      setPlan={setPlan}
                                      setProductPlan={setProductPlan}
                                      setConfrimModalData={setConfrimModalData}
                                      productPlan={productPlan}
                                      setSelectedPlan={setSelectedPlan}
                                      selectDropdown={item1}
                                      selectedPlan={selectedPlan}
                                      modalPrice={
                                        selectedPlan &&
                                          accept &&
                                          plan.trim() === item1.label.trim()
                                          ? selectedPlan?.[item?.id]
                                            ?.split("-")
                                            .at(-1)
                                          : ""
                                      }
                                      description={
                                        selectedPlan &&
                                          accept &&
                                          plan.trim() === item1.label.trim()
                                          ? selectedPlan
                                          : ""
                                      }
                                      onImgClick={() => {
                                        setIsCustomerModal(true);
                                        setConfrimModalData(item1);
                                      }}
                                      onActionCloseClick={() => {
                                        setIsInsuranceRemoveModal(true);
                                        setAddJwellaryCareData({});
                                      }}
                                      currency={currency}
                                      actionClose={false}
                                      actionAdd={false}
                                      onActionAddClick={onActionAddClick}
                                      setIsJewelleryPlanModal={
                                        setIsJewelleryPlanModal
                                      }
                                      index={index}
                                      setPlanData={setPlanData}
                                    />
                                  </>
                                );
                              })}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <div className="col-lg-5 col-md-12 cart-shopping-content-right">
                    <OrderSummary
                      currency={currency}
                      translateId={translateId}
                      orderSummaryData={orderSummaryData}
                    />
                    <ShippingInfo
                      variant="cart"
                      ShippingData={ShippingInformationData}
                    />
                    <CustomAccordion
                      accordionData={cartAccordionData}
                      grid={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", left: "0", width: "100%" }}>
            {showStickySummary && (
              <div
                className={`sticky-order-summary-cart ${isCustomerModal ||
                  isInsuranceInfoModal ||
                  isJewelleryPlanModal ||
                  isRemoveProductModal
                  ? "hide"
                  : ""
                  }`}
              >
                <div className="sticky-innser-summary">
                  <div className="order-total">
                    <p><FormattedMessage id="product.total" /></p>
                    <p>
                      {currency}
                      {cartDetail?.orderPrice?.amount ?? 0}
                    </p>
                  </div>
                  <Button
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    className="checkout-btn dark-blue-btn"
                    size="large"
                    href={"/checkout"}
                  >
                    <FormattedMessage id="cart.proccedToCheckout" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          {
            addonData && addonData?.map((item) => {
              const addonTitle = item?.addonTranslates?.find(e => e.translateId === translateId)?.name || ""
              return (
                <div className="container">
                  <div className="row product-thumb row-lg">
                    <div className={"col-5 thumb-img"}>
                      <Image width={100} height={100} src={"/assets/images/default-img.jpg"} />
                    </div>
                    <div className="col-7 detailed-product-desc">
                      <div className="basic-product-details">
                        <div className="product-desc">
                          <h4>{addonTitle}</h4>
                          {item?.sellingPrice && (
                            <span className="thumb-price">
                              {currency} {item?.sellingPrice}
                            </span>
                          )}
                        </div>
                        <div className="">
                          <Button
                            onClick={() => onAddonAddClick(item?.id)}
                            variant="outlined"
                            sx={{ mt: 3, mb: 2, justifyContent: 'center' }}
                            className="dark-blue-btn"
                            size="large"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </>
      )}
      {emptyCart && cartDetail?.orderLineItems && <EmptyCart />}

      <THModalInsurance
        isCustomerModal={isCustomerModal}
        setIsCustomerModal={setIsCustomerModal}
        handleCloseModal={handleCloseModal}
        setIsInsuranceInfoModal={setIsInsuranceInfoModal}
        setAccept={setAccept}
      />
      <JewelleryCareModal
        handleCloseModal={handleCloseModal}
        isJewelleryPlanModal={isJewelleryPlanModal}
        onActionAddClick={onActionAddClick}
        setAccept={setAccept}
      />
      <TheftAndCareModal
        currency={currency}
        productPlan={productPlan}
        handleCloseModal={handleCloseModal}
        isInsuranceInfoModal={isInsuranceInfoModal}
        onActionAddClick={onActionAddClick}
        setAccept={setAccept}
      />
      <Modal
        onClose={() => {
          handleCloseModal();
        }}
        onOk={() => {
          handleCloseModal();
        }}
        isOpen={isRemoveProductModal}
        title="Are you sure you want to remove Sabrina (£723)? "
        okText="Confirm"
        className="confirm-modal"
      ></Modal>
      <Modal
        onClose={handleCloseModal}
        onOk={() => removeProductFormCart()}
        isOpen={isInsuranceRemoveModal}
        title={`Are you sure you want to remove ${confrimModalData?.product?.name || confrimModalData?.label
          } (${currency} ${confrimModalData?.orderLineItemPrice?.amount || confrimModalData?.modalPrice || 0})`}
        okText="Confirm"
        onSubmit={() => {
          setProductPlan({});
          setSelectedPlan("");
          handleCloseModal();
          removeProductFormCart();
          setValue("");
        }}
        className="confirm-modal"
      ></Modal>
    </>
  );
};

export default Cart;
