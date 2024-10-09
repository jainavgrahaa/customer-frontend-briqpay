import React, { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextTitle from "@/_components/atoms/TextTitle";
import Head from "next/head";
import { FormattedMessage, useIntl } from "react-intl";
import ProductListBox from "@/_components/common/ProductListBox";
import { ProductListBoxData } from "@/_utils/customApiData";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { useSelector } from "react-redux";

const initialValues = {
  firstInput: "",
  secondInput: "",
  thirdInput: "",
};

const EngagmentRingCalculatorForm = ({
  setFormData,
  setMonthlySavings,
  setTotalBudget,
}) => {
  const intl = useIntl();

  const validationSchema = Yup.object().shape({
    firstInput: Yup.number()
      .typeError(intl.formatMessage({ id: "common.annualSalaryDigits" }))
      .required(intl.formatMessage({ id: "common.required" }))
      .positive(intl.formatMessage({ id: "common.valueGreaterThanZero" }))
      .moreThan(0, intl.formatMessage({ id: "common.valueGreaterThanZero" })),
    secondInput: Yup.number()
      .typeError(intl.formatMessage({ id: "common.expenseDigits" }))
      .required(intl.formatMessage({ id: "common.required" }))
      .positive(intl.formatMessage({ id: "common.valueGreaterThanZero" }))
      .moreThan(0, intl.formatMessage({ id: "common.valueGreaterThanZero" })),
    thirdInput: Yup.number()
      .typeError(intl.formatMessage({ id: "common.timeInMonthsDigits" }))
      .required(intl.formatMessage({ id: "common.required" }))
      .positive(intl.formatMessage({ id: "common.valueGreaterThanZero" }))
      .moreThan(0, intl.formatMessage({ id: "common.valueGreaterThanZero" })),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const annualSalary = values.firstInput;
    const monthlyExpense = values.secondInput;
    const monthsUntilProposal = values.thirdInput;

    const monthlySalary = annualSalary / 12;
    const monthlyBudget = monthlySalary - monthlyExpense;
    const totalBudget = monthlyBudget * monthsUntilProposal;

    setMonthlySavings(monthlyBudget);
    setTotalBudget(totalBudget);
    setFormData(values);
    setSubmitting(false);
  };

  return (
    <div className="mt-5 ring-calulator-form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form style={{ width: "100%", padding: "16px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <label className="mb-2">
                  <FormattedMessage id="dfcalculatorform.salary" />
                </label>
                <Field
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  name="firstInput"
                  type="number"
                  error={touched.firstInput && !!errors.firstInput}
                  helperText={<ErrorMessage name="firstInput" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label className="mb-2">
                  <FormattedMessage id="dfcalculatorform.finances" />
                </label>
                <Field
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  name="secondInput"
                  type="number"
                  error={touched.secondInput && !!errors.secondInput}
                  helperText={<ErrorMessage name="secondInput" />}
                />
              </Grid>
              <Grid item xs={12}>
                <label className="mb-2">
                  <FormattedMessage id="dfcalculatorform.propose" />
                </label>
                <Field
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  name="thirdInput"
                  type="number"
                  error={touched.thirdInput && !!errors.thirdInput}
                  helperText={<ErrorMessage name="thirdInput" />}
                />
              </Grid>
              <Grid item xs={12} align={"center"} className="mt-4">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  <FormattedMessage id="common.calculate" />
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const Details = ({
  formData,
  setFormData,
  monthlySavings,
  totalBudget,
  currency,
}) => {
  const [data, setData] = useState(null);
  const { navigationhierarchyid, translate } = useSelector(
    (state) => state.appconfig
  );
  const { getProducts } = useAuthHelper();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (navigationhierarchyid) {
          const res = await getProducts(navigationhierarchyid, translate);
          const formattedData = res?.collapsedData?.map((ele) => ({
            id: ele?.id,
            bestseller: ele?.bestsellerrank,
            url: "/assets/images/product-card-listings.png",
            label: ele?.name,
            alt: ele?.name,
            link: "#",
            favourite: 1,
            details: { price: `${currency} ${ele.price}` },
            heading: ele?.name,
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [navigationhierarchyid]);
  return (
    <div className="calculator-results-sec mt-5">
      <div className="calculater-result-header">
        <TextTitle
          name={"dfperfect.ring"}
          className={"text-center"}
          variant={"h1"}
        />
        <p className="text-center">
          <FormattedMessage id="calculatorResultHeader.monthlySavings" />{" "}
          <span style={{ color: "#DEB218" }}>£{monthlySavings.toFixed(2)}</span>{" "}
          <FormattedMessage id="calculatorResultHeader.perMonth" />
        </p>
        <p className="text-center">
          <FormattedMessage id="calculatorResultHeader.proposeIn" />{" "}
          <span style={{ color: "#DEB218" }}>{formData.thirdInput}</span>{" "}
          <FormattedMessage id="calculatorResultHeader.months" />{" "}
          <FormattedMessage id="calculatorResultHeader.totalBudget" />{" "}
          <span style={{ color: "#DEB218" }}>£{totalBudget.toFixed(2)}</span>{" "}
          <FormattedMessage id="calculatorResultHeader.available" />
        </p>
      </div>
      <div className="calculater-result-products mt-5">
        {data?.length ? (
          <TextTitle
            name={"dffavouriteProduct.list"}
            className={"text-center mb-5"}
            variant={"h2"}
          />
        ) : null}
        <ProductListBox
          data={data}
          layout={"col-lg-3 col-md-6 col-sm-6 col-6"}
        />
        <div className="text-center mt-5">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setFormData(initialValues)}
          >
            <FormattedMessage id="common.calculateAgain" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const EngagmentRingCalculator = ({ currency }) => {
  const [formData, setFormData] = useState(initialValues);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="/assets/css/df-engagement-ring-calculator.css"
        />
      </Head>
      {formData.firstInput ? (
        <Details
          formData={formData}
          monthlySavings={monthlySavings}
          totalBudget={totalBudget}
          setFormData={setFormData}
          currency={currency}
        />
      ) : (
        <EngagmentRingCalculatorForm
          setFormData={setFormData}
          setMonthlySavings={setMonthlySavings}
          setTotalBudget={setTotalBudget}
        />
      )}
    </>
  );
};

export default EngagmentRingCalculator;
