/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { React } from "react";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

const ProductThumb = ({
  imgUrl,
  imgLg,
  title,
  description,
  selectDropdown,
  labelCol,
  discount,
  onActionCloseClick,
  onImgClick,
  price,
  actionAdd,
  modalPrice,
  onActionAddClick,
  orderLineItemId,
  setIsJewelleryPlanModal,
  setConfrimModalData,
  setSelectedPlan,
  selectedPlan,
  setPlanData,
  setProductPlan,
  item,
  item1,
  index,
  currency,
  value,
  setValue,
  setPlan,
}) => {
  const handleChange = (event, test) => {
    setProductPlan(item);
    setValue(event.target.value);
    if (test === "Jewellery Care Plan") {
      setPlanData &&
        setPlanData({
          value: event.target.value,
          orderLineItemId,
          index,
          planName: test,
        });
      setIsJewelleryPlanModal(true);
    } else {
      setPlanData &&
        setPlanData({
          value: event.target.value,
          orderLineItemId,
          index,
          planName: test,
        });
      onImgClick();
    }
  };

  const handleOptionSelected = (_, it, planName) => {
    setSelectedPlan && Object.keys(selectedPlan).length
      ? setSelectedPlan({ ...selectedPlan, [item.id]: it })
      : setSelectedPlan({ [item.id]: it });
    setPlan && setPlan(planName);
  };

  const addClick = () => {
    onActionAddClick(value, orderLineItemId, index);
  };

  return (
    <div className="row product-thumb row-lg">
      <div className={"col-5 thumb-img " + (imgLg ? "thumb-img-lg" : "")}>
        <img src={imgUrl} />
      </div>
      <div className="col-7 detailed-product-desc">
        <div className="basic-product-details">
          <div className="product-desc">
            {title && !description && <h4>{title}</h4>}
            {!title && description && <h4>{description}</h4>}
            {description && <h4>{description[item?.id]?.split("-").at(0)}</h4>}
            {description?.[item?.id] && (
              <span className="thumb-price">
                {currency} {description?.[item?.id]?.split("-").at(-1)}
              </span>
            )}
            {price && (
              <span className="thumb-price">
                {currency} {price}
              </span>
            )}
            {description?.[item?.id] && (
              <p>{description?.[item?.id]?.split("-").at(1)}plan</p>
            )}
            {!description && title && <p>{title?.split("-").at(-1)}</p>}
            {typeof description === "string" && (
              <p>{description?.split("-").at(-1)}</p>
            )}
            {selectDropdown && !description?.[item?.id] && (
              <FormControl
                variant="standard"
                sx={{ minWidth: 140 }}
                className="custom-select-dropdown specific-width-dropdown"
              >
                <InputLabel>{selectDropdown.label}</InputLabel>
                <Select
                  label={selectDropdown.label}
                  value={value}
                  onChange={(event) => {
                    handleChange(event, selectDropdown?.label);
                  }}
                >
                  {selectDropdown?.values?.map((dropDownObj, index) => (
                    <MenuItem
                      value={dropDownObj?.value}
                      key={index}
                      onClick={(event) => {
                        handleOptionSelected(
                          event,
                          dropDownObj?.label,
                          selectDropdown?.label
                        );
                      }}
                    >
                      {dropDownObj?.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {discount && (
              <Link className="discount-message" href="#">
                <span className="material-icons-outlined icons-small">
                  <span className="material-symbols-outlined">redeem</span>
                </span>
                <span>{discount}</span>
              </Link>
            )}
          </div>
          {description && (
            <div className="thumb-action-close cursorP">
              <p
                onClick={() => {
                  item1 &&
                    setConfrimModalData &&
                    setConfrimModalData({ ...item1, modalPrice });
                  onActionCloseClick();
                }}
              >
                <span className="material-icons-outlined icons-small">
                  close
                </span>
              </p>
            </div>
          )}
          {actionAdd && (
            <div className="thumb-action-add cursorP">
              <Button
                onClick={addClick}
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                className="dark-blue-btn"
                size="large"
              >
                Add
              </Button>
            </div>
          )}
          {labelCol && (
            <div className="thumb-price thumb-price-col">
              <p>{labelCol}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductThumb;
