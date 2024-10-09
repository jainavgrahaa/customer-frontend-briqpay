/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Grid, Pagination } from "@mui/material";
import TextTitle from "../atoms/TextTitle";
import { useSelector, useDispatch } from "react-redux";
import { updateQuickDelivery } from "@/_store/pdp.slice";

function Row(props) {
  const { row, setSelectedItemData, handleOnAddToBagQuickDelivery, currency } =
    props;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              setSelectedItemData(row);
            }}
          >
            {open ? (
              <span className="material-icons-outlined">keyboard_arrow_up</span>
            ) : (
              <span className="material-icons-outlined">
                keyboard_arrow_down
              </span>
            )}
          </IconButton>
        </TableCell>
        <TableCell>
          <img src={row?.[1]} alt="" />
        </TableCell>
        <TableCell align="right">
          <img src={row?.[2]} alt="" />
        </TableCell>
        <TableCell align="right">
          <img src={row?.[3]} alt="" />
        </TableCell>
        <TableCell align="right">{`${currency} ${row.price}`}</TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            className="table-cart-btn"
            onClick={() => {
              (async () => {
                setLoading(true);
                await handleOnAddToBagQuickDelivery(row?.id);
                setLoading(false);
              })();
            }}
          >
            {loading ? "LOADING..." : "Add to Bag"}
          </Button>
        </TableCell>
      </TableRow>
      {open && (
        <TableRow className="collapsed-content-block">
          <TableCell align="right" colSpan={12}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box className="product-list">
                      <Box
                        sx={{ display: "flex", marginBottom: "10px" }}
                        className="gap-10"
                      >
                        <div className="product-details-count">
                          <TextTitle name="Stone Type:" variant="body2" />
                          <TextTitle
                            name={row?.stoneType || "NA"}
                            variant="body2"
                          />
                        </div>
                        <div className="product-details-count">
                          <TextTitle name="Clarity:" variant="body2" />
                          <TextTitle
                            name={row?.Clarity || "NA"}
                            variant="body2"
                          />
                        </div>
                        <div className="product-details-count">
                          <TextTitle name="Colour:" variant="body2" />
                          <TextTitle
                            name={row?.Colour || "NA"}
                            variant="body2"
                          />
                        </div>
                        <div className="product-details-count">
                          <TextTitle name="Fluo:" variant="body2" />
                          <TextTitle
                            name={row?.Fluorescence || "NA"}
                            variant="body2"
                          />
                        </div>
                        <div className="product-details-count">
                          <TextTitle name="Tag No:" variant="body2" />
                          <TextTitle
                            name={row?.referenceId || "NA"}
                            variant="body2"
                          />
                        </div>
                        <div className="product-details-count">
                          <TextTitle name="Design Number:" variant="body2" />
                          <TextTitle
                            name={row?.collectioncode || "NA"}
                            variant="body2"
                          />
                        </div>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}

export default function CollapsibleTable({
  setSelectedItemData,
  handleOnAddToBagQuickDelivery,
  currency,
}) {
  const dispatch = useDispatch();
  const { quickDelivery } = useSelector((state) => state.pdp);
  const { loader, deliveryData, columns, page, totalRecords } =
    quickDelivery || {};
  const rowsPerPage = 5;

  useEffect(() => {
    dispatch(updateQuickDelivery({ page: page }));
  }, [page]);

  if (deliveryData === null || columns === null) return <div>Loading...</div>;

  if (deliveryData?.length === 0 || columns.length === 0)
    return <div>No Records Found</div>;

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    dispatch(updateQuickDelivery({ page: newPage }));
  };

  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((ele) => (
              <TableCell key={ele} align="center">
                {ele?.name}
              </TableCell>
            ))}
            <TableCell align="center">Price</TableCell>
            <TableCell align="center" className="add-to-bag-btn"></TableCell>
          </TableRow>
        </TableHead>
        {loader ? <div>Loading...</div> : null}
        {loader ? null : (
          <TableBody>
            {deliveryData.map((row) => (
              <Row
                key={row.id}
                row={row}
                setSelectedItemData={setSelectedItemData}
                handleOnAddToBagQuickDelivery={handleOnAddToBagQuickDelivery}
                currency={currency}
              />
            ))}
          </TableBody>
        )}
      </Table>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <Pagination
          count={Math.ceil(totalRecords / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </TableContainer>
  );
}
