import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Box,
  Pagination,
  Button,
} from "@mui/material";
import Modal from "../modal";
import ViewDiamondIno from "./modal-info-content/view-diamond-info";

const rowsPerPage = 5;

const getValue = (name, data) => {
  const r = data?.filter(
    (ele) => ele.property.name.toLowerCase() === name.toLowerCase()
  );
  return (
    r?.[0]?.stonePropertyValues?.stonePropertyValuesTranslates?.[0].value ||
    "NA"
  );
};

const formattedData = (diamondList) => {
  const fData = diamondList.map((ele) => {
    const stonePropertyValueMaps = ele.stonePropertyValueMaps;
    const output = {
      id: ele.id,
      carat: getValue("carat", stonePropertyValueMaps),
      clarity: getValue("clarity", stonePropertyValueMaps),
      colour: getValue("colour", stonePropertyValueMaps),
      cutGrade: getValue("cut", stonePropertyValueMaps),
      certificate: ele?.certificateCode,
      price: ele?.sellingPrice,
      shapeIcon: "/assets/icons/raw-svgs/round-shape.svg",
      name: ele?.stonePropertyValueMaps?.[0]?.stone?.name,
      referenceId: ele?.referenceId,
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
  return fData;
};

function CollapsibleRow({ row }) {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(false)

  const closeDiamondModal = () => {
    setModalData(false);
  };
  return (
    <>
      <TableRow>
        <TableCell>
          <img src={row.shapeIcon} alt="shape" />
        </TableCell>
        <TableCell>{row.carat}</TableCell>
        <TableCell>{row.clarity}</TableCell>
        <TableCell>{row.colour}</TableCell>
        <TableCell>{row.cutGrade}</TableCell>
        <TableCell>{row.certificate}</TableCell>
        <TableCell>{row.price}</TableCell>
        <TableCell>
          <span onClick={() => setOpen(!open)} className="cursorP">
            {open ? (
              <span className="material-icons-outlined text-icon">
                keyboard_arrow_up
              </span>
            ) : (
              <span className="material-icons-outlined text-icon">
                expand_more
              </span>
            )}
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="row pt-4 pb-4">
              <div className="col-xl-4 col-lg-4 col-sm-12">
                <img
                  src={row?.modalData?.certificateMedia?.diamondImageURL}
                  className="w-100"
                  alt="Diamond"
                />
                {/* <ImageWithFallback
                  width={32}
                  height={32}
                  style={{ borderRadius: "50%" }}
                  src={row?.modalData?.certificateMedia?.diamondImageURL || ""}
                  fallback={"/assets/images/default-img.jpg"}
                  alt="Diamond"
                /> */}
              </div>
              <div className="col-xl-8 col-lg-8 col-sm-12">
                <h4 className="mb-2">{row?.name}</h4>
                {row?.referenceId ? <p className="color-bistre-brown"># {row?.referenceId}</p> : ""}
                <div className="row">
                  {row?.expandableRowData?.[0]?.propValuePair?.map((t) => (
                    <div key={t} className="col-xl-6 col-lg-6 col-sm-12">
                      <p>
                        <strong>{t?.label}</strong> : {t?.value || "NA"}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-sm-12 mb-3">
                    <Button variant="contained" fullWidth>
                      Add to list{" "}
                    </Button>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-sm-12 mb-3">
                    <Button variant="outlined" fullWidth onClick={() => setModalData(row.modalData)}>
                      More info
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
      {modalData && (
        <Modal
          isOpen
          onClose={closeDiamondModal}
          onSubmit={closeDiamondModal}
          okText="OK"
          title={"Diamond Specifications"}
        >
         <ViewDiamondIno diamonModal={modalData} />
        </Modal>
      )}
    </>
  );
}

export default function DfPdpChooseDiamondTable({ diamondList }) {
  const [tableContent, setTableContent] = useState([]);
  const [page, setPage] = useState(1);
  const tableHeadings = [
    "Shape",
    "Carat",
    "Clarity",
    "Color",
    "Cut Grade",
    "Certificate",
    "Price",
  ];

  useEffect(() => {
    if (diamondList) {
      const res = formattedData(diamondList);
      setTableContent(res);
    }
  }, [diamondList]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <TableContainer className="df-bordered-table">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {tableHeadings.map((heading) => (
              <TableCell key={heading}>
                <strong>{heading}</strong>
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {tableContent
            .slice((page - 1) * rowsPerPage, page * rowsPerPage)
            .map((row, index) => (
              <CollapsibleRow key={index} row={row} />
            ))}
        </TableBody>
      </Table>
      <Box display="flex" justifyContent="end" padding={2}>
        <Pagination
          count={Math.ceil(tableContent.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </TableContainer>
  );
}
