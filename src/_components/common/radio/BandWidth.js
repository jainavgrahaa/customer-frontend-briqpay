/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { checkIsFlag } from "@/_utils";
import {
  Tooltip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";

const BandWidth = ({
  radioData,
  defaultFeatureOptions,
  title = "",
  extraClass,
  selected,
  setSelected,
  titleLabel,
}) => {
  const [selectedName, setSelectedName] = useState("");
  const [defaultOptionName, setDefaultOptionName] = useState("");
  const [defaultOptionId, setDefaultOptionId] = useState("");
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
      const defaultOption = radioData?.find((item) =>
        defaultFeatureOptions?.includes(item?.featureOptionId)
      );
      setDefaultOptionId(defaultOption?.featureOptionId);
      setDefaultOptionName(defaultOption?.name);
    }
  }, [radioData]);

  useEffect(() => {
    setDefaultOptionId(selected[title]);
  }, [selected])

  return (
    <div
      className={`icon-radio-wrapper ${extraClass}`}
      style={{ paddingLeft: "0px" }}
    >
      <FormControl>
        <FormLabel
          sx={{ display: "flex", alignItems: "center" }}
          id="demo-row-radio-buttons-group-label"
        >
          {titleLabel}:
          <Typography
            variant="body2"
            alignItems="center"
            className="mb-0 mt-0 ml-5"
          >
            {selectedName || defaultOptionName}
          </Typography>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {radioData.map(
            ({
              value,
              image,
              hoverImage,
              featureOptionId,
              label = "",
              name,
              isActive,
              isDefault,
            }) => {
              const currentImage =
                hoveredItem === featureOptionId
                  ? hoverImage === ""
                    ? image
                    : hoverImage
                  : image;
              return (
                <FormControlLabel
                  key={featureOptionId + value}
                  label={label || name}
                  labelPlacement="bottom"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  value={label || name}
                  control={
                    image ? (
                      <Radio
                        disabled={!checkIsFlag(isActive)}
                        style={{
                          ...((selected[title] == featureOptionId &&
                            isDefault) ||
                            (checkIsFlag(isDefault) &&
                              !selectedName && {
                                border: "1px solid black",
                                borderRadius: "50px",
                              })),
                        }}
                        onClick={() => handleChange(featureOptionId, name)}
                        checked={
                          selected[title] == featureOptionId ||
                          defaultOptionId === featureOptionId
                        }
                        onMouseEnter={() => setHoveredItem(featureOptionId)}
                        onMouseLeave={() => setHoveredItem(null)}
                        icon={
                          <Image
                            width={70}
                            height={70}
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
                            width={70}
                            height={70}
                            src={hoverImage !== "" ? hoverImage : image}
                            loading="eager"
                            alt={label || name}
                          />
                        }
                      />
                    ) : (
                      <Radio
                        disabled={!checkIsFlag(isActive)}
                        checked={defaultOptionId === featureOptionId}
                        onClick={() => handleChange(featureOptionId, name)}
                      />
                    )
                  }
                />
              );
            }
          )}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default BandWidth;
