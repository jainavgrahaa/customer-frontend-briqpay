import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { LOCATION_ID } from "@/_utils/userToken";
import { getApiUrl, getEstimatedTime } from "@/_utils";

const ShippingInfo = ({ shippingData, extraClass }) => {
  const locationId = getCookie(LOCATION_ID);

  const { storeData } = useSelector((state) => state.appconfig);
  const { email, phoneNumber } = storeData || {};
  const [shippingInfo, setShippingInfo] = useState(null);

  const fetchShippingInfo = async () => {
    const apiUrl = getApiUrl(`/activity-mappings/estimated-delivery-date`);
    const payload = {
      variantOptionId: "f4dacea9-4c03-4275-8111-af2fdeb07a57",
      locationId: locationId,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setShippingInfo(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchShippingInfo();
  }, []);

  return shippingData ? (
    <>
      {shippingData.map((item, index) => (
        <div
          key={`${item?.title}${item?.index}`}
          className={`shipping-info ${extraClass ?? ""}`}
        >
          <div className="shipping-info-title">
            <h4>{item.title}</h4>
          </div>
          <div className="shipping-info-content">
            {/* {item.infoList.map((items, i) => ( */}
            {shippingInfo && (
              <>
                <div className="wrap">
                  <div className="estimated-delivery-date-subheading">
                    Estimated delivery date:
                  </div>
                  <div className="estimated-date">
                    {/* {extraClass != "theme-02" ? (
                      <span className="material-icons-outlined icons-small">
                        event
                      </span>
                    ) : (
                      ""
                    )} */}
                    <span>
                      {getEstimatedTime(shippingInfo?.expectedCompletedDate)}
                    </span>
                  </div>
                </div>
              </>
            )}
            {/* ))} */}
            {(email || phoneNumber) && (
              <div className="questions-section">
                <h4>{item.qaestitle}</h4>
                <div className="contact-options">
                  {email && (
                    <p>
                      <Link href={`mailto:${item.email}`}>{item.email}</Link>
                    </p>
                  )}
                  {phoneNumber && (
                    <p>
                      <Link href={`tel:${item.number}`}>{item.number}</Link>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  ) : (
    ""
  );
};

export default ShippingInfo;
