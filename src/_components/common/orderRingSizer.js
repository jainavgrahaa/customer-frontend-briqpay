import { React, useState, useEffect, useRef } from "react";
import Modal from "@/_components/modal";
import TextTitle from '@/_components/atoms/TextTitle';
import { Grid, TextField, Button } from '@mui/material';
import { FormattedMessage } from "react-intl";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { storeTypes } from "@/_utils";
const OrderRingSizer = ({domain}) => {
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  useEffect(() => {
    const handleButtonClick = (event) => {
      event.preventDefault();
      setIsSelectModalOpen(true);
    };
    const orderRingSizerButtons = document.querySelectorAll('a[href*="#order-ring-sizer"]');
    orderRingSizerButtons.forEach((button) => {
      button.addEventListener("click", handleButtonClick);
    });
    return () => {
      orderRingSizerButtons.forEach((button) => {
        button.removeEventListener("click", handleButtonClick);
      });
    };
  }, []); 
  const handleSelectCloseButtonClick = () => {
    setIsSelectModalOpen(false);
  };
  return (
    <>
      <Modal
        isOpen={isSelectModalOpen}
        onClose={handleSelectCloseButtonClick}
        onSubmit={handleSelectCloseButtonClick}
        okText="Submit"
        title="Order my free ring sizer"
        className="forms-modal xl-modal"
      >
        <TextTitle name={"orderRingSizerModal.description"} className={"text-center"} variant={"p"} />
        <form onSubmit={""} style={{ width: '100%', padding: '16px' }} className={`${storeTypes[domain] === "df" ? "form-brown-theme" : ""}`}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="standard"
                name="firstName"
                label={
                  <>
                  <FormattedMessage id="common.firstName" />
                  {" *"}
                </>    
                }
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="standard"
                name="lastName"
                label={
                  <>
                  <FormattedMessage id="common.lastName" />
                  {" *"}
                </>    
                }
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="standard"
                name="addressLineFirst"
                label={
                  <>
                     <FormattedMessage id="common.addressLine" />
                     {" 1*"}
                  </>
                }
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="standard"
                name="addressLineSecond"
                label={
                  <>
                     <FormattedMessage id="common.addressLine" />
                     {" 2"}
                  </>
                }
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="standard"
                name="towncity"
                label={
                  <>
                     <FormattedMessage id="common.townCity" />
                     {" *"}
                  </>
                }
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="standard"
                name="postCode"
                label={
                  <>
                     <FormattedMessage id="common.postCode" />
                     {" *"}
                  </>
                }
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="standard"
                name="telephone"
                label={
                  <>
                     <FormattedMessage id="common.telePhone" />
                  </>
                }
                type='number'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="standard"
                name="email"
                label={
                  <>
                  <FormattedMessage id="email.emailAddress" />
                </>    
                }
                type='email'
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextTitle name={"common.fieldMarks"} variant={"p"} className={"mt-4 mb-4 f-12"} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="female" control={<Radio />} label={
                  <>
                  <FormattedMessage id="common.singupNewsLetterText" />
                </>    
                }/>
                  <FormControlLabel value="male" control={<Radio />} label={
                  <>
                  <FormattedMessage id="common.contactEnquiry" />
                </>    
                } />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} align={"center"} className='mt-4'>
              <Button type="submit" variant="outlined" color="primary" className="brown-color-outlined">
                Order a free ring sizer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Modal>
    </>
  )
}

export default OrderRingSizer;
