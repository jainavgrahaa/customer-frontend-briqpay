/* eslint-disable @next/next/no-img-element */
import { ShopByCategoriData } from "@/_utils/customApiData";
import Link from "next/link";
import React from "react";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { FormattedMessage } from "react-intl";

const ShopBycategori = () => {
  const { deviceType } = useDeviceHelper();
  return (
    <>
      <div className="container shopbycategori">
        <div className="image-container  ">
          {/* <div className=''> */}
          <div className=" sub-image-container">
            <h1
              style={{
                marginBottom: `${
                  deviceType === "mobile" ? "0px" : "87px !important"
                }`,
                textAlign: "start",
              }}
            >
              <FormattedMessage id="shopByCategory.shopBy" /> <span><FormattedMessage id="shopByCategory.category" /></span>
            </h1>
            <div className="sub-images" >
              <div className={"col-data"}>
                <img
                  className="w-100 pe-1"
                //   style={{paddingRight:"2px"}}
                  src={
                    deviceType === "mobile"
                      ? ShopByCategoriData[3].url
                      : ShopByCategoriData[0].url
                  }
                  alt="shop by catagori"
                />
                <Link href="#" className="image-cap">
                <FormattedMessage id="shopByCategory.earings" />{" "}
                  <span className="material-icons-outlined">chevron_right</span>
                </Link>
              </div>
              <div className=" col-data" >
                <img
                  className="w-100 ps-1"
                //   style={{paddingLeft:"2px"}}
                  src={
                    deviceType === "mobile"
                      ? ShopByCategoriData[4].url
                      : ShopByCategoriData[1].url
                  }
                  alt="shop by catagori"
                />
                <Link className="image-cap" href="#">
                <FormattedMessage id="shopByCategory.bracelets" />{" "}
                  <span className="material-icons-outlined">chevron_right</span>
                </Link>
              </div>
            </div>
          </div>
          {/* </div> */}
          {/* <div className="d-flex "> */}
          <div className="position-relative p-0 col-data-main">
            <img
              className="img-fluid w-100"
              src={
                deviceType === "mobile"
                  ? ShopByCategoriData[5].url
                  : ShopByCategoriData[2].url
              }
              alt="shop by catagori"
            />
            <Link className="image-cap" href="#">
            <FormattedMessage id="shopByCategory.pendants" />{" "}
              <span className="material-icons-outlined">chevron_right</span>
            </Link>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default ShopBycategori;
