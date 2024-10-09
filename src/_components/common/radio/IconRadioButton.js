/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { checkIsFlag } from "@/_utils";
import { Tooltip, Button, Box } from "@mui/material";
import Modal from "@/_components/modal";
import Shape from "@/_components/common/modal-info-content/shape";
import Image from "next/image";

const IconRadioButton = ({
  radioData,
  defaultFeatureOptions,
  title = "",
  extraClass,
  setSelected,
  selected,
  titleLabel,
}) => {
  const [selectedName, setSelectedName] = useState("");
  const [defaultOptionName, setDefaultOptionName] = useState("");
  const [radioinfomodal, setradioinfomodal] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

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

  useEffect(() => {
    if (radioData) {
      const defaultOptionName = radioData?.find((item) =>
        defaultFeatureOptions?.includes(item?.featureOptionId)
      )?.name;
      setDefaultOptionName(defaultOptionName);
    }
  }, [radioData]);
  const handleCloseModal = () => {
    setradioinfomodal(false);
  };
  return (
    <div className={`icon-radio-wrapper ${extraClass || ""}`}>
      <FormControl>
        {(titleLabel || selectedName) && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <FormLabel
              sx={{ display: "flex", alignItems: "center" }}
              id="demo-row-radio-buttons-group-label"
            >
              {titleLabel}
              <Tooltip
                title={
                  <Box p={2}>
                    <Typography variant="body2" color="inherit">
                      This is a custom tooltip with more detailed information.
                    </Typography>
                    <Button
                      variant="text"
                      onClick={() => setradioinfomodal(true)}
                      className="p-0 hover-transparent"
                    >
                      Lear More{" "}
                      <span class="material-icons-outlined">chevron_right</span>
                    </Button>
                  </Box>
                }
              >
                <span
                  className="material-icons-outlined cursorP"
                  onClick={() => setradioinfomodal(true)}
                >
                  info
                </span>
              </Tooltip>
              <Typography variant="body2" className="mt-0 mb-0 ml-10">
                {selectedName || defaultOptionName}
              </Typography>
            </FormLabel>
          </div>
        )}
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          {radioData?.map(
            (
              {
                image,
                hoverImage,
                featureOptionId,
                name,
                label,
                isActive,
                isDefault,
              },
              index
            ) => {
              // return null
              const currentImage =
                hoveredItem === featureOptionId ? hoverImage : image;

              return (
                <FormControlLabel
                  key={featureOptionId + label || name}
                  value={label || name}
                  // label={(!image && label) || name}

                  control={
                    image ? (
                      <Tooltip title={name || label}>
                        <Radio
                          style={{
                            ...(selected[title] == featureOptionId ||
                              (checkIsFlag(isDefault) &&
                                !selectedName && {
                                  border: "1px solid black",
                                  borderRadius: "50px",
                                  padding: "4px",
                                })),
                          }}
                          defaultChecked={
                            selected[title] === featureOptionId ||
                            checkIsFlag(isDefault)
                          }
                          checked={selected[title] === featureOptionId}
                          disabled={!checkIsFlag(isActive)}
                          onClick={() =>
                            handleChange(featureOptionId, label || name)
                          }
                          onMouseEnter={() => setHoveredItem(featureOptionId)}
                          onMouseLeave={() => setHoveredItem(null)}
                          icon={
                            <Image
                              width={28}
                              height={28}
                              src={
                                currentImage !== ""
                                  ? currentImage
                                  : "/assets/images/default-img.jpg"
                              }
                              loading="eager"
                              alt={label || name}
                            />
                          }
                          checkedIcon={
                            <Image
                              width={28}
                              height={28}
                              src={
                                currentImage !== ""
                                  ? currentImage
                                  : "/assets/images/default-img.jpg"
                              }
                              loading="eager"
                              alt={label || name}
                            />
                          }
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title={name || label}>
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
        isOpen={radioinfomodal}
        onClose={handleCloseModal}
        onSubmit={handleCloseModal}
        okText="OK"
        title={title || titleLabel}
        className="info-modal-content"
      >
        <>
          {(title?.toLowerCase() == "shape" ||
            titleLabel?.toLowerCase() == "shape") && <Shape />}
        </>
      </Modal>
    </div>
  );
};

export default IconRadioButton;
