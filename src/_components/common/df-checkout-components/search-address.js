import useAuthHelper from "@/_hooks/useAuthHelper";
import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material";
import { useState } from "react";

const SearchAddress = ({ setValues, prefix = "", show, setShow }) => {
  const [postcode, setPostcode] = useState("");
  const [addressOption, setAddressOption] = useState([]);

  const { getAddressSuggestion, getAddress } = useAuthHelper();

  const findAddressHandler = async () => {
    const res = await getAddressSuggestion(postcode);
    setAddressOption(res.suggestions);
  };

  const findAddress = async (id) => {
    const res = await getAddress(id);
    setValues((values) => ({
      ...values,
      [`${prefix}city`]: res?.town_or_city,
      [`${prefix}country`]: res?.country,
      [`${prefix}address1`]: res?.line_1,
      [`${prefix}address2`]: res?.line_2,
      [`${prefix}postcode`]: res?.postcode,
    }));
    setShow(!show);
  };

  return (
    <>
      <div className="row mt-2">
        {show ? (
          <p
            className="billing-address semi-bold mb-0 cursorP"
            onClick={() => setShow(!show)}
          >
            Search using postcode
          </p>
        ) : (
          <>
            <div className="col-md-6 col-lg-6 col-6 align-items-end d-flex">
              <TextField
                fullWidth
                type="text"
                variant="standard"
                placeholder="Postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>
            <div className="col-md-6 col-lg-6 col-6">
              <Button
                disabled={!postcode}
                type="button"
                onClick={() => findAddressHandler()}
                variant="contained"
                fullWidth
              >
                Find address
              </Button>
            </div>
            <div className="col-md-6 col-lg-6"></div>
            {addressOption.length ? (
              <div className="collectionDetailsFrom-input mb-4 mt-3">
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Select Your Address</InputLabel>
                  <Select
                    name="addressId"
                    label="Store"
                    onChange={(e) => findAddress(e.target.value)}
                  >
                    {addressOption?.map((ele) => {
                      return (
                        <MenuItem value={ele?.id} key={ele?.id}>
                          {ele?.address}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            ) : null}
            <p className="billing-address semi-bold mb-0 cursorP mt-4" onClick={() => setShow(!show)}>
              Enter address manually
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default SearchAddress;
