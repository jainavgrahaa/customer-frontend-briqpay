import useAuthHelper from "@/_hooks/useAuthHelper";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
      <div className="row mt-4 mb-5">
        {show ? (
          <p
            className="bold-text billing-address free-del-postcode text-underline"
            onClick={() => setShow(!show)}
            style={{cursor:"pointer"}}
          >
            Search using postcode
          </p>
        ) : (
          <>
            <div className="col-md-6 col-lg-6">
              <input
                type="text"
                placeholder="Postcode"
                className="select-store-input"
                value={postcode}
                style={{color:"#000"}}
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>
            <div className="col-md-6 col-lg-6">
              <button
                disabled={!postcode}
                className="btn"
                type="button"
                onClick={() => findAddressHandler()}
              >
                Find address
              </button>
            </div>
            <div className="col-md-6 col-lg-6"></div>
            {addressOption.length ? (
              <div className="collectionDetailsFrom-input mb-5">
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Select Address</InputLabel>
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
            <p
              className="bold-text billing-address free-del-postcode text-underline"
              onClick={() => setShow(!show)}
              style={{cursor:"pointer"}}
            >
              Enter address manually
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default SearchAddress;
