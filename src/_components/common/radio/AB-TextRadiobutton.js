/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Modal from "@/_components/modal";
import { checkIsFlag } from "@/_utils";
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
import Shape from "@/_components/common/modal-info-content/shape";
import Symmetry from "@/_components/common/modal-info-content/symmetry";
import Gemstonequality from "@/_components/common/modal-info-content/gemstone-quality";
import YellowDiamondIntensity from "@/_components/common/modal-info-content/yellow-diamond-intensity";
import ChainNecklace from "@/_components/common/modal-info-content/chain-necklace";
import { Tooltip, Button, Typography, Box } from "@mui/material";
const ABTextRadioButton = ({
  radioData,
  defaultFeatureOptions,
  title,
  icon,
  extraClass,
  setSelected,
  selected,
  titleLabel,
}) => {
  const [isRinginfo, setIsRingInfo] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [defaultOptionName, setDefaultOptionName] = useState("");
  const [defaultOptionId, setDefaultOptionId] = useState("");

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
    setIsRingInfo(false);
  };
  useEffect(() => {
    if (radioData) {
      const defaultOption = radioData?.find((item) =>
        defaultFeatureOptions?.includes(item?.featureOptionId)
      );
      setDefaultOptionId(defaultOption?.featureOptionId);
      setDefaultOptionName(defaultOption?.name);
    }
  }, [radioData]);
  return (
    <div
      className={`text-radio-wrap ${extraClass}`}
      style={{ paddingLeft: "10px" }}
    >
      <FormControl>
        <FormLabel
          id="demo-row-radio-buttons-group-label"
          sx={{ textTransform: "capitalize" }}
        >
          {titleLabel || title}
          {icon && (
            <Tooltip
              title={
                <Box p={2}>
                  <Typography variant="body2" color="inherit">
                    This is a custom tooltip with more detailed information.
                  </Typography>
                  <Button variant="text" onClick={() => setIsRingInfo(true)}>
                    Lear More{" "}
                    <span class="material-icons-outlined">chevron_right</span>
                  </Button>
                </Box>
              }
            >
              <span
                className="material-icons-outlined cursorP"
                onClick={() => setIsRingInfo(true)}
              >
                info
              </span>
            </Tooltip>
          )}
          <Typography variant="body2" className="mt-0 mb-0 ml-10">
            {selectedName || defaultOptionName}
          </Typography>
        </FormLabel>
        <List component="div" className="text-radio-list">
          {radioData?.map(
            ({
              name = "",
              isActive,
              featureOptionId,
              isDefault,
              radioIcon,
              label,
            }) => {
              return (
                <ListItemButton
                  key={`${featureOptionId + name}`}
                  disabled={!checkIsFlag(isActive)}
                  onClick={() => handleChange(featureOptionId, name)}
                  className={`${
                    selected[title] === featureOptionId ||
                    defaultOptionId === featureOptionId ||
                    (checkIsFlag(isDefault) && !selectedName)
                      ? "selected"
                      : ""
                  }`}
                >
                  <ListItem>
                    {radioIcon && (
                      <img src={radioIcon} alt={`Icon for ${name}`} />
                    )}
                    <ListItemText primary={label || name} />
                  </ListItem>
                </ListItemButton>
              );
            }
          )}
        </List>
      </FormControl>

      <Modal
        isOpen={isRinginfo}
        onClose={handleCloseModal}
        onSubmit={handleCloseModal}
        okText="OK"
        title={title || titleLabel}
        className="info-modal-content"
      >
        <>
          {(title.toLowerCase() == "metal" ||
            titleLabel.toLowerCase() == "metal") && <Metal />}
          {(title.toLowerCase() == "ringsize" ||
            titleLabel.toLowerCase() == "ringsize") && <RingSize />}
          {/* {(title.toLowerCase() == "stones" || titleLabel.toLowerCase() == "stones") && (
          <Stone/>
        )} */}
          {(title.toLowerCase() == "colour" ||
            titleLabel.toLowerCase() == "colour") && <Colour />}
          {(title.toLowerCase() == "certificate" ||
            titleLabel.toLowerCase() == "certificate") && <Certificate />}
          {(title.toLowerCase() == "cut grade" ||
            titleLabel.toLowerCase() == "cut grade") && <CutGrade />}
          {(title.toLowerCase() == "polish" ||
            titleLabel.toLowerCase() == "polish") && <Polish />}
          {(title.toLowerCase() == "fluorescence" ||
            titleLabel.toLowerCase() == "fluorescence") && <Fluorescence />}
          {(title.toLowerCase() == "lab created diamonds" ||
            titleLabel.toLowerCase() == "lab created diamonds") && (
            <LabCreatedDiamond />
          )}
          {(title.toLowerCase() == "clarity" ||
            titleLabel.toLowerCase() == "clarity") && <Clarity />}
          {(title.toLowerCase() == "shape" ||
            titleLabel.toLowerCase() == "shape") && <Shape />}
          {(title.toLowerCase() == "symmetry" ||
            titleLabel.toLowerCase() == "symmetry") && <Symmetry />}
          {(title.toLowerCase() == "gemstone quality" ||
            titleLabel.toLowerCase() == "gemstone quality") && (
            <Gemstonequality />
          )}
          {(title.toLowerCase() == "yellow diamond intensity" ||
            titleLabel.toLowerCase() == "yellow diamond intensity") && (
            <YellowDiamondIntensity />
          )}
          {(title.toLowerCase() == "chain" ||
            titleLabel.toLowerCase() == "chain") && <ChainNecklace />}
        </>
      </Modal>
    </div>
  );
};

export default ABTextRadioButton;
