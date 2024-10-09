import React from "react";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";

const AddToBagCard = ({
  variant,
  handleOnAddToBag,
  loader,
  priceData,
  currency,
  rowData,
  hideBtn = false
}) => {
  const isZeroPrice = !(rowData?.sellingprice || priceData?.price)
  return (
    <>
      <div className="add-to-bag">
        {
          isZeroPrice && (
            <p className="mt-3 mb-3">This product combinations  is not available  and needs special attention. Please call us on <Link href={"tel:020 7660 1529"} className="light-blue-link-color">020 7660 1529</Link> for further assistance.</p>
          )
        }
        <List component="ul">
          {priceData?.discountPercentage && (
            <ListItem>
              <ListItemText
                primary="Running off -10%"
                secondary={`-${currency}${priceData?.discountPercentage}`}
              />
            </ListItem>
          )}
          {
            !isZeroPrice && (
              <ListItem>
                <ListItemText
                  primary="Total"
                  className={!!priceData?.discountPrice ? "total" : 'total-without-discount'}
                  secondary={
                    <>
                      {priceData?.discountPrice && (
                        <span className="deleted-price">
                          {currency}
                          {priceData?.discountPrice}
                        </span>
                      )}
                      {currency}
                      {rowData?.sellingprice || priceData?.price}
                    </>
                  }
                />
              </ListItem>
            )
          }
        </List>
      </div>
      {variant !== "createyoudesign" && !hideBtn ? (
        <Button variant="contained" sx={{ opacity: isZeroPrice ? 0.6 : 1, pointerEvents: isZeroPrice ? "none" : "initial" }} onClick={handleOnAddToBag} disabled={isZeroPrice} fullWidth>
          {loader ? "LOADING..." : "Add to Bag"}
        </Button>
      ) : (
        ""
      )}
    </>
  );
};

export default AddToBagCard;
