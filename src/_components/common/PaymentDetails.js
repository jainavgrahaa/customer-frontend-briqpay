import React, { useEffect, useState } from "react";
import Link from "next/link";
import SliderComponent from "./sliders/PaymentSlider";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { domainSelection, getStoreDetails } from "@/_utils";

var V12 = V12 ? V12 : {};

const depositArr = [10, 20, 30, 40, 50];

export const calculateApr = (loan, instalment, deferred, term) => {
  var result = parseFloat(0);
  var high = parseFloat(200);
  var low = parseFloat(0);
  var n, x, j, q, z, y, x;
  if (deferred > 1) {
    n = term + deferred + 1;
  } else {
    n = term + 1;
  }
  x = 1;
  while (x < 20) {
    result = (high + low) / 2;
    j = parseFloat(Math.pow(1.0 + result / 100.0, 1.0 / 12.0));
    q = parseFloat(1.0 / j);
    if (deferred < 1) {
      y = parseFloat(
        (instalment * (1.0 - Math.pow(q, n))) / (1 - q) - instalment
      );
      z = parseFloat(0.0);
    } else {
      y = parseFloat(
        (instalment * (1.0 - Math.pow(q, n - 1))) / (1 - q) - instalment
      );
      z = parseFloat(
        (instalment * (1.0 - Math.pow(q, deferred))) / (1 - q) - instalment
      );
    }
    if (y - z < loan) {
      high = result;
    } else {
      low = result;
    }
    x++;
  }
  return result;
};

export const XIRR = (values, dates, guess) => {
  var irrResult = function (values, dates, rate) {
    var r = rate + 1;
    var result = values[0];
    for (var i = 1; i < values.length; i++) {
      result +=
        values[i] /
        Math.pow(r, moment(dates[i]).diff(moment(dates[0]), "days") / 365);
    }
    return result;
  };

  const irrResultDeriv = (values, dates, rate) => {
    var r = rate + 1;
    var result = 0;
    for (var i = 1; i < values.length; i++) {
      var frac = moment(dates[i]).diff(moment(dates[0]), "days") / 365;
      result -= (frac * values[i]) / Math.pow(r, frac + 1);
    }
    return result;
  };
  var positive = false;
  var negative = false;
  for (var i = 0; i < values.length; i++) {
    if (values[i] > 0) positive = true;
    if (values[i] < 0) negative = true;
  }
  if (!positive || !negative) return "#NUM!";
  var guess = typeof guess === "undefined" ? 0.1 : guess;
  var resultRate = guess;
  var epsMax = 1e-10;
  var iterMax = 50;
  var newRate, epsRate, resultValue;
  var iteration = 0;
  var contLoop = true;
  do {
    resultValue = irrResult(values, dates, resultRate);
    newRate =
      resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
    epsRate = Math.abs(newRate - resultRate);
    resultRate = newRate;
    contLoop = epsRate > epsMax && Math.abs(resultValue) > epsMax;
  } while (contLoop && ++iteration < iterMax);
  if (contLoop) return "#NUM!";
  return resultRate;
};

export const calculateAprFromIrr = (
  loan,
  monthlyinstalment,
  loanTerm,
  documentfee,
  documentfeecollectionmonth
) => {
  var startDate = new Date();
  var incomeTable = [];
  var dateTable = [];
  var checkDate;
  var incomeObject = {
    cashFlows: 0,
    dataDate: 0,
  };
  var irr, irrPrev, presentValuePrev, pv;
  if (documentfeecollectionmonth == 0) {
    incomeTable.push(parseFloat(loan * -1) + documentfee);
  } else {
    incomeTable.push(parseFloat(loan * -1));
  }
  dateTable.push(startDate);
  for (var i = 1; i <= loanTerm; i++) {
    var nextDate = moment(startDate).add("M", i);
    dateTable.push(nextDate);
    if (i - 1 == documentfeecollectionmonth && documentfeecollectionmonth > 0) {
      incomeTable.push(parseFloat(monthlyinstalment + documentfee));
    } else {
      incomeTable.push(parseFloat(monthlyinstalment));
    }
  }
  var r = XIRR(incomeTable, dateTable, 0.1);
  return Math.round(r * 10000) / 100;
};

