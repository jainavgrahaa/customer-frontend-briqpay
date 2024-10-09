/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { chooseDiamondListViewTable } from "@/_utils/customApiData";
import { Button, Checkbox, FormControlLabel, Box, Pagination } from "@mui/material";
import TextTitle from '@/_components/atoms/TextTitle';

const ChooseDiamondListView = () => {
    // State to track expanded rows
    const [expandedRows, setExpandedRows] = useState([]);
    // State to manage current page
    const [page, setPage] = useState(1);
    const itemsPerPage = 5; // Define items per page

    // Function to toggle the expansion of a row
    const toggleRowExpansion = (id) => {
        if (expandedRows.includes(id)) {
            // Row is already expanded, so collapse it
            setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
        } else {
            // Row is not expanded, so expand it
            setExpandedRows([...expandedRows, id]);
        }
    };

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Calculate sliced data for the current page
    const startIndex = (page - 1) * itemsPerPage;
    const slicedData = chooseDiamondListViewTable.slice(startIndex, startIndex + itemsPerPage);

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
                                        <th>Shape</th>
                                        <th>Carat</th>
                                        <th>Clarity</th>
                                        <th>Colour</th>
                                        <th>Cut</th>
                                        <th>Price</th>
                                        <th>Compare</th>
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
                                                        <img src={item.shapeIcon} alt={item.shape} className="me-3" />
                                                    </span>
                                                    <span>{item.shape}</span>
                                                </td>
                                                <td>{item.carat}</td>
                                                <td>{item.clarity}</td>
                                                <td>{item.colour}</td>
                                                <td>{item.cut}</td>
                                                <td>{item.price}</td>
                                                <td>
                                                    <FormControlLabel
                                                        value=""
                                                        control={<Checkbox />}
                                                        labelPlacement="end"
                                                    />
                                                </td>
                                            </tr>
                                            {expandedRows.includes(item.id) && (
                                                <tr>
                                                    <td colSpan="8">
                                                        {item.expandableRowData && item.expandableRowData.map((expandableRow, expandableIndex) => (
                                                            <div key={expandableIndex} className="row mobile-table-accordian">
                                                                <div className="col-xl-2 col-lg-2 col-sm-12">
                                                                    <div className="product_img">
                                                                        <img src={expandableRow.imgUrl} alt="Image" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-8 col-lg-8 col-sm-12">
                                                                    <div className="product_cntnt">
                                                                        <TextTitle variant="h5" name={"Round Diamond 0.52 Carat"} className={"mb-2"} />
                                                                        <TextTitle variant="h5" name={expandableRow.price} />
                                                                        <div className="row">
                                                                            {expandableRow.propValuePair.map((singleRowDetails, singleRowIndex) => (
                                                                                <div key={singleRowIndex} className="product-information col-xl-3 col-lg-3 col-sm-12 mb-2">
                                                                                    {singleRowDetails.label} : <strong>{singleRowDetails.value}</strong>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-2 col-lg-2 col-sm-12">
                                                                    <div className="product-actions">
                                                                        <Button variant="filled" className="bordered-btn mb-3">Choose Diamond</Button>
                                                                        <Button variant="text" className="text-style-normal underlined-button">View diamond details</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "30px" }}>
                            <Pagination
                                count={Math.ceil(chooseDiamondListViewTable.length / itemsPerPage)}
                                page={page}
                                onChange={handleChangePage}
                            />
                        </Box>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChooseDiamondListView;
