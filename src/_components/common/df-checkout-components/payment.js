import { useRef, useEffect, useState } from "react";
import "@adyen/adyen-web/dist/adyen.css";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { createAdyenCheckoutWithConfiguration } from "./paymentHelper";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { FormattedMessage } from "react-intl";
import PaymentDetails from "../PaymentDetails";
import { ASM_TOKEN_KEY } from "@/_utils/userToken";
import { getCookie } from "cookies-next";
import InputField from "@/_components/atoms/InputField";

const Payment = ({ open, orderDetails, orderSummary, storeId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { getPaymentMethods, getPaymentDetails, submitOrder } = useAuthHelper();
  const [paymentMethods, setAllPaymentMethods] = useState([]);
  const [paymentType, setPaymentType] = useState([]);
  const [pId, setPId] = useState();
  const [isAdyenMethod, setIsAdyenMethod] = useState(true);
  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const dropinContainer = useRef();
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAsmUser = getCookie(ASM_TOKEN_KEY);
  const orderId = orderDetails?.id;
  const fetchPaymentMethods = async () => {
    const objectId = orderDetails?.objectId;
    const paymentDetails = await getPaymentDetails(objectId);
    const paymentId = paymentDetails?.data?.[0]?.id;
    setPId(paymentId);
    try {
      const response = await getPaymentMethods({
        orderId: orderId,
        paymentId: paymentId,
        storeId: storeId,
      });
      if (Object.keys(response?.data?.Adyen).length) {
        const cardConfiguration = {
          showPayButton: true,
          autoFocus: true,
        };
        const checkout = await createAdyenCheckoutWithConfiguration(
          response,
          router,
          orderId,
          paymentId,
          dispatch,
          storeId
        );
        if (typeof window !== "undefined") {
          if (window.innerWidth < 992) {
            checkout.create("dropin")?.mount(dropinContainer.current);
          } else {
            setAllPaymentMethods(response?.storePaymentMethods);
            const type = response?.storePaymentMethods[0]?.type;
            setPaymentType(type);
            checkout
              .create(type, cardConfiguration)
              ?.mount(dropinContainer.current);
            setCheckoutDetails(checkout);
          }
        }
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open === 3 && orderDetails?.orderType?.name !== "Internal Order") {
      fetchPaymentMethods();
    }
  }, [open]);

  const handleBankOrChequeClick = async (type) => {
    await submitOrder({
      orderId: orderId,
      paymentId: pId,
      paymentMethodType: type,
      storeId: storeId,
      amount: isAsmUser ? amount : undefined,
    });
    router.push(`/thankyou?orderId=${orderId}`);
  };

  const handlePlaceOrder = async () => {
    router.push(`/thankyou?orderId=${orderId}`);
  };

  if (
    open === 3 &&
    paymentMethods.length === 0 &&
    orderDetails?.orderType?.name === "Internal Order"
  ) {
    return (
      <div className="checkout-child-wrapper payment-wrapper">
        <h4 className="regular">
          <FormattedMessage id="checkout.payment" />
        </h4>
        <div>
          <Button
            onClick={() => handlePlaceOrder()}
            className="adyen-checkout__button adyen-checkout__button--pay"
            sx={{ textTransform: "capitalize" }}
          >
            <FormattedMessage id="common.placeOrder" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-child-wrapper payment-wrapper">
      <h3 style={{ color: "black" }}>
        <FormattedMessage id="checkout.payment" />
      </h3>
      {paymentMethods.length || loading ? null : <div>No payment methods</div>}
      {loading ? <div>Loading...</div> : null}
      {isAsmUser && paymentMethods.length ? (
        <div className="row mt-4 d-flex align-items-center">
          <div className="col-md-6">
            <InputField
              fullWidth
              label="Amount"
              name="amount"
              onChange={(e) => {
                if (!e.target.value.match(/^[0-9]*$/)) {
                  return;
                }
                if (e.target.value === "") {
                  setAmount(null);
                } else {
                  setAmount(e.target.value);
                }
              }}
              variant="standard"
              value={amount}
            />
          </div>
        </div>
      ) : null}
      {open === 3 && (isAsmUser ? amount !== null : true) && (
        <>
          <ul className="payment-list">
            {typeof window !== "undefined" &&
              window.innerWidth > 992 &&
              paymentMethods?.map((ele) => (
                <li
                  key={ele.type}
                  className={
                    paymentType === ele?.type
                      ? "payment-type-active"
                      : "payment-type"
                  }
                  onClick={() => {
                    setPaymentType(ele?.type);
                    if (ele.paymentProvider === "Adyen") {
                      setIsAdyenMethod(true);
                      checkoutDetails
                        .create(ele?.type, {
                          showPayButton: true,
                          autoFocus: true,
                        })
                        .mount(dropinContainer.current);
                    } else {
                      setIsAdyenMethod(false);
                    }
                  }}
                >
                  {ele?.name}
                </li>
              ))}
          </ul>
          <div
            ref={dropinContainer}
            className={isAdyenMethod ? "" : "hide-container"}
          />
          {!isAdyenMethod &&
            (paymentType === "Cheque" ||
              paymentType === "Bank Transfer" ||
              paymentType === "POS" ||
              paymentType === "Cash" ||
              paymentType === "Payment Link") && (
              <div>
                <Button
                  onClick={() => handleBankOrChequeClick(paymentType)}
                  className="adyen-checkout__button adyen-checkout__button--pay"
                  sx={{ textTransform: "capitalize" }}
                >
                  <FormattedMessage id="common.placeOrder" />
                </Button>
              </div>
            )}
          {!isAdyenMethod && paymentType === "V12 Finance" && (
            <PaymentDetails
              paymentId={pId}
              orderSummary={orderSummary}
              storeId={storeId}
              orderDetails={orderDetails}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Payment;
