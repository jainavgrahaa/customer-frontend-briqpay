import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Modal from "@/_components/modal";
import { checkIsFlag } from "@/_utils";
import { FormLabel } from "@mui/material";
import { FormattedMessage } from "react-intl";

const CustomProductFilter = ({
  title,
  icon,
  customData,
  setSelected,
  selected,
  titleLabel
}) => {
  const [isRinginfo, setIsRingInfo] = useState(false);
  const [id, setId] = useState("");
  const handleCloseModal = () => {
    setIsRingInfo(false);
  };

  const handleChange = (value) => {
    const val = value?.target?.value;
    setId(val);
    if (val !== " ") {
      setSelected((prevSelected) => {
        const updatedSelected = { ...prevSelected };
        if (updatedSelected.hasOwnProperty(title)) {
          updatedSelected[title] = val;
        }
        return updatedSelected;
      });
    }
  };

  const defaultData = customData?.filter((item) => item?.isDefault);

  return (
    <>
      <Box sx={{ minWidth: 50 }} style={{ paddingLeft: "9px" }}>
        <FormControl>
          <FormLabel
            sx={{ mb: "0px !important", }}
            id="demo-row-radio-buttons-group-label"
          >
            {titleLabel}{" "}
            {icon && (
              <a onClick={() => setIsRingInfo(true)} className="cursorP">
                <span className="material-icons-outlined">info</span>
              </a>
            )}
          </FormLabel>
          <Select
            variant="standard"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{ mt: 0,mb:2}}
            onChange={(event) => handleChange(event)}
            defaultValue={
              defaultData?.length > 0 && defaultData
                ? defaultData[0]?.featureOptionId
                : id || " "
            }
            label="Select"
          >
            <MenuItem sx={{ mt: 0 }} value=" ">
            <FormattedMessage id="common.select"/>
            </MenuItem>
            {customData.map((item, index) => (
              <MenuItem
                disabled={!checkIsFlag(item?.isActive)}
                key={item?.featureOptionId}
                value={item?.featureOptionId}
              >
                { item?.label || item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Modal
        isOpen={isRinginfo}
        onClose={handleCloseModal}
        onSubmit={handleCloseModal}
        okText="OK"
        title={titleLabel}
        className="sm-modal"
      >
        <div className="ring-form row">
          <div className="col-md-12">
            <p>
              <FormattedMessage id="common.loremsimplyText"/>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CustomProductFilter;
