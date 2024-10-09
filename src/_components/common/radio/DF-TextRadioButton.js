/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { checkIsFlag } from "@/_utils";
import Modal from "@/_components/modal";
import Metal from "@/_components/common/modal-info-content/Metal";
import RingSize from "@/_components/common/modal-info-content/Ring-Size";
import Stone from "@/_components/common/modal-info-content/stone";
import Colour from "@/_components/common/modal-info-content/colour";
import Certificate from "@/_components/common/modal-info-content/certificate";
import CutGrade from "@/_components/common/modal-info-content/cut-grade";
import Polish from "@/_components/common/modal-info-content/polish";
import Fluorescence from "@/_components/common/modal-info-content/Fluorescence";
import LabCreatedDiamond from "@/_components/common/modal-info-content/Lab-created-diamonds";
import Clarity from "@/_components/common/modal-info-content/clarity";
import Symmetry from "@/_components/common/modal-info-content/symmetry";

const DFTextRadioButton = ({ radioData, title, icon, extraClass,setSelected,selected}) => {
  const [modalOpen,setmodalOpen] = useState(false);
  const handleCloseModal = () => {
    setmodalOpen(false);
  };
  const handleChange = (val) => {
    setSelected && setSelected((prevSelected) => {
      const updatedSelected = { ...prevSelected };
      if (updatedSelected.hasOwnProperty(title)) {
        updatedSelected[title] = val;
      }
      return updatedSelected;
    });
  };
  return (
    <>
    <div className={`df-text-radio-wrap ${extraClass}`}>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label" className="semi-bold color-black-2">
          <span className="material-icons-outlined cursorP f-16 mr-10" onClick={()=>setmodalOpen(true)}>info</span>
          {title}
        </FormLabel>
        <List component="div" className="text-radio-list">
          {radioData.map(
            ({
              id,
              featureOptionId,
              sequence,
              value,
              label,
              radioIcon,
              name,
              isDefault,
              isActive
            }) => {
              return (
                <ListItemButton
                  key={`${featureOptionId + value}`}
                  disabled={!checkIsFlag(isActive)}
                  onClick={() => handleChange(featureOptionId,name)}
                  className={`${
                    selected && selected[title]===featureOptionId  || checkIsFlag(isDefault) ? "selected" : ""
                  }`}
                >
                  <ListItem>
                    {radioIcon && (
                      <img src={`/assets/icons/raw-svgs/${radioIcon}`} />
                    )}
                    <ListItemText primary={name} />
                  </ListItem>
                </ListItemButton>
              );
            }
          )}
        </List>
      </FormControl>
    </div>
          <Modal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          onSubmit={handleCloseModal}
          okText="OK"
          title={title}
          className="info-modal-content"
        >
          <>
            {typeof title === 'string' && title.toLowerCase() == "metal" && (
              <Metal />
            )}
            {typeof title === 'string' && title.toLowerCase() == "ringsize" && (
              <RingSize />
            )}
            {typeof title === 'string' && title.toLowerCase() == "stones" && (
            <Stone/>
            )}
            {typeof title === 'string' && title.toLowerCase() == "colour" && (
              <Colour />
            )}
            {typeof title === 'string' && title.toLowerCase() == "certificate" && (
              <Certificate />
            )}
            {typeof title === 'string' && title.toLowerCase() == "cut grade" && (
              <CutGrade />
            )}
            {typeof title === 'string' && title.toLowerCase() == "polish" && (
              <Polish />
            )}
            {typeof title === 'string' && title.toLowerCase() == "fluorescence" && (
              <Fluorescence />
            )}
            {typeof title === 'string' && title.toLowerCase() == "lab created diamonds" && (
              <LabCreatedDiamond />
            )}
            {typeof title === 'string' && title.toLowerCase() == "clarity" && (
              <Clarity />
            )}
            {typeof title === 'string' && title.toLowerCase() == "shape" && (
              <Shape />
            )}
            {typeof title === 'string' && title.toLowerCase() == "symmetry" && (
              <Symmetry />
            )}
          </>
        </Modal>
        </>
  );
};

export default DFTextRadioButton;
