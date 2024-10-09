import useAuthHelper from "@/_hooks/useAuthHelper";
import { Button, Slider, Checkbox, FormControlLabel } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import PaymentDetails from "./PaymentDetails";
// import PaymentDetails from "./PaymentDetails";

var V12 = V12 ? V12 : {};

const calculateApr = (loan, instalment, deferred, term) => {
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

const XIRR = (values, dates, guess) => {
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

const calculateAprFromIrr = (
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

const calculate = (financeProduct, cashPrice, deposit) => {
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
      "Only available on loan amounts over £" +
      financeProduct.MinLoan.toFixed(2);
  } else if (loanAmount > financeProduct.MaxLoan) {
    productAvailable = false;
    availabilityReason =
      "Only available on loan amounts under £" +
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

const V12FinanceContainer = ({
  paymentId,
  orderSummary,
  storeId,
  storeData,
  orderDetails,
}) => {
  const [financeProductOptions, setFinanceProductOptions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [productDetails, setProductDetails] = useState();
  const [calculatedRes, setCalculatedRes] = useState();
  const [sliderValue, setSliderValue] = useState(15);
  const { getRetailerFinanceProducts, submitV12FinancePayment } =
    useAuthHelper();
  const router = useRouter();

  const getProductOptions = (obj) => [
    {
      id: 1,
      Name: "Product Name",
      value: obj?.Name,
    },
    {
      id: 2,
      Name: "Value Of Goods",
      value: orderSummary.Total,
    },
    {
      id: 3,
      Name: "Percentage of Deposit",
      value: `${sliderValue} %`,
    },
    {
      id: 4,
      Name: "Amount of Deposit",
      value: `${obj.deposit}`,
    },
    {
      id: 5,
      Name: "Amount of Loan",
      value: `${obj.loanAmount}`,
    },
    // {
    //   id: 6,
    //   Name: "Terms of Agreement",
    //   value: "390",
    // },
    {
      id: 7,
      Name: "APR",
      value: obj?.APR,
    },
    {
      id: 8,
      Name: "Annual Rate of Interest",
      value: obj?.annualRate,
    },
    // {
    //   id: 9,
    //   Name: "Monthly Installment",
    //   value: "390",
    // },
    // {
    //   id: 10,
    //   Name: "Loan Repayment",
    //   value: "390",
    // },
    {
      id: 11,
      Name: "Total Amount Payable",
      value: obj?.amountPayable,
    },
    // {
    //   id: 12,
    //   Name: "Cost of Loan (Interest)",
    //   value: "390",
    // },
  ];

  const fetchRetailerFinanceProducts = async () => {
    const res = await getRetailerFinanceProducts(storeId, {
      retailerId: storeData?.v12RetailerId,
      retailerGuid: storeData?.v12RetailerGUID,
    });
    setFinanceProductOptions(res.FinanceProducts);
  };

  useEffect(() => {
    fetchRetailerFinanceProducts();
  }, []);

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

  const handleOnSelectProductType = (e) => {
    setSelectedIndex(e.target.value);
  };

  useEffect(() => {
    if (
      financeProductOptions[selectedIndex] &&
      orderSummary.Total &&
      sliderValue
    ) {
      const res = calculate(
        financeProductOptions[selectedIndex],
        orderDetails?.orderPrice?.amount,
        +orderDetails?.orderPrice?.amount * (+sliderValue / 100)
      );
      setCalculatedRes(res);
      const temp = getProductOptions(res);
      setProductDetails(temp);
    }
  }, [sliderValue, selectedIndex, financeProductOptions]);

  if (!financeProductOptions.length) return null;
  return (
      // <div className="finanace-section">
      //   <div style={{ display: "flex", justifyContent: "center" }}>
      //     <h6 style={{ fontWeight: 600 }}>
      //       Step 1: Choose your finanace product
      //     </h6>
      //   </div>
      //   <div
      //     style={{
      //       display: "flex",
      //       justifyContent: "center",
      //       paddingTop: "10px",
      //     }}
      //   >
      //     <select
      //       Name={"financeProduct"}
      //       onChange={(e) => handleOnSelectProductType(e)}
      //     >
      //       {financeProductOptions.map((ele, index) => (
      //         <option key={ele.ProductId} value={index}>
      //           {ele.Name}
      //         </option>
      //       ))}
      //     </select>
      //   </div>
      //   <div
      //     style={{
      //       display: "flex",
      //       marginTop: "20px",
      //       justifyContent: "center",
      //     }}
      //   >
      //     <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
      //       <h6>Step 2: Deposite Percentage</h6>
      //     </div>
      //   </div>
      //   {/* <div style={{ borderBottom: "3px solid grey", margin: "41px" }}> */}
      //   <Slider
      //     size="small"
      //     defaultValue={sliderValue}
      //     aria-label="Small"
      //     valueLabelDisplay="auto"
      //     onChange={(e) => setSliderValue(e.target.value)}
      //   />
      //   {/* </div> */}
      //   <div style={{ margin: "41px" }}>
      //     {productDetails?.map((item, index) => {
      //       return (
      //         <>
      //           <div
      //             style={{
      //               display: "flex",
      //               justifyContent: "space-between",
      //               paddingBottom: "15px",
      //               fontSize: "14px",
      //               fontWeight: 600,
      //             }}
      //           >
      //             <div>{item?.Name}</div>
      //             <div>{item?.value}</div>
      //           </div>
      //           {/* <div
      //             style={{
      //               display: "flex",
      //               justifyContent: "space-between",
      //             }}
      //           >
      //             <div>Produc tName</div>
      //             <div>Interest Free Finance (6 Months)</div>
      //           </div> */}
      //         </>
      //       );
      //     })}
      //     <div>
      //       <FormControlLabel
      //         Name="agreeTermsAndCondition"
      //         control={
      //           <Checkbox
      //             checked={checked}
      //             onChange={() => setChecked(!checked)}
      //           />
      //         }
      //         label={
      //           <FormattedMessage
      //             sx={{ fontSize: "8px" }}
      //             id="I agree to the Terms and Conditions, Privacy Policy and 30 Days Return Policy"
      //           />
      //         }
      //       />
      //     </div>
      //     <Button
      //       variant="contained"
      //       sx={{ background: "#008a0a", mt: 3 }}
      //       fullWidth
      //       disabled={!checked}
      //       onClick={() => handlePlaceOrder()}
      //     >
      //       PLACE ORDER
      //     </Button>
      //   </div>
      // </div>
      <PaymentDetails
        paymentId={paymentId}
        orderSummary={orderSummary}
        storeId={storeId}
        orderDetails={orderDetails}
      />
  );
};

export default V12FinanceContainer;
