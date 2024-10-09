/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import IconRadioButton from "@/_components/common/radio/IconRadioButton";
import Head from "next/head";
import { stepCheck } from "@/_utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import useDeviceHelper from "@/_hooks/useDeviceHelper";
import { usePathname } from "next/navigation";

const ProductListBox = ({ products, layout, type, viewMore, storeTypes, domain }) => {
    const router = useRouter();
    const [showDetails, setshowDetails] = useState("");
    const { deviceType } = useDeviceHelper();
    const pathname = usePathname();

    const categoryPath = pathname?.split("/").at(1);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/assets/css/product-listing.css" />
            </Head>
            <div className="product-listing single-listing-component">
                <div className="product-thumb row">
                    {products?.map((product, index) => {
                        const productData = product?.prodcuctData?.[0]
                        return (
                            <div
                                className={`product-thumb-data ${productData.banner
                                    ? "banner col-lg-6 col-md-12 col-sm-12 col-xs-12"
                                    : `${layout}`
                                    }`}
                                key={productData.id}
                            >
                                <div className={`product-top-head ${stepCheck(productData.favourite, 1) ? "justify-content-end" : ""}`}>
                                    {stepCheck(productData.bestseller, 1) ? (
                                        <p className="bestseller">Bestseller</p>
                                    ) : null}
                                    <Button variant="text" className={`icon-rounded ${storeTypes && domain && storeTypes[domain] === "df" ? "color-bistre-brown" : ""}`}> <span className="material-icons-outlined">favorite</span></Button>
                                </div>
                                <div className="product-thumb-box">
                                    <Link href={`/${categoryPath}/design/${productData?.variantoptionname
                                        ?.trim()
                                        ?.replace(/\W+/g, "-")
                                        ?.toLowerCase()}-${productData.code}`} className="img-wrapper">
                                        <img src={productData.image !== "" ? productData.image : "/assets/images/product-card-listings.png"} alt={productData.alt || productData.label} />
                                    </Link>
                                    {productData?.variants && (
                                        <div className="icon-radio-wrapper color-variants">
                                            <IconRadioButton
                                                radioData={moreColorVariantsData}
                                                extraClass={"color-variants"}
                                            />
                                        </div>
                                    )}
                                </div>
                                <Link href={`/${categoryPath}/design/${productData?.variantoptionname
                                    ?.trim()
                                    ?.replace(/\W+/g, "-")
                                    ?.toLowerCase()}-${productData.code}`}>
                                    {productData.name && <h5>{productData.name}</h5>}
                                    <p>
                                        <span className="price-from">from: </span>
                                        <b>{productData?.price}</b>
                                    </p>
                                </Link>
                                {viewMore &&
                                    <div className={`${deviceType === "mobile" ? "mt-2 mb-2" : "mt-4 mb-4"}`}>
                                        {showDetails === index &&
                                            <div className="product-details">
                                                <ul>
                                                    <li data-key="Product ID">Product ID: <strong>CLRN271_08</strong></li>
                                                    <li data-key="Design Number">Design Number: <strong>RN0045468</strong></li>
                                                    <li data-key="Metal">Metal: <strong>18K White Gold</strong></li>
                                                    <li data-key="Ring Size">Ring Size: <strong>J</strong></li>
                                                    <li data-key="Stone Type">Stone Type: <strong>Lab Created Diamond</strong></li>
                                                    <li data-key="Carat">Carat: <strong>2.00</strong></li>
                                                    <li data-key="Clarity">Clarity: <strong>VVS1</strong></li>
                                                    <li data-key="Colour">Colour: <strong>H</strong></li>
                                                    <li data-key="Certificate">Certificate: <strong>DF</strong></li>
                                                    <li data-key="Shape">Shape: <strong>Oval</strong></li>
                                                </ul>
                                                <p className="mt-4 mb-4">Estimated Delivery 2-4 Working Weeks</p>
                                            </div>
                                        }
                                        <Button variant="text" className="underline text-style-normal justify-content-start pl-0 plain-text-btn"
                                            onClick={() => setshowDetails(index)}>{showDetails === index ? "Hide details" : "Show Details"}</Button>
                                    </div>
                                }
                                {type && <div className="actions mt-3">
                                    <Button variant="contained" fullWidth className="mb-3">Move to Bag</Button>
                                    <Button variant="outlined" onClick={() => router.push(`/${categoryPath}/design/${productData?.variantoptionname
                                        ?.trim()
                                        ?.replace(/\W+/g, "-")
                                        ?.toLowerCase()}-${productData.code}`)} fullWidth>View Item</Button>
                                </div>}
                            </div>
                        );
                    })}
                </div>
            </div >
        </>
    );
};

export default ProductListBox;