export const calculate = (financeProduct, cashPrice, deposit, currency) => {
  var APR = parseFloat(financeProduct.APR);
  var monthlyrate = parseFloat(financeProduct.MonthlyRate);
  var calculatedApr;
  var Months = parseFloat(financeProduct.Months);
  var ServiceFee = parseFloat(financeProduct.ServiceFee);
  var balancePayable = parseFloat(0.0);
  var documentFee = 0;
  cashPrice = parseFloat(cashPrice);
  deposit = parseFloat(deposit);
  var loanAmount = cashPrice - deposit;
  var initialPayments, finalPayment, balancePayable;
  balancePayable = loanAmount;
  documentFee =
    financeProduct.DocumentFee +
    loanAmount * financeProduct.DocumentFeePercentage;
  if (
    financeProduct.DocumentFeeMinimum > 0 &&
    documentFee < financeProduct.DocumentFeeMinimum
  ) {
    documentFee = financeProduct.DocumentFeeMinimum;
  }
  if (
    financeProduct.DocumentFeeMaximum > 0 &&
    documentFee > financeProduct.DocumentFeeMaximum
  ) {
    documentFee = financeProduct.DocumentFeeMaximum;
  }
  if (monthlyrate == 0) {
    initialPayments = Math.round((loanAmount / Months) * 100) / 100;
    if (initialPayments * Months < loanAmount) {
      initialPayments += 0.01;
    }
    finalPayment = loanAmount - initialPayments * (Months - 1);
    calculatedApr = 0;
  } else {
    var yieldd = Math.pow(APR / 100 + 1, 1.0 / 12);
    var pv = loanAmount - ServiceFee;
    if (financeProduct.DeferredPeriod > 1) {
      pv = pv * Math.pow(yieldd, financeProduct.DeferredPeriod - 1);
    }
    initialPayments =
      Math.ceil(
        (0 - pv / ((Math.pow(yieldd, 0 - Months) - 1) / (yieldd - 1))) * 100
      ) / 100;
    finalPayment = initialPayments;
    balancePayable = initialPayments * Months;
    calculatedApr = calculateApr(
      loanAmount - financeProduct.ServiceFee,
      initialPayments,
      financeProduct.DeferredPeriod,
      Months
    );
  }
  if (documentFee > 0) {
    calculatedApr = calculateAprFromIrr(
      loanAmount,
      initialPayments,
      Months,
      parseFloat(documentFee),
      parseFloat(financeProduct.DocumentFeeCollectionMonth)
    );
  }
  var interest = balancePayable - loanAmount;
  var chargeForCredit = interest + ServiceFee + documentFee;
  var amountPayable = balancePayable + ServiceFee + documentFee + deposit;
  var productAvailable = true;
  var availabilityReason = "";
  if (loanAmount < financeProduct.MinLoan) {
    productAvailable = false;
    availabilityReason =
      `Only available on loan amounts over ${currency}` +
      financeProduct.MinLoan.toFixed(2);
  } else if (loanAmount > financeProduct.MaxLoan) {
    productAvailable = false;
    availabilityReason =
      `Only available on loan amounts under ${currency}` +
      financeProduct.MaxLoan.toFixed(2);
  }
  var annualRate =
    ((interest / loanAmount) * 100) /
    ((Months + financeProduct.DeferredPeriod) / 12);
  var financeCalculation = {
    initialPayments: initialPayments.toFixed(2),
    finalPayment: finalPayment.toFixed(2),
    balancePayable: balancePayable.toFixed(2),
    interest: interest.toFixed(2),
    chargeForCredit: chargeForCredit.toFixed(2),
    amountPayable: amountPayable.toFixed(2),
    cashPrice: cashPrice.toFixed(2),
    deposit: deposit.toFixed(2),
    loanAmount: loanAmount.toFixed(2),
    Months: Months,
    monthsDeferred: financeProduct.DeferredPeriod,
    APR: calculatedApr.toFixed(2),
    productAvailable: productAvailable,
    availabilityReason: availabilityReason,
    ProductId: financeProduct.ProductId,
    ProductGuid: financeProduct.ProductGuid,
    Name: financeProduct.Name,
    SettlementFee: financeProduct.SettlementFee.toFixed(2),
    ServiceFee: ServiceFee.toFixed(2),
    documentFee: documentFee.toFixed(2),
    DocumentFeeMinimum: financeProduct.DocumentFeeMinimum,
    DocumentFeeMaximum: financeProduct.DocumentFeeMaximum,
    DocumentFeeCollectionMonth: financeProduct.DocumentFeeCollectionMonth,
    DocumentFeePercentage: financeProduct.DocumentFeePercentage,
    annualRate: annualRate.toFixed(2),
  };
  return financeCalculation;
};

