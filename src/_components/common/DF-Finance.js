/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, Slider } from "@mui/material";
import { FormattedMessage } from "react-intl";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { domainSelection, getStoreDetails } from "@/_utils";
import { calculate } from "./PaymentDetails";

const getFilteredFinanceProducts = (options) => {
  const output = [];
  output.push(...options.filter((ele) => ele.APR === 0 && ele.Months === 6));
  output.push(
    ...options.filter(
      (ele) =>
        ele.APR === 9.9 &&
        (ele.Months === 12 || ele.Months === 24 || ele.Months === 36)
    )
  );
  output.push(
    ...options.filter((ele) => ele.APR === 15.9 && ele.Months === 48)
  );

  return output.map((ele) => ({
    label: ele?.Name,
    value: ele.Months,
    name: ele,
  }));
};

const DfFinance = ({ orderSummary, storeId, currency }) => {
  const [sliderValue, setSliderValue] = useState(15);
  const [financeProductOptions, setFinanceProductOptions] = useState([]);
  const [selectedFPOption, setSelectedFPOption] = useState(null);
  const [moreoptions, setmoreoptions] = useState(false);
  const [storeData, setStoreData] = useState();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const { getRetailerFinanceProducts } = useAuthHelper();

  const getDetails = () => [
    { label: "Loan Repayment", value: `${currency} ${details.balancePayable}` },
    {
      label: "Monthly Instalment",
      value: `${currency} ${details.initialPayments}`,
    },
    { label: "Cost of Loan", value: `${currency} ${details.chargeForCredit}` },
    { label: "Value of Goods", value: `${currency} ${details.cashPrice}` },
    {
      label: "Total Amount Payable",
      value: `${currency} ${details.amountPayable}`,
    },
    { label: "Amount of Loan", value: `${currency} ${details?.loanAmount}` },
    { label: "Term of Agreement", value: `${details.Months} months` },
  ];

  const fetchStoreData = async () => {
    const hostname = window.location.host;
    const domain = domainSelection[hostname];
    const details = await getStoreDetails(domain);
    setStoreData({
      objectId: details?.objectId,
      allowDifferentAddress: details?.allowDifferentShippingAndBillingAddress,
      defaultCountry: details?.defaultCountry,
      defaultTranslate: details?.defaultTranslate,
      v12RetailerGUID: details?.v12RetailerGUID,
      v12RetailerId: details?.v12RetailerId,
    });
    setLoading(false);
  };

  const getSelectedFinanceProduct = () =>
    financeProductOptions.find((ele) => ele.value === selectedFPOption)?.name;

  useEffect(() => {
    fetchStoreData();
  }, []);

  useEffect(() => {
    if (
      financeProductOptions.length &&
      orderSummary?.Total &&
      selectedFPOption
    ) {
      const res = calculate(
        getSelectedFinanceProduct(),
        orderSummary?.Total,
        +orderSummary?.Total * (+sliderValue / 100),
        currency
      );
      setDetails(res);
    }
  }, [sliderValue, selectedFPOption, financeProductOptions]);

  const fetchRetailerFinanceProducts = async () => {
    const res = await getRetailerFinanceProducts(storeId, {
      retailerId: storeData?.v12RetailerId,
      retailerGuid: storeData?.v12RetailerGUID,
    });
    const output = getFilteredFinanceProducts(res.FinanceProducts);
    setFinanceProductOptions(output);
    setSelectedFPOption(output[0]?.value);
  };

  useEffect(() => {
    if (storeData?.v12RetailerId) {
    fetchRetailerFinanceProducts();
    }
  }, [storeData]);

  if (loading) return null;

  return (
    <>
      <div className="finance-block">
        <div className="row">
          <div className="col-xl-7 col-sm-12">
            <p className="semi-bold mb-0">
              <img src="/assets/images/star-shape-1.svg" className="mr-10" />{" "}
              Choose your finance product
            </p>
          </div>
          <div className="col-xl-5 col-sm-12">
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedFPOption}
                label="Classic Credit 48 Months 9.9%"
                fullWidth
                variant="standard"
                className="no-select-border"
                onChange={(e) => setSelectedFPOption(e.target.value)}
              >
                {financeProductOptions.map((ele) => (
                  <MenuItem key={ele} value={ele.value}>
                    {ele.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-7 col-sm-12">
            <p className="semi-bold mb-0">
              <img src="/assets/images/star-shape-1.svg" className="mr-10" />{" "}
              Deposit Percentage
            </p>
          </div>
          <div className="col-xl-5 col-sm-12">
            <Slider
              size="small"
              defaultValue={sliderValue}
              aria-label="Small"
              valueLabelDisplay="auto"
              onChange={(e) => setSliderValue(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xl-7 col-sm-12">
            <p className="semi-bold mb-0">
              <img src="/assets/images/star-shape-1.svg" className="mr-10" />{" "}
              Amount of Deposit
            </p>
          </div>
          <div className="col-xl-5 col-sm-12">
            <div className="text-right">
              <h4>
                {currency} {details?.deposit}
              </h4>
              {moreoptions ? (
                <Button
                  variant="text"
                  onClick={() => setmoreoptions(false)}
                  className="text-style-normal brown-color-btn plain-text-btn"
                >
                  <FormattedMessage id="pdp.lessOptions" />
                  <span className="material-icons-outlined">remove</span>
                </Button>
              ) : (
                <Button
                  variant="text"
                  onClick={() => setmoreoptions(true)}
                  className="text-style-normal brown-color-btn plain-text-btn"
                >
                  <FormattedMessage id="pdp.moreOptions" />
                  <span className="material-icons-outlined">add</span>
                </Button>
              )}
            </div>
          </div>
          <div className="col-sm-12">
            {moreoptions && (
              <div className="row pb-0">
                <div className="col-xl-6 col-lg-6 col-sm-12">
                  <p className="d-flex justify-content-between">
                    Percentage of Deposit <strong>{sliderValue}%</strong>
                  </p>
                </div>
                {getDetails(details).map((item, index) => (
                  <div
                    className="col-xl-6 col-lg-6 col-sm-12"
                    key={`amountDiposit-${index}`}
                  >
                    <p className="d-flex justify-content-between">
                      {item?.label} <strong>{item?.value}</strong>
                    </p>
                  </div>
                ))}
                <div className="col-sm-12">
                  <p className="f-12 mb-0">
                    Only available to UK residents over 18, subject to terms and
                    conditions.{" "}
                  </p>
                  <p className="f-12 mb-0">
                    To purchase on finance, simply add items to your bag and
                    select your Interest Free Credit options at the checkout.
                    Finance is subject to status. Terms and conditions apply.
                    About Eligibility Criteria.{" "}
                    <span class="color-bistre-brown cursorP">Read more</span>{" "}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DfFinance;
