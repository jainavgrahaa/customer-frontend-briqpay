/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Pagination,
} from "@mui/material";
import TextTitle from "@/_components/atoms/TextTitle";
import Modal from "@/_components/modal";

import ViewDiamondIno from "./modal-info-content/view-diamond-info";
import { FormattedMessage } from "react-intl";
const CustomTableList = ({
  tableHeadings,
  compare,
  tableType,
  newTableContent,
}) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [tableContent, setTableContent] = useState([]);
  const [diamonModal, setdiamonModal] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const getValue = (name, data) => {
    const r = data?.filter(
      (ele) => ele.property.name.toLowerCase() === name.toLowerCase()
    );
    return (
      r?.[0]?.stonePropertyValues?.stonePropertyValuesTranslates?.[0].value ||
      "NA"
    );
  };

  const formattedData = () => {
    const fData = newTableContent.map((ele) => {
      const stonePropertyValueMaps = ele.stonePropertyValueMaps;
      const output = {
        id: ele.id,
        carat: getValue("carat", stonePropertyValueMaps),
        clarity: getValue("clarity", stonePropertyValueMaps),
        colour: getValue("colour", stonePropertyValueMaps),
        cut: getValue("cut", stonePropertyValueMaps),
        price: ele?.sellingPrice,
        shapeIcon: "/assets/icons/raw-svgs/round-shape.svg",
        expandableRowData: [
          {
            id: ele?.stonePropertyValueMaps?.id,
            propValuePair: [
              {
                label: "Code",
                value: ele?.certificateCode || "NA",
              },
              {
                label: "Pol",
                value: getValue("pol", stonePropertyValueMaps),
              },
              {
                label: "Cert",
                value: getValue("cert", stonePropertyValueMaps),
              },
              {
                label: "Symm",
                value: getValue("Symm", stonePropertyValueMaps),
              },
              {
                label: "Depth",
                value: getValue("Depth", stonePropertyValueMaps),
              },
              {
                label: "Fluo",
                value: getValue("Fluorescence", stonePropertyValueMaps),
              },
              {
                label: "Table",
                value: getValue("Table", stonePropertyValueMaps),
              },
              {
                label: "mm",
                value: getValue("Symmetry", stonePropertyValueMaps),
              },
              {
                label: "Cut:",
                value: getValue("Cut", stonePropertyValueMaps),
              },
            ],
          },
        ],
        modalData: {
          code: ele?.certificateCode,
          clarity: getValue("clarity", stonePropertyValueMaps),
          colour: getValue("colour", stonePropertyValueMaps),
          cut: getValue("cut", stonePropertyValueMaps),
          measurements: getValue("Symm", stonePropertyValueMaps),
          fluorescence: getValue("Fluorescence", stonePropertyValueMaps),
          symmetry: getValue("Symmetry", stonePropertyValueMaps),
          polish: getValue("Polish", stonePropertyValueMaps),
          shape: getValue("Shapes", stonePropertyValueMaps),
          weight: ele?.metalWeight || "NA",
          certificateMedia: ele.certificateMedia,
        },
      };
      return output;
    });
    setTableContent(fData);
  };

  useEffect(() => {
    if (newTableContent) {
      formattedData();
    }
  }, [newTableContent]);

  const toggleRowExpansion = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const slicedData = tableContent.slice(startIndex, startIndex + itemsPerPage);
  const handleDiamondModal = () => {
    setdiamonModal(true);
  };

  const closeDiamondModal = () => {
    setdiamonModal(false);
  };

  return (
    <>
      <div className="table-layout-listing">
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-condensed table-striped list-view-table">
                <thead>
                  <tr>
                    <th></th>
                    {tableHeadings &&
                      tableHeadings.map((value, index) => (
                        <React.Fragment key={index}>
                          <th>{value}</th>
                        </React.Fragment>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {slicedData.map((item) => (
                    <React.Fragment key={item.id}>
                      <tr>
                        <td onClick={() => toggleRowExpansion(item.id)}>
                          <span className="material-icons-outlined icons-small cursorP">
                            {expandedRows.includes(item.id)
                              ? "keyboard_arrow_up"
                              : "keyboard_arrow_down"}
                          </span>
                        </td>
                        <td>
                          <span>
                            <img
                              src={item.shapeIcon}
                              alt={item.shape}
                              className="me-3"
                            />
                          </span>
                          {item.shape && <span>{item.shape}</span>}
                        </td>
                        <td>{item.carat}</td>
                        <td>{item.clarity}</td>
                        <td>{item.colour}</td>
                        <td>{item.cut}</td>
                        <td>
                          <strong>{item.price}</strong>
                        </td>
                        {compare === true && (
                          <td>
                            <FormControlLabel
                              value=""
                              control={<Checkbox />}
                              labelPlacement="end"
                            />
                          </td>
                        )}
                      </tr>
                      {expandedRows.includes(item.id) && (
                        <tr>
                          <td colSpan="8">
                            {item.expandableRowData &&
                              item.expandableRowData.map(
                                (expandableRow, expandableIndex) => (
                                  <div
                                    key={expandableIndex}
                                    className="row mobile-table-accordian margin-0"
                                  >
                                    {expandableRow.imgUrl && (
                                      <div className="col-xl-2 col-lg-2 col-sm-12">
                                        <div className="product_img">
                                          <img
                                            src={expandableRow.imgUrl}
                                            alt="Image"
                                          />
                                        </div>
                                      </div>
                                    )}
                                    <div
                                      className={`${
                                        tableType === "ChooseSpecificDiamond"
                                          ? "col-sm-12"
                                          : ""
                                      } ${
                                        tableType === "CreateDimond"
                                          ? "col-xl-8 col-lg-8 col-sm-12"
                                          : ""
                                      }`}
                                    >
                                      <div className="product_cntnt">
                                        {expandableRow.title && (
                                          <TextTitle
                                            variant="h5"
                                            name={expandableRow.title}
                                            className={"mb-2"}
                                          />
                                        )}
                                        {expandableRow.price && (
                                          <TextTitle
                                            variant="h5"
                                            name={expandableRow.price}
                                          />
                                        )}
                                        <div className="row">
                                          {expandableRow.propValuePair.map(
                                            (
                                              singleRowDetails,
                                              singleRowIndex
                                            ) => (
                                              <div
                                                key={singleRowIndex}
                                                className={`product-information ${
                                                  tableType ===
                                                  "ChooseSpecificDiamond"
                                                    ? "col-lg-6 col-sm-12 mb-2"
                                                    : ""
                                                } ${
                                                  tableType === "CreateDimond"
                                                    ? "col-xl-3 col-lg-3 col-sm-12 mb-2"
                                                    : ""
                                                }`}
                                              >
                                                {singleRowDetails.label} :{" "}
                                                <strong>
                                                  {singleRowDetails.value}
                                                </strong>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className={`${
                                        tableType === "ChooseSpecificDiamond"
                                          ? "col-sm-12"
                                          : ""
                                      } ${
                                        tableType === "CreateDimond"
                                          ? "col-xl-2 col-lg-2 col-sm-12"
                                          : ""
                                      }`}
                                    >
                                      <div
                                        className={`product-actions ${
                                          tableType === "ChooseSpecificDiamond"
                                            ? "text-center"
                                            : ""
                                        }`}
                                      >
                                        {tableType === "CreateDimond" && (
                                          <Button
                                            variant="filled"
                                            className="bordered-btn mb-3"
                                          >
                                            Choose Diamond
                                          </Button>
                                        )}
                                        <Button
                                          variant="text"
                                          className="text-style-normal underlined-button"
                                          onClick={() =>
                                            setdiamonModal(item.modalData)
                                          }
                                        >
                                          <FormattedMessage id="common.viewDiamondDetails" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                marginBottom: "30px",
              }}
            >
              <Pagination
                count={Math.ceil(tableContent.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
              />
            </Box>
          </div>
        </div>
      </div>
      {diamonModal && (
        <Modal
          isOpen={handleDiamondModal}
          onClose={closeDiamondModal}
          onSubmit={closeDiamondModal}
          okText="OK"
          title={"Diamond Specifications"}
        >
         <ViewDiamondIno diamonModal={diamonModal} />
        </Modal>
      )}
    </>
  );
};

export default CustomTableList;