const PaymentDetails = ({
  paymentId,
  orderSummary,
  storeId,
  orderDetails,
  currency,
}) => {
  const [financeProductOptions, setFinanceProductOptions] = useState([]);
  const [checked, setChecked] = useState(false);
  const [storeData, setStoreData] = useState();
  const [loading, setLoading] = useState(false);
  const [fetchRetailerLoading, setFetchRetailerLoading] = useState(true);
  const [calculatedRes, setCalculatedRes] = useState();
  const [sliderOptions, setSliderOptions] = useState([]);
  const [sliderValue, setSliderValue] = useState(6);
  const [depositPercentage, setDepositPercentage] = useState(10);
  const [details, setDetails] = useState({});
  const { getRetailerFinanceProducts, submitV12FinancePayment } =
    useAuthHelper();
  const router = useRouter();

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
    // setLoading(false);
  };

  useEffect(() => {
    fetchStoreData();
  }, []);

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
      label: ele.Months.toString(),
      value: ele.Months,
      name: ele,
    }));
  };

  const fetchRetailerFinanceProducts = async () => {
    const res = await getRetailerFinanceProducts(storeId, {
      retailerId: storeData?.v12RetailerId,
      retailerGuid: storeData?.v12RetailerGUID,
    });
    setSliderOptions(getFilteredFinanceProducts(res.FinanceProducts));
    setFinanceProductOptions(res.FinanceProducts);
    setFetchRetailerLoading(false);
  };

  useEffect(() => {
    if (storeData?.v12RetailerId) {
      setFetchRetailerLoading(true);
      fetchRetailerFinanceProducts();
    }
  }, [storeData]);

  const handlePlaceOrder = async () => {
    const payload = {
      storeId: storeId,
      orderId: orderDetails?.id,
      paymentId: paymentId,
      paymentMethodType: "V12 Finance",
      paymentData: {
        productGuid: calculatedRes.ProductGuid,
        productId: calculatedRes.ProductId,
        depositValue: calculatedRes.deposit,
      },
    };
    const res = await submitV12FinancePayment(payload);
    if (res.ApplicationFormUrl) {
      router.push(res.ApplicationFormUrl);
    } else {
      router.push(`/thankyou?orderId=${orderDetails?.id}`);
    }
  };

  useEffect(() => {
    if (
      financeProductOptions.length &&
      orderSummary?.Total &&
      depositPercentage
    ) {
      const res = calculate(
        getSelectedFinanceProduct(),
        orderDetails?.orderPrice?.amount || orderSummary?.Total,
        (+orderDetails?.orderPrice?.amount || +orderSummary?.Total) *
          (+depositPercentage / 100),
        currency
      );
      setCalculatedRes(res);
      setDetails(res);
    }
  }, [sliderValue, depositPercentage, financeProductOptions]);

  const getSelectedFinanceProduct = () =>
    sliderOptions.find((ele) => ele.value === sliderValue)?.name;

  // if (!financeProductOptions.length) return null;

  function valuetext(value) {
    return `${value}°C`;
  }

  return (
    <div className="payment-details-section">
      <div className="payment-card">
        {fetchRetailerLoading ? (
          "Loading..."
        ) : (
          <>
            <div className="payment-card-wrapper">
              <div className="payment-details-wrapper">
                <div className="payment-details-structure">
                  <div className="select-term-section">
                    <p className="deposit-amount-heading">
                      <FormattedMessage id="payment.selectTermDuration" />
                    </p>
                    <div className="current-selection">
                      <span className="current-selection-text">
                        <FormattedMessage id="payment.currentSelection" />
                      </span>
                      <span className="current-selection-price">
                        {getSelectedFinanceProduct()?.Name}&nbsp;
                        <FormattedMessage id="common.months" />
                      </span>
                    </div>
                  </div>
                  <div className="select-slider">
                    <SliderComponent
                      track={false}
                      aria-labelledby="track-false-slider"
                      getAriaValueText={valuetext}
                      min={6}
                      max={48}
                      defaultValue={6}
                      breakPoints={sliderOptions}
                      onChange={(e) => setSliderValue(e.target.value)}
                    />
                    <div className="dummy-box">
                      <div className="first-box"></div>
                      <div className="second-box"></div>
                      <div className="third-box"></div>
                    </div>
                    <div className="slider-text">
                      <span>
                        0% <FormattedMessage id="payment.APR" />
                      </span>
                      <span>
                        9.9% <FormattedMessage id="payment.APRrepresentative" />
                      </span>
                      <span>
                        15.9% <FormattedMessage id="payment.APR" />
                      </span>
                    </div>
                  </div>
                  <div className="deposit-amount-section">
                    <div className="deposit-amount">
                      <p className="deposit-amount-heading">Deposit Payment</p>
                      <div className="current-selection">
                        <span className="current-selection-text">
                          Current selection:
                        </span>
                        <span className="current-selection-price">
                          {details?.deposit}
                        </span>
                      </div>
                      <p className="deposit-amount-heading">
                        <FormattedMessage id="payment.depositPayment" />
                      </p>
                    </div>
                    <div className="deposit-amount-btns">
                      {depositArr.map((ele) => (
                        <button
                          key={ele}
                          className={`btn ${
                            ele === depositPercentage ? "active" : ""
                          }`}
                          onClick={() => setDepositPercentage(ele)}
                        >
                          {ele}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="payment-details-installments">
                  {details.monthlyInstalment && (
                    <div className="monthly-amount">
                      <div className="inner-installments">
                        <span className="installment-details">
                          Monthly Installment:
                        </span>
                        <span className="installment-price">
                          {details.monthlyInstalment}
                        </span>
                      </div>
                      <div className="inner-installments">
                        <span className="installment-details">
                          <FormattedMessage id="payment.loanRepayment" />
                        </span>
                        <span className="installment-price">
                          {depositPercentage} %
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="monthly-amount">
                    <div className="inner-installments">
                      <span className="installment-details">
                        Total Amount Payable:
                      </span>
                      <span className="installment-price">
                        {details?.amountPayable}
                      </span>
                    </div>
                    <div className="inner-installments">
                      <span className="installment-details">
                        <FormattedMessage id="payment.costOfLoan" />
                      </span>
                      <span className="installment-price">
                        {currency}
                        {details?.loanAmount}
                      </span>
                    </div>
                  </div>
                  <div className="monthly-amount">
                    <div className="inner-installments">
                      <span className="installment-details">
                        Total Amount Payable:
                      </span>
                      <span className="installment-price">
                        {currency}
                        {details?.amountPayable}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {paymentId && (
                <div className="payment-checkbox">
                  <FormControlLabel
                    Name="agreeTermsAndCondition"
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                      />
                    }
                    label={
                      <div className="checkbox-text">
                        <span>
                          <FormattedMessage id="common.agree" />
                        </span>
                        <Link href={"#"}>
                          <FormattedMessage id="offerTable.tandc" />
                        </Link>
                        <span> & </span>
                        <Link href={"#"}>
                          <FormattedMessage id="common.privacyPolicy" />
                        </Link>
                      </div>
                    }
                  />
                </div>
              )}
            </div>
            {paymentId && (
              <button
                className="payment-card-button"
                disabled={!checked}
                onClick={() => handlePlaceOrder()}
              >
                <span className="btn-text">
                  <FormattedMessage id="common.placeOrder" />
                </span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;
