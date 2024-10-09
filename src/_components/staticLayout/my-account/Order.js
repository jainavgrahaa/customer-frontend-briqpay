import { useEffect, useState } from "react";
import { myAccOrdersDetails } from "@/_utils/customApiData";
import OrderAccordion from "@/_components/common/myAccount/order/OrderAccordion";
import useAuthHelper from "@/_hooks/useAuthHelper";

const Order = ({ translateId, currency }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAllOrdersSummary } = useAuthHelper();

  const fetchOrderSummary = async () => {
    const res = await getAllOrdersSummary(translateId);
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrderSummary();
  }, []);

  if (loading) {
    return (
      <section className="row margin-0">
        <div className="row order-wrapper-info col-12 col-md-12 col-lg-12 col-xl-7">
          <h3>Loading...</h3>
        </div>
      </section>
    );
  }

  return (
    <section className="row margin-0">
      <div className="row order-wrapper-info col-12 col-md-12 col-lg-12 col-xl-7">
        {data.length ? (
          data?.map((curElem) => (
            <OrderAccordion
              data={curElem}
              currency={currency}
              key={curElem?.id}
              {...curElem}
            />
          ))
        ) : (
          <h3>No Order`s Found</h3>
        )}
      </div>
    </section>
  );
};

export default Order;
