import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { FormattedMessage } from "react-intl";
import { cartDetails, showHeaderCartModal } from "@/_store/cart.slice";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { TextField } from "@mui/material";
import { createAlert } from "@/_store/alert.slice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import TextTitle from '@/_components/atoms/TextTitle';
import { Button } from '@mui/material'

const initialGiftingDetails = {
  recepientEmail: "",
  recepientName: "",
  purchaserEmail: "",
  purchaserName: "",
  message: "",
  amount: "",
  state: true,
  startDate: "",
};

function DfGift({ currency, storeId, translateId }) {
  const router = useRouter();
  const { userDetails } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [giftAddons, setGiftAddons] = useState([]);
  const [defaultGiftAmount, setDefaultGiftAmount] = useState(500);
  const [selectGiftAddon, setSelectGiftAddon] = useState({
    price: 0,
    id: "",
  });
  const [addingDefaultGiftAmount, setAddingDefaultGiftAmount] = useState(false);
  const {
    gifting,
    giftingProductAddons,
    addProductToCart,
    addGiftingOtherAmountAddon,
  } = useAuthHelper();

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialGiftingDetails,
      enableReinitialize: true,
      validationSchema: yup.object().shape({
        recepientEmail: yup
          .string()
          .email()
          .required(<FormattedMessage id="gift.recepientEmailReq" />),
        recepientName: yup
          .string()
          .required(<FormattedMessage id="gift.recepientNameReq" />),
        purchaserEmail: yup
          .string()
          .email()
          .required(<FormattedMessage id="gift.EmailReq" />),
        purchaserName: yup
          .string()
          .required(<FormattedMessage id="gift.NameReq" />),
        message: yup
          .string()
          .required(<FormattedMessage id="gift.messageReq" />),
      }),
      onSubmit: async (formValues, { resetForm }) => {
        if (
          !addingDefaultGiftAmount &&
          defaultGiftAmount === 0 &&
          formValues.amount === ""
        ) {
          dispatch(
            createAlert({
              alertType: "warning",
              msg: <FormattedMessage id="gift.otherAmountError" />,
            })
          );
          return;
        }

        if (defaultGiftAmount > 0 && !addingDefaultGiftAmount) {
          giftAddToCart(formValues, resetForm);
        } else {
          const payloadOtherAmoundAddon = {
            addonTypeId: giftAddons[0].addonTypeId,
            sellingPrice: +formValues.amount,
          };

          await addGiftingOtherAmountAddon(payloadOtherAmoundAddon).then(
            async (data) => {
              if (data) {
                giftAddToCart(formValues, resetForm, data);
              }
            }
          );
        }
      },
    });

  const giftAddToCart = async (formValues, resetForm, customGiftVocher) => {
    const productId =
      defaultGiftAmount > 0 ? selectGiftAddon.id : customGiftVocher.id;
    const productAddon = {
      items: {
        group: {
          addonIds: [productId],
        },
      },
    };
    await addProductToCart(productAddon)
      .then(async (data) => {
        dispatch(showHeaderCartModal(true));
        dispatch(cartDetails(data?.data));
        const orderLineItem = data?.data?.orderLineItems.find(
          (item) => item.productId === productId
        );
        formValues["startDate"] = new Date().toISOString();
        formValues["storeId"] = storeId;
        formValues["purchasedByCustomerId"] = userDetails?.id;
        formValues["amount"] =
          defaultGiftAmount > 0 ? defaultGiftAmount : +formValues.amount;
        formValues["orderLineItemId"] = orderLineItem.id;
        await gifting(formValues).then(async () => {
          dispatch(
            createAlert({
              alertType: "success",
              msg: <FormattedMessage id="gift.addToCartSuccess" />,
            })
          );
          resetForm();
          setDefaultGiftAmount(500);
        });
      })
      .catch((error) => {
        dispatch(createAlert({ alertType: "error", msg: error?.message }));
      });
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    const giftCardAddons = await giftingProductAddons(translateId);
    if (giftCardAddons) {
      setGiftAddons(giftCardAddons[1].addonProducts);
      const findDefaultAddonProducts = giftCardAddons[1].addonProducts.find(
        (item) => parseFloat(item.sellingPrice) == 500
      );
      setSelectGiftAddon({
        price: findDefaultAddonProducts.sellingPrice,
        id: findDefaultAddonProducts.id,
      });
    } else {
      fetchCartData();
    }
  };

  const onClickDefaultGiftAmount = (amount) => {
    setAddingDefaultGiftAmount(!addingDefaultGiftAmount);
    setDefaultGiftAmount(parseFloat(amount.sellingPrice));
    setSelectGiftAddon({ price: amount.sellingPrice, id: amount.id });
  };

  const handleOtherAmount = (event) => {
    setAddingDefaultGiftAmount(false);
    setDefaultGiftAmount(0);
    handleChange(event);
  };

  const handleChangeOtherAmount = (event) => {
    handleChange(event);
  };
  const handleBlurOtherAmount = (event) => {
    handleBlur(event)
  };


  return (
    <main className="df-gift-container">
      <section className="gift-card-container">
        <TextTitle variant="h3" name={"gift.heading"}/>
        <div className="gift-card-inner-container">
          <div className="gift-card-digital">
            <TextTitle variant="h3" name={"gift.digital"} className={"color-bistre-brown"}/>
            <TextTitle variant="p" name={"gift.emailInfo"} className={"text-center"}/>
            <Button variant="contained"><FormattedMessage id="common.select" /></Button>
          </div>
          <div className="gift-card-physical">
            <TextTitle variant="h3" name={"common.physical"} className={"color-bistre-brown"}/>
            <TextTitle variant="p" name={"gift.decorativeInfo"} className={"text-center"}/>
            <Button variant="outlined" className={`light-outlined-border`}><FormattedMessage id="common.comingSoon" /></Button>
          </div>
        </div>
      </section>

      <section className="gift-amount-container ">
        <TextTitle variant="h3" name={"gift.giftCardAmount"}/>
        <div className="gift-amount-group-btn ">
          {giftAddons &&
            giftAddons.length > 0 &&
            giftAddons.map((amount, index) => (
              <div key={index} className="gift-amount-btn-box">
                {defaultGiftAmount === parseFloat(amount.sellingPrice) ? (
                   <Button variant="outlined" className={`light-outlined-border active`}> {currency}{parseFloat(amount.sellingPrice)}</Button>
                ) : (
                   <Button variant="outlined" onClick={() => onClickDefaultGiftAmount(amount)} className={`light-outlined-border`}> {currency} {parseFloat(amount.sellingPrice)}</Button>
                )}
              </div>
            ))}
        </div>
        <div className="gift-input-container">
          <TextField
            fullWidth
            label={<FormattedMessage id="gift.amount" />}
            name="amount"
            onChange={handleChangeOtherAmount}
            onBlur={handleBlurOtherAmount}
            variant="standard"
            autoComplete="off"
            value={values.amount}
            onClick={handleOtherAmount}
            error={Boolean(touched.amount && errors.amount)}
            helperText={touched.amount && errors.amount}
          />
        </div>
      </section>
      <form onSubmit={handleSubmit}>
        <section className="gift-personal-container mb-5">
          <TextTitle variant="h3" name={"gift.makeItPersonal"}/>
          <div className="gift-form-container">
            <div className="gift-input-box">
              <TextField
                fullWidth
                label={<FormattedMessage id="gift.recepientEmail" />}
                name="recepientEmail"
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                autoComplete="off"
                value={values.recepientEmail}
                error={Boolean(touched.recepientEmail && errors.recepientEmail)}
                helperText={touched.recepientEmail && errors.recepientEmail}
              />

              <TextField
                fullWidth
                label={<FormattedMessage id="gift.recepientName" />}
                name="recepientName"
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                autoComplete="off"
                value={values.recepientName}
                error={Boolean(touched.recepientName && errors.recepientName)}
                helperText={touched.recepientName && errors.recepientName}
              />
            </div>
            <div className="gift-input-box">
              <TextField
                fullWidth
                label={<FormattedMessage id="gift.Email" />}
                name="purchaserEmail"
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                autoComplete="off"
                value={values.purchaserEmail}
                error={Boolean(touched.purchaserEmail && errors.purchaserEmail)}
                helperText={touched.purchaserEmail && errors.purchaserEmail}
              />

              <TextField
                fullWidth
                label={<FormattedMessage id="gift.Name" />}
                name="purchaserName"
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                autoComplete="off"
                value={values.purchaserName}
                error={Boolean(touched.purchaserName && errors.purchaserName)}
                helperText={touched.purchaserName && errors.purchaserName}
              />
            </div>
          </div>
          <div className="gift-textarea">
            <TextTitle variant="p" name={"gift.message"} className={"mb-0 color-bistre-brown"}/>
            <TextField
              fullWidth
              label={<FormattedMessage id="gift.typeHere" />}
              name="message"
              variant="standard"
              value={values?.message}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.message && errors.message}
              helperText={touched.message ? errors.message : ""}
            />
            <TextTitle variant="p" name={"common.compulsaryFields"} className={"mt-4"}/>
            <TextTitle variant="p" name={"gift.giftCardInfo"} className={"mb-0"}/>
          </div>
          <div>
            <Button variant="contained" type="submit"><FormattedMessage id="gift.addToCard" /></Button>
          </div>
        </section>
      </form>
    </main>
  );
}

export default DfGift;
