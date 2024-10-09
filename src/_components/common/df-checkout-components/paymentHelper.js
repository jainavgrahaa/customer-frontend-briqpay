import { createAlert } from "@/_store/alert.slice";
import { getApiUrl } from "@/_utils";
import { TOKEN_KEY } from "@/_utils/userToken";
import { getCookie } from 'cookies-next';

async function handleSubmissionDropin(
  state,
  dropin,
  url,
  router,
  orderId,
  paymentId,
  dispatch,
  storeId
) {
  try {
    const payload = {
      orderId: orderId,
      paymentId: paymentId,
      paymentData: state.data,
      returnUrl: `${window.location.origin}/thankyou?orderId=${orderId}&storeId=${storeId}`,
      currency: "AUD", 
      amount: "1400",
      countryCode: "AU", 
      storeId: storeId,
    };
    const res = await callServer(url, payload);
    if (res.action) {
      dropin.handleAction(res.action);
    } else {
      router.push(`/thankyou?orderId=${orderId}`)
    }
  } catch (error) {
    dispatch(
      createAlert({
        alertType: "error",
        msg: "Something went wrong, Please try again!",
      }));
  }
}

// Calls your server endpoints
async function callServer(url, data) {
  const token = getCookie(TOKEN_KEY);
  const res = await fetch(url, {
    method: "POST",
    body: data ? JSON.stringify(data) : "",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": getApiUrl(),
      Authorization: `Bearer ${token}`,
    },
  }).catch((err) => {
    console.log(err);
  });
  return await res.json();
}

export async function createAdyenCheckoutWithConfiguration(
  paymentMethodsResponse,
  router,
  orderId,
  paymentId,
  dispatch,
  storeId
) {
  const configuration = {
    paymentMethodsResponse: paymentMethodsResponse.data.Adyen,
    clientKey: "test_AOXZJXPOVJGEHHLHRGZYZOQ5K4GBOLGH",
    locale: "en_GB",
    environment: "test",
    analytics: {
      enabled: false,
    },
    onSubmit: (state, dropin) => {
      handleSubmissionDropin(
        state,
        dropin,
        `${getApiUrl('/order/checkout/submitPayment')}`,
        router,
        orderId,
        paymentId,
        dispatch,
        storeId
      );
    },
    onAdditionalDetails: (state, dropin) => {
      handleSubmissionDropin(
        state,
        dropin,
        `${getApiUrl('/order/payment/submitAdditionalDetails')}`,
        router,
        orderId,
        paymentId,
        dispatch,
        storeId
      );
    },
    paymentMethodsConfiguration: {
      card: {
        // Example optional configuration for Cards
        hasHolderName: true,
        holderNameRequired: true,
        enableStoreDetails: true,
        hideCVC: false, // Change this to true to hide the CVC field for stored cards
        name: "Credit or debit card",
        //onSubmit: () => {}, // onSubmit configuration for card payments. Overrides the global configuration.
      },
      paypal: {
        // intent: "capture",
        // intent: "authorize",
        environment: "test",
        countryCode: "GB", //"NL" ,  // Only needed for test. This will be automatically retrieved when you are in production.
        amount: {
          value: 700,
          currency: "GBP", //"SEK"
        },
       },
      amazonpay: {
        // Optional configuration for Amazon Pay
        productType: "PayAndShip",
        merchantMetadata: {
          merchantReferenceId: "Merchant-order-123",
          merchantStoreName: "MyStore",
          noteToBuyer: "Thank you for your order",
        },
        amount: {
          currency: "GBP",
          value: 700,
        },
        chargePermissionType: "OneTime", // For a recurring payment
        environment: "test",
        storeId:
          "amzn1.application-oa2-client.b88e7b4430694cb19a47e5083bdfe452",
        merchantId: "A259C8DGVDHZY2",
        placement: "Checkout",
        publicKeyId: "SANDBOX-AHKW3CHDO7TC5JHY4RBJRVHN",
        returnUrl: `${window.location.origin}/thankyou?orderId=${orderId}&storeId=${storeId}`,
      },
    },
  };
  const AdyenCheckout = (await import("@adyen/adyen-web")).default;
  const res = new AdyenCheckout(configuration);
  return res;
}
