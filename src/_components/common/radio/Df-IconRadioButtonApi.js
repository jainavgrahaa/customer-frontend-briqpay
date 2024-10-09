import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { checkIsFlag } from "@/_utils";
import Modal from "@/_components/modal";
import Shape from "@/_components/common/modal-info-content/shape";
import { Tooltip, Button } from '@mui/material';

const DFIconRadioButton = ({
  radioData,
  title = "",
  extraClass,
  setSelected,
  selected,
}) => {
  const [selectedName, setSelectedName] = useState("");
  const [modalOpen,setmodalOpen] = useState(false);
  const handleChange = (val, name) => {
    setSelectedName(name);
    setSelected((prevSelected) => {
      const updatedSelected = { ...prevSelected };
      if (updatedSelected.hasOwnProperty(title)) {
        updatedSelected[title] = val;
      }
      return updatedSelected;
    });
  };
  const handleCloseModal = () => {
    setmodalOpen(false);
  };
  return (
    <div className={`icon-radio-wrapper ${extraClass}`}>
      <FormControl>
          {title && (
            <FormLabel id="demo-row-radio-buttons-group-label" className="semi-bold color-black-2">
              <span className="material-icons-outlined cursorP f-16 mr-10" onClick={()=>setmodalOpen(true)}>info</span>
              {title}
            </FormLabel>
          )}
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {selectedName && (
              <span className="form-sublable">{selectedName}</span>
            )}
            {radioData.map(
              ({
                value,
                image,
                isDefault,
                featureOptionId,
                label = "",
                name,
                isActive,
              }) => {
                return (
                  <FormControlLabel
                    key={featureOptionId + value}
                    value={label || name}
                    control={
                      image ? (
                        <Tooltip title={label || name} arrow>
                        <Radio
                          sx={{ width: 35, height: 35 }}
                          defaultChecked={
                            selected[title] === featureOptionId ||
                            checkIsFlag(isDefault)
                          }
                          disabled={!checkIsFlag(isActive)}
                          onClick={() =>
                            handleChange(featureOptionId, label || name)
                          }
                          icon={<img src={image} alt={label || name} />}
                          checkedIcon={<img src={image} alt={label || name} />}
                        />
                        </Tooltip>
                      ) : (
                        <Tooltip title={label || name} arrow>
                        <Radio
                          disabled={!checkIsFlag(isActive)}
                          onClick={() => handleChange(featureOptionId, name)}
                        />
                        </Tooltip>
                      )
                    }
                  />
                );
              }
            )}
          </RadioGroup>
      </FormControl>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCloseModal}
        okText="OK"
        title={title}
        className="info-modal-content"
      >
        <>
          {typeof title === 'string' && title.toLowerCase() == "shapes" && (
            <Shape/>
          )}
        </>
      </Modal>
    </div>
  );
};

export default DFIconRadioButton;
