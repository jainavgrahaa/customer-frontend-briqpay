/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import useAuthHelper from "@/_hooks/useAuthHelper";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormattedMessage } from 'react-intl'

// Start : Code  Added for Order history UI 
const ordersHistory=[
  {
    id:1,
    product:"4 Prong Yellow Diamond Vintage Solitaire Engagement Ring",
    orderNo:"R-147533",
    orderDate:"14-12-2023",
    amount:"£9,377",
    details:"View"

  }
]
// End : Code  Added for Order history UI 


const OrderHistory = ({ translateId }) => {
  const [orderData, setOrderData] = useState([]);
  const { getAllOrdersSummary } = useAuthHelper();

  const fetchOrderSummary = async () => {
    const res = await getAllOrdersSummary(translateId);
    setOrderData(res);
  };

  useEffect(() => {
    fetchOrderSummary();
  }, []);
  return (
    <>
      {/* {orderData?.map((ele) => (
        <div className="order-information" key={ele.objectId}>
          <h4 className="order-info-heading">Order Information</h4>
          <div className="order-info-data">
            <div className="info-data">
              <div className="info-data-menu">
                <span>Order ID:</span>
                <span>Order Date:</span>
                <span>Payment Method:</span>
                <span>Shipping Method:</span>
              </div>
              <div className="info-data-value">
                <span># {ele?.referenceId}</span>
                <span>{dayjs(ele?.updatedAt).format('DD/MM/YYYY')}</span>
                <span>{ele?.payments?.[0]?.paymentMethodType?.name}</span>
                <span>{ele?.shippings?.[0]?.shippingMethodType?.type === 'pickup' ? 'Instore Pickup' : 'Fully Insured Free Shipping'}</span>
              </div>
            </div>
          </div>
          <div className="payment-container">
            <div className="payment-heading">
              <span className="payment-address">Payment Address</span>
              {
                ele?.shippings?.[0]?.address?.address1 &&
              <span className="payment-address">Delivery Address</span>
              }
            </div>
            <div className="payment-data">
              <div className="payment-address-data">
                <span>{`${ele?.payments?.[0]?.address?.firstName} ${ele?.payments?.[0]?.address?.lastName} `}</span>
                <span>{ele?.payments?.[0]?.address?.address1}, {ele?.payments?.[0]?.address?.address2}</span>
                <span>{ele?.payments?.[0]?.address?.city}, {ele?.payments?.[0]?.address?.country?.name}</span>
                <span>{ele?.payments?.[0]?.address?.postcode}</span>
              </div>
              {
                ele?.shippings?.[0]?.address?.address1 &&
              <div className="payment-address-data">
              <span>{`${ele?.shippings?.[0]?.address?.firstName} ${ele?.shippings?.[0]?.address?.lastName} `}</span>
                <span>{ele?.shippings?.[0]?.address?.address1}, {ele?.shippings?.[0]?.address?.address2}</span>
                <span>{ele?.shippings?.[0]?.address?.city}, {ele?.shippings?.[0]?.address?.country?.name}</span>
                <span>{ele?.shippings?.[0]?.address?.postcode}</span>
              </div>
              }
            </div>
          </div>
          <div className="table-container">
            {
              ele.orderLineItems.map(item => (<table key={item.id}>
                <thead>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Model</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </thead>
                <tbody>
                  <td>
                    <img src="/assets/images/cart-thumb-img-01.png" />
                  </td>
                  <td className="order-info">
                    <span>
                      {item.product.name}
                    </span>
                  </td>
                  <td>CLRN1_YD_04</td>
                  <td>{item?.quantity}</td>
                  <td>£9,377</td>
                  <td>£9,377</td>
                </tbody>
              </table>))
            }
            
          </div>
          <div className="order-info-btns">
            <button className="reorder-btn">Reorder</button>
            <button className="continue-btn">Continue</button>
          </div>
        </div>
      ))} */}
        {/* Start : Code  Added for Order history UI */}
        <div className="order-history">
          <h2 className="order-history-heading mb-30">Order History</h2>
          <div className="data-table-container">
            {/* <table className="data-table">
              <thead>
                <tr>
                  <th>Product(s)</th>
                  <th>Order No.</th>
                  <th>Order Date</th>
                  <th>Amount</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {ordersHistory.map((order, index) => (
                  <tr key={index}>
                    <td data-label="Product(s)">{order.product}</td>
                    <td data-label="Order No.">{order.orderNo}</td>
                    <td data-label="Order Date">{order.orderDate}</td>
                    <td data-label="Amount">{order.amount}</td>
                    <td data-label="Details">
                      <Button variant="contained" style={{width: "90px",height: "40px",minHeight: "initial", minWidth: "initial",textTransform: "capitalize"}}>{order.details}</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            {orderData.length !== 0 &&
            <div className="order-empty-form">
              <p className="f-16 mb-30"><FormattedMessage id={"common.noorderplaced"} /></p>
              <Button variant="contained" fullWidth><FormattedMessage id={"common.shopnowbutton"} /></Button>
            </div>
            }
            </div>
        </div>
    </>
  );
};

export default OrderHistory;
