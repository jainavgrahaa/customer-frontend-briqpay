/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { React } from "react";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { setCookie } from "cookies-next";
import { ORDER_ID } from "@/_utils/userToken";
import { Button } from "@mui/material";

const ProductCard = ({
  item,
  isChooseFilter,
  currency,
  dataToShow,
  isEditable = false,
  canRemove = false,
  canWishlist = false,
  setIsInsuranceRemoveModal = () => {},
  setConfrimModalData = () => {},
}) => {
  const router = useRouter();

  const productUrl = item?.product?.productUrl ?? "";
  const orderId = item?.orderId;
  const orderLineItemId = item?.orderLineItemPrice?.orderLineItemId;
  return (
    <div>
      <div className="row product-thumb row-lg product-thumb-lg">
        <div className="col-5 thumb-img thumb-img-lg">
          <img
            src={item?.media?.[0]?.url || "/assets/images/default-img.jpg"}
          />
          {canWishlist && (
            <Button variant="text" fullWidth className="mt-4">
              <span class="material-icons-outlined mr-5 light-gray-color-1">
                favorite_border
              </span>
              Add to Wishlist
            </Button>
          )}
        </div>
        <div
          className="col-7 detailed-product-desc"
          style={{
            gap: isChooseFilter ? "40px" : "8px",
          }}
        >
          <div className="basic-product-details">
            <div className="product-desc">
              <h5 className="thumb-clear">{item?.productData?.name}</h5>
              <div className="thumb-price">
                {item?.orderLineItemPrice?.price -
                  item?.orderLineItemPrice?.amount >
                  0 && (
                  <span className="old-price">
                    {currency} {item?.orderLineItemPrice?.price ?? 0}
                  </span>
                )}
                <span className="discounted-price">
                  {currency} {item?.orderLineItemPrice?.amount ?? 0}
                </span>
              </div>
              {dataToShow?.length > 0 && (
                <div className="discount-message">
                  <p>
                    {dataToShow?.[0]?.value}{" "}
                    <FormattedMessage id="common.applied" />
                  </p>
                </div>
              )}
            </div>
            {canRemove && (
              <div className="thumb-action-close cursorP">
                <p
                  onClick={() => {
                    setIsInsuranceRemoveModal(true);
                    setConfrimModalData(item);
                  }}
                >
                  <span className="material-icons-outlined icons-small">
                    close
                  </span>
                </p>
              </div>
            )}
            {isEditable && (
              <div className="thumb-action-close cursorP">
                <p
                  onClick={() => {
                    setCookie(ORDER_ID, orderId);
                    router.push({
                      pathname: productUrl,
                      query: { orderId, orderLineItemId },
                    });
                  }}
                >
                  <span className="material-icons-outlined icons-small">
                    edit
                  </span>
                </p>
              </div>
            )}
          </div>
          {item?.productData?.[0]?.variantOption?.[0]?.componentsList?.length >
            0 &&
            item?.productData?.[0]?.variantOption?.[0]?.metalsList?.length >
              0 && (
              <div className="more-product-details">
                <div className="product-desc">
                  {isChooseFilter && (
                    <h4 className="thumb-subtitle">
                      <FormattedMessage id="common.settings" />
                    </h4>
                  )}
                  {item?.productData?.[0]?.variantOption?.[0]?.componentsList
                    ?.length > 0 && (
                    <div className="material-section">
                      {item?.productData?.[0]?.variantOption?.[0]?.componentsList?.map(
                        (item1) => {
                          return (
                            item1?.componentProperty
                              ?.componentPropertyTranslates?.[0]?.name !==
                              "" && (
                              <div className="material-details">
                                <span className="material-label">
                                  {
                                    item1?.componentProperty
                                      ?.componentPropertyTranslates?.[0]?.name
                                  }
                                  :
                                </span>
                                <span className="material-value">
                                  {
                                    item1?.componentPropertyValues
                                      ?.componentPropertyValueTranslates?.[0]
                                      ?.value
                                  }
                                </span>
                              </div>
                            )
                          );
                        }
                      )}
                    </div>
                  )}
                  {item?.productData?.[0]?.variantOption?.[0]?.metalsList?.map(
                    (item1, index) => {
                      return (
                        <div className="material-section" key={index}>
                          <div className="material-details">
                            <span className="material-label">
                              <FormattedMessage id="common.metal" />
                            </span>
                            <span className="material-value">
                              {item1?.metal?.name}
                            </span>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
                {isChooseFilter && (
                  <div className="material-price">
                    <span>
                      {currency} {0}
                    </span>
                  </div>
                )}
              </div>
            )}
          {item?.productData?.[0]?.variantOption?.[0]?.stonesList?.length >
            0 && (
            <div className="more-product-details">
              <div className="product-desc">
                {item?.productData?.[0]?.variantOption?.[0]?.stonesList?.map(
                  (item1, index) => {
                    return (
                      item1?.stoneProperty?.stonePropertyTranslates &&
                      item1?.stoneProperty?.stonePropertyTranslates?.[0]?.name?.trim() !==
                        "" && (
                        <>
                          {index === 0 && isChooseFilter && (
                            <h4 className="thumb-subtitle">
                              <FormattedMessage id="common.stone" />
                            </h4>
                          )}
                          <div className="material-section">
                            <div className="material-details">
                              <span className="material-label">
                                {
                                  item1?.stoneProperty
                                    ?.stonePropertyTranslates?.[0]?.name
                                }
                                :
                              </span>
                              <span className="material-value">
                                {
                                  item1?.stonePropertyValues
                                    ?.stonePropertyValuesTranslates?.[0]?.value
                                }
                              </span>
                            </div>
                          </div>
                        </>
                      )
                    );
                  }
                )}
              </div>
              {isChooseFilter && (
                <div className="material-price">
                  <span>
                    {currency} {0}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
