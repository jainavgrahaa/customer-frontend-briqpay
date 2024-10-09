/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import ProductCard from "@/_components/common/ProductCard";
import { getCookie } from "cookies-next";
import { ASM_USER_EMAIL } from "@/_utils/userToken";

const OrderAccordion = ({ data, currency, orderYear, orderStatus, id, estimated_ship_date, url, alt, style, InsuredDelivery, subTotal, vat, appliedCoupan }) => {

  const [show, setShow] = useState(false)
  const isASMAdmin = Boolean(getCookie(ASM_USER_EMAIL))
  
  const status = data?.orderStatesMaps?.orderCustomerStates?.stateName;

  const getStatusClass = () => {
    let statusClass = "new"
    if (status === "CANCELLED") {
      statusClass = "cancel"
    } else if (status === 'COMPLETED') {
      statusClass = "completed"
    }
    return statusClass
  }
  return (
    <>
      <div className="order_details">
        <div className="order-head d-flex justify-content-between" onClick={() => setShow(!show)}>
          <div className="d-flex flex-column gap-1 align-items-start">
            <h3 >
              Order # {data?.referenceId}

            </h3>
            {/* After Api Implemention For In Progress Please use class (in-progess) instead of new and completed */}
            <span className={getStatusClass()}>{status?.replace("_", " ")}</span>
          </div>
          <div className="cursorP">
            {show ? <span className="material-icons-outlined hide_show_icon">expand_less</span>
              : <span className="material-icons-outlined hide_show_icon">expand_more</span>
            }
          </div>
        </div>


        {
          show && <div className="order_wrapper">
            <div className="row col-12">
              {/* <div className="estimate_sec">
                  <p>Estimated ship date:</p>
                  <span className="material-icons-outlined estiment-shipent-time">event</span>
                  <p>{estimated_ship_date}</p>
                </div> */}
              <div className="order-info">
                <h3 >{alt}</h3>
                <div className="row Prod_details">
                  <div className="col-lg-12 cart-shopping-content-left">
                    <ul className="products-thumb-list">
                      {data &&
                        data?.orderLineItems?.length > 0 &&
                        data?.orderLineItems?.map((item) => {
                          const discountDetail =
                            item?.orderLineItemPrice?.priceInfos
                              ?.filter((item) => item.name === "Coupon")
                          const dataToShow = discountDetail?.[0]?.priceInfoPropertyValues?.filter(item => item?.name === "Coupon Id")
                          return (
                            <li key={Math.random()}>
                              <ProductCard item={item} isChooseFilter={false} currency={currency} dataToShow={dataToShow} isEditable={isASMAdmin && item?.allowEdit} canRemove={false} />
                            </li>
                          );
                        })}
                    </ul>
                  </div>

                </div>
                <div className="address-wrapper">
                  <div className="delivery-address">
                    <h6>Delivery address</h6>
                    <p>{data?.payments?.[0]?.address?.address1}, {data?.payments?.[0]?.address?.address2}</p>
                    <p>{data?.payments?.[0]?.address?.city}, {data?.payments?.[0]?.address?.country?.name} - {data?.payments?.[0]?.address?.postcode}</p>
                    <p>{data?.payments?.[0]?.address?.phoneNumber}</p>
                  </div>
                  <div className="row col-12">
                    {
                      data?.shippings?.[0]?.address?.address1 &&
                      <div className="delivery-address col-12 col-lg-6 col-sm-12">
                        <h6>Billing address</h6>
                        <p>{data?.shippings?.[0]?.address?.address1}, {data?.shippings?.[0]?.address?.address2}</p>
                        <p>{data?.shippings?.[0]?.address?.city}, {data?.shippings?.[0]?.address?.country?.name} - {data?.shippings?.[0]?.address?.postcode}</p>
                        <p>{data?.shippings?.[0]?.address?.phoneNumber}</p>
                      </div>
                    }
                    <div className="delivery-address col-12 col-lg-6 col-sm-12">
                      <h6>Payment method</h6>
                      <p>{data?.payments?.[0]?.paymentMethodType?.name}</p>
                      <p>{data?.payments?.[0]?.paymentMethodType?.provider}<br></br>
                        {/* <span>************4567</span> */}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="total_payment-wrapper">
                  <p> <span>Insured delivery:</span><span>{data?.shippings?.[0]?.shippingMethodType?.type === 'pickup' ? "In Store Pickup" : "Free Delivery"}</span></p>
                  <p><span>Sub-Total:</span><span>{data?.payments?.[0]?.amount}</span></p>
                  <p><span>UK VAT (20%):</span><span>{data?.orderPrice?.tax}</span></p>
                  {
                    Number(data?.orderPrice?.coupon).toFixed() !== 0 && (
                      <p><span>Applied coupon:</span><span>{data?.orderPrice?.coupon}</span></p>
                    )
                  }
                  <p className="totel"><span>Total:</span><span>{data?.payments?.[0]?.amount}</span></p>
                </div>
              </div>
            </div>
          </div>
        }
        <div className="divider">

        </div>
      </div>

    </>
  )
}

export default OrderAccordion
