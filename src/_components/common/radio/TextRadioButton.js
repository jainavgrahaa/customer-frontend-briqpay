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
import Modal from "@/_components/modal";
import { checkIsFlag } from "@/_utils";

const TextRadioButton = ({ radioData, title, icon, extraClass, referenceId = '', onSelect = {} }) => {
  const [selected, setSelected] = useState("");
  const [isRinginfo, setIsRingInfo] = useState(false);
  const handleChange = (val, id) => {
    setSelected(val);
    if (referenceId !== "") {
      onSelect(referenceId, id)
    }
  };
  const handleCloseModal = () => {
    setIsRingInfo(false);
  };
  return (
    <div className={`text-radio-wrap ${extraClass}`}>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          {title}{" "}
          {icon && (
            <a onClick={() => setIsRingInfo(true)}>
              <span className="material-icons-outlined">info</span>
            </a>
          )}
        </FormLabel>
        <List component="div" className="text-radio-list">
          {radioData.map(
            ({ id, name = "", label, isActive, isDefault, radioIcon }) => {
              return (
                <ListItemButton
                  key={`${id + name}`}
                  disabled={!checkIsFlag(isActive)}
                  onClick={() => handleChange(name)}
                  className={`${
                    selected === name || checkIsFlag(isDefault) ? "selected" : ""
                  }`}
                >
                  <ListItem>
                    {radioIcon && (
                      <img src={radioIcon} alt={`Icon for ${name}`} />
                    )}
                    <ListItemText primary={name} />
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
        title={title}
        className="sm-modal"
      >
        <div className="ring-form row">
          <div className="col-md-12">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TextRadioButton;
