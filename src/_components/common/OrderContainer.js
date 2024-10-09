/* eslint-disable react-hooks/exhaustive-deps */
import useAuthHelper from "@/_hooks/useAuthHelper";
import { useEffect, useState } from "react";

const OrderContainer = ({ details }) => {
  const [orderSummary, setOrderSummary] = useState(null);
  const { getOrderSummary } = useAuthHelper();

  useEffect(async () => {
    if (details && details?.order?.objectId) {
      const summary = await getOrderSummary(details?.order?.objectId);
      setOrderSummary(summary);
    }
    else{
      setOrderSummary(null);
    }
  }, [details]);

  return (
    <div className="order-container">
      <div className="order-sub-container">
        <div className="inner-container">
          <div>
            <h4>Order {details?.order?.referenceId}</h4>
          </div>
          <div className="flex-between-up">
            <h4>Estimated Ship Date</h4>
            <h4>
              <img
                src={"/assets/icons/raw-svgs/calendar2.svg"}
                alt="calendarLogo"
              />
              5th 8th of may, 2024
            </h4>
          </div>

          <div className="order-card">
            {details &&
              details?.order?.orderLineItems?.length > 0 &&
              details?.order?.orderLineItems?.map((item) => {
                return (
                  <>
                    <div className="upper-card">
                      <div className="card-img" style={{ width: "91%" }}>
                        <img
                          alt="Image"
                          src="/assets/images/cart-thumb-img-01.png"
                        />
                      </div>

                      <div
                        className="card-info"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem !important",
                        }}
                      >
                        {/* <div>
                          <h4>Cler</h4>
                          <p>
                            Style:{" "}
                            <span style={{ marginLeft: "35px" }}>Solitare</span>
                          </p>
                          <p>
                            Shape:
                            <span style={{ marginLeft: "28px" }}>
                              <img
                                src={"/assets/icons/raw-svgs/Princess2.svg"}
                                style={{ marginRight: "5px" }}
                              />
                              Princess
                            </span>
                          </p>
                          <p>
                            Metal:
                            <span style={{ marginLeft: "30px" }}>
                              <img
                                src={"/assets/icons/raw-svgs/white-gold.svg"}
                                style={{ marginRight: "5px" }}
                              />
                              White Gold
                            </span>
                          </p>
                          <p>
                            Size:<span style={{ marginLeft: "45px" }}>N</span>
                          </p>
                          <p>
                            Carat:
                            <span style={{ marginLeft: "35px" }}>0.3</span>
                          </p>
                        </div>
                        <div>
                          <p>
                            Clarity:
                            <span style={{ marginLeft: "45px" }}>VS1</span>
                          </p>
                          <p>
                            Color:
                            <span style={{ marginLeft: "50px" }}>H-I</span>
                          </p>
                          <p>
                            Certificate:
                            <span style={{ marginLeft: "20px" }}>A&B</span>
                          </p>
                          <p>
                            Band width:
                            <span style={{ marginLeft: "20px" }}>Delicate</span>
                          </p>
                          <p>
                            Cut grade:
                            <span style={{ marginLeft: "20px" }}>Good</span>
                          </p>
                        </div> */}

                        {item?.productData?.[0]?.variantOption?.[0]?.metalsList?.map(
                          (item1, index) => {
                            return (
                              <>
                                <div key={index} className="material-section">
                                  <h4 className="thumb-subtitle">Settings</h4>
                                  <div
                                    className="material-details"
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <span className="material-label">
                                      Metal:
                                    </span>
                                    <span className="material-value">
                                      {item1?.metal?.name}
                                    </span>
                                  </div>
                                  {/* {item1?.metal?.metalPropertyValueMaps?.map(
                                    (item2, index) => {
                                      return (
                                        <>
                                          {index === 0 && (
                                            <div className="material-details">
                                              <span className="material-label">
                                                Metal:
                                              </span>
                                              <span className="material-value">
                                                {item1?.metal?.name}
                                              </span>
                                            </div>
                                          )}
                                          <div className="material-details">
                                            <span className="material-label">
                                              {item2?.property?.name}:
                                            </span>
                                            <span className="material-value">
                                              {
                                                item2
                                                  ?.metalPropertyValueMapTranslates?.[0]
                                                  ?.propertyValue
                                              }
                                            </span>
                                          </div>
                                        </>
                                      );
                                    }
                                  )} */}
                                </div>
                              </>
                            );
                          }
                        )}
                      </div>

                      <div
                        className="card-info"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem",
                        }}
                      >
                        {item?.productData?.[0]?.variantOption?.[0]?.stonesList?.map(
                          (item1, index) => {
                            return (
                              <>
                                {index === 0 && (
                                  <h4 className="thumb-subtitle">Stone</h4>
                                )}
                                <div className="material-section">
                                  <div
                                    className="material-details"
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      gap: "0.5rem",
                                    }}
                                  >
                                    <span className="material-label">
                                      {
                                        item1?.stoneProperty
                                          ?.stonePropertyTranslates?.[0]?.name
                                      }
                                      :
                                    </span>
                                    <span className="material-value">
                                      {
                                        item1?.stonePropertyValues
                                          ?.stonePropertyValuesTranslates?.[0]
                                          ?.value
                                      }
                                    </span>
                                  </div>
                                </div>
                              </>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
            <div className="lower-card">
              <ul className="cost-card">
                {orderSummary?.["Insured delivery"] && (
                  <li className="flex-between">
                    <span>Insured delivery</span>
                    <span>{orderSummary?.["Insured delivery"]}</span>
                  </li>
                )}
                {orderSummary?.["Sub-Total"] && (
                  <li className="flex-between">
                    <span>Subtotal</span>
                    <span>{orderSummary?.["Sub-Total"]}</span>
                  </li>
                )}
                {orderSummary?.Coupon && (
                  <li className="flex-between">
                    <span>Applied Coupon</span>
                    <span>{orderSummary?.Coupon}</span>
                  </li>
                )}
                {orderSummary?.vat && (
                  <li className="flex-between">
                    <span>UK VAT(20%)</span>
                    <span>{orderSummary?.vat}</span>
                  </li>
                )}
                {orderSummary?.Promotion && (
                  <li className="flex-between">
                    <span>Promotion</span>
                    <span>{orderSummary?.Promotion}</span>
                  </li>
                )}
                {orderSummary?.Total && (
                  <li className="flex-between">
                    <span>Total</span>
                    <span>{orderSummary?.Total}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderContainer;
