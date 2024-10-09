/* eslint-disable react-hooks/exhaustive-deps */
import ThankYou from "@/_components/common/ThankYou";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuthHelper from "@/_hooks/useAuthHelper";
import OrderContainer from "@/_components/common/OrderContainer";
import CircularLoader from "@/_components/common/loader/circular-loader";

const getStatus = (code, orderId) => {
  const obj = {
    404: {
      title: "Order not found",
      showDefaultMessage: true,
    },
    // payment failed
    401: {
      title: "Payment Failed",
      secondContent: `Unfortunately the payment for your order has declined. Please try again or contact us by phone on <a href="tel:020 7660 1529" style="color: #748DA6;"> 020 7660 1529 </a>  or email:
      <a href="mailto:service@austenblake.com" style="color: #748DA6;"> service@austenblake.com</a> to complete your purchase.`,
      showDefaultMessage: false,
    },
    // payment success
    200: {
      title: "Thank you!",
      content: ` Your order ${orderId} has been placed!`,
      secondContent:
        "We have received your order. <br /> You will receive a confirmation via email shortly. Please call us or email as if you have any questions.",
      showDefaultMessage: true,
    },
    // payment success bank
    201: {
      title: "Thank you for shopping with us!",
      content: `Your order number is ${orderId}`,
      secondContent: `We have received your order You will receive an  email with your purchase details and receipt. This is a confirmation of your payment only and your order is under review. You will receive an order confirmation email within 5 working days to let you know that your order review was successful.If it isn’t in your inbox, please make sure to check your folders.</br> </br> If you have any question regarding your order or require further assistance, please do not hesitate to contact our Customer Care Team by telephone: <a href="tel:020 7660 1529" style="color: #748DA6;"> 020 7660 1529 </a>  or email:<a href="mailto:service@austenblake.com" style="color: #748DA6;"> service@austenblake.com</a>`,
      showDefaultMessage: false,
    },
  };
  return obj[code];
};

const ThankyouPage = ({ translateId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({});
  const [orderDetails, setOrderDetails] = useState(null);
  const { getOrderStatus } = useAuthHelper();
  const { orderId, redirectResult, storeId, REF, SR, Flag, Status, Auth, SSR } =
    router.query;

  const checkIsSuccess = (type) =>
    type.trim().toLowerCase() === "cheque" ||
    type.trim().toLowerCase() === "bank transfer" ||
    type.trim().toLowerCase() === "pos" ||
    type.trim().toLowerCase() === "cash" ||
    type.trim().toLowerCase() === "payment link";

  const fetchOrderStatus = async (oId) => {
    setLoading(true);
    try {
      // translate id
      const res = await getOrderStatus(orderId || oId, translateId);
      if (res === undefined) {
        setStatus(getStatus(404));
      } else {
        const orderInternalStateName =
          res?.order?.orderStatesMaps?.orderInternalStates.stateName;
        const paymentInternalStatesName =
          res?.order?.payments?.[0]?.paymentStatesMaps?.paymentInternalStates
            ?.stateName;
        if (
          (orderInternalStateName === "SUBMITTED" &&
            (paymentInternalStatesName === "PAYMENT_FAILED" ||
              paymentInternalStatesName === "PAYMENT_CANCELLED")) ||
          res.statusCode
        ) {
          setStatus(getStatus(401));
        }
        if (
          (orderInternalStateName === "ORDER_PLACED" ||
            orderInternalStateName === "FRAUD_VERIFIED" ||
            orderInternalStateName === "ADDRESS_VERIFIED" ||
            orderInternalStateName === "APPROVAL_REQUIRED") &&
          res?.order?.orderType?.name === "Customer Order" &&
          (paymentInternalStatesName === "PAYMENT_AUTHORIZED" ||
            paymentInternalStatesName === "PAYMENT_COMPLETED" ||
            paymentInternalStatesName === "PAYMENT_ACKNOWLEDGED")
        ) {
          if (
            checkIsSuccess(
              res?.order?.payments?.[0]?.paymentMethodType?.type
                .trim()
                .toLowerCase()
            )
          ) {
            setStatus(getStatus(201, res?.order?.referenceId));
            setOrderDetails({
              orderDetail: res,
              referenceId: res?.order?.referenceId,
              order: res?.order,
              paymentMethodType:
                res?.order?.payments?.[0]?.paymentMethodType?.type,
            });
          } else {
            setStatus(getStatus(200, res?.order?.referenceId));
            setOrderDetails({
              referenceId: res?.order?.referenceId,
              paymentMethodType:
                res?.order?.payments?.[0]?.paymentMethodType?.type,
            });
          }
        }
      }
    } catch (error) {
      setStatus(getStatus(404));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (storeId) {
      (async () => {
        await fetch(
          `/api/handleShopperRedirect?orderId=${orderId}&storeId=${storeId}&redirectResult=${redirectResult}`
        );
        fetchOrderStatus();
      })();
    } else if (REF) {
      (async () => {
        const res = await fetch(
          `/api/handleShopperRedirect?REF=${REF}&Flag=${Flag}&status=${Status}&Atuh=${Auth}&SSR=${SSR}&SR=${SR}`
        );
        const response = await res.json();
        fetchOrderStatus(response?.id);
      })();
    }
  }, []);

  useEffect(() => {
    if (orderId && !storeId) {
      fetchOrderStatus();
    }
  }, []);

  if (loading) return <CircularLoader />;

  return (
    <ThankYou
      title={status?.title}
      content={status?.content}
      secondContent={status?.secondContent}
      showDefaultMessage={status?.showDefaultMessage}
    >
      {orderDetails &&
        checkIsSuccess(
          orderDetails?.paymentMethodType?.trim().toLowerCase()
        ) && <OrderContainer details={orderDetails?.orderDetail} />}
    </ThankYou>
  );
};

export default ThankyouPage;
