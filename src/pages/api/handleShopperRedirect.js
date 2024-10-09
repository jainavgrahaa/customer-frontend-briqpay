import { getApiUrl } from "@/_utils";
import { TOKEN_KEY } from "@/_utils/userToken";
import { getCookie } from "cookies-next";

async function callServer(url, data, cookieToken) {
  const token = cookieToken || getCookie(TOKEN_KEY);
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
  const resp = await res.json();
  return resp;
}

export default async function handler(req, res) {
  const redirect = req.method === "GET" ? req.query : req.body;
  const cookieToken = req?.cookies?.["token"];
  try {
    const details = {};
    if (redirect.redirectResult) {
      details.redirectResult = redirect.redirectResult;
    } else {
      details.MD = redirect.MD;
      details.PaRes = redirect.PaRes;
    }
    const storeId = redirect.storeId;
    const orderId = redirect.orderId;
    let payload = {
      storeId,
      orderId,
      paymentData: {
        details: details,
      },
    };

    const v12Payload = {
      paymentData: {
        details: {
          REF: redirect.REF,
          SR: redirect.SR,
          Flag: redirect.Flag,
          status: redirect.status,
          Auth: redirect.Auth,
          SSR: redirect.SSR,
        },
      },
    };
    // passtoken
    const resp = await callServer(
      getApiUrl("/order/payment/submitAdditionalDetails"),
      redirect.REF ? v12Payload : payload,
      cookieToken
    );
    res.status(200).json(resp);
  } catch (err) {
    console.error(
      `Error: ${err}, message: ${err.message}, error code: ${err.errorCode}`
    );
  }
}
