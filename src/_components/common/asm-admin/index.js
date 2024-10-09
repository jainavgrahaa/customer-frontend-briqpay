import TextTitle from "@/_components/atoms/TextTitle";
import Auth from "@/_components/molecules/Auth";
import useAuthHelper from "@/_hooks/useAuthHelper";
import React, { useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Button } from "@mui/base";
import { FormattedMessage } from "react-intl";
import AddCustomer from "./AddCustomer";
import { useDispatch, useSelector } from "react-redux";
import { createAlert } from "@/_store/alert.slice";
import { getApiUrl } from "@/_utils";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import {
  ASM_TOKEN_KEY,
  ASM_USER_EMAIL,
  ORDER_ID,
  LOCATION_ID,
  TOKEN_KEY,
} from "@/_utils/userToken";
import { logoutUser, userDetail } from "@/_store/auth.slice";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

const options = [
  {
    value: "firstname",
    label: "First Name",
  },
  {
    value: "lastname",
    label: "Last Name",
  },
  {
    value: "referenceId",
    label: "Reference Id",
  },
  {
    value: "email",
    label: "Email",
  },
];

const channelOptions = [
  {
    value: "Online",
    label: "Online",
  },
  {
    value: "Appointment",
    label: "Appointment",
  },
  {
    value: "Lounge",
    label: "Lounge",
  },
  {
    value: "Video Appointment",
    label: "Video Appointment",
  },
  {
    value: "Store",
    label: "Store",
  },
];

const AsmAdmin = ({ storeName, storeId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [searchText, setSearchText] = useState("");
  const [step, setStep] = useState(1);
  const [users, setUsers] = useState(null);
  const {
    getAllCustomer,
    getUserLocation,
    getUserDetails,
    getAuthToken,
    impersonateUser,
    createInternalOrder,
  } = useAuthHelper();
  const [selectedUser, setSelectedUser] = useState(null);
  const [locationOptions, setLocationOptions] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const { user, userDetails } = useSelector((state) => state.auth);
  const asmUserEmail = getCookie(ASM_USER_EMAIL);

  useEffect(() => {
    if (step === 1 && asmUserEmail) {
      setStep(2);
    }
    if (step !== 1 && !asmUserEmail) {
      setStep(1);
    }
  }, [asmUserEmail]);

  const fetchStoreLocations = async () => {
    const details = jwtDecode(getCookie(ASM_TOKEN_KEY));
    const res = await getUserLocation(details.id);
    setLocationOptions(res?.data?.map((ele) => ele.location));
  };

  useEffect(() => {
    if (asmUserEmail) {
      fetchStoreLocations();
    }
  }, [asmUserEmail]);

  const login = async (formValues) => {
    setLoader(true);
    try {
      const res = await fetch(getApiUrl(`/user/login/v2`), {
        method: "POST",
        body: JSON.stringify({
          email: formValues.email,
          password: formValues.password,
          storeId: storeId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const t = await res.json();
      if (t.error) {
        dispatch(
          createAlert({
            alertType: "error",
            msg: t?.error?.message || "Something went wrong!",
          })
        );
      } else {
        setCookie(TOKEN_KEY, t?.token);
        setCookie(ASM_TOKEN_KEY, t?.token);
        setCookie(ASM_USER_EMAIL, formValues.email);
        setStep(2);
        setLoader(false);
      }
    } catch (error) {
      dispatch(
        createAlert({
          alertType: "error",
          msg: error?.response?.data?.error?.message || "Something went wrong!",
        })
      );
      setLoader(false);
    }
  };

  const handleAuth = (formValues) => {
    login(formValues);
  };

  const fetchAllCustomer = async () => {
    setLoader(true);
    const res = await getAllCustomer(selectedOption, searchText);
    if (res?.error) {
      dispatch(
        createAlert({
          alertType: "error",
          msg:
            res.error.message ||
            intl.formatMessage({
              id: "signin.invalidCredentialsMessage",
            }),
        })
      );
    }
    setUsers(res.data || []);
    setLoader(false);
  };

  const impersonateUserDetails = async () => {
    const payload = {
      locationId: selectedLocation,
      salesChannel: selectedChannel,
    };
    const result = await impersonateUser(selectedUser.id, payload);
    if (result.token) {
      setCookie(TOKEN_KEY, result?.token);
      deleteCookie(ORDER_ID);
      setCookie(LOCATION_ID, selectedLocation);
      const details = await getUserDetails();
      dispatch(userDetail({ ...details.data }));
      router.push("/");
    }
    if (result.error || result.message) {
      dispatch(
        createAlert({
          alertType: "error",
          msg:
            result?.error?.message ||
            result?.message ||
            "Something went wrong!",
        })
      );
    }
  };

  const LoginForm = () => (
    <div className="login-account-sec account-sec">
      <TextTitle variant="h1" name="common.asmUserSignIn" />
      <TextTitle variant="body1" name="signin.subTitle" />
      <Auth handleAuth={handleAuth} showForgotPassword={false} />
    </div>
  );

  const handleLogout = async () => {
    deleteCookie(ASM_TOKEN_KEY);
    deleteCookie(ASM_USER_EMAIL);
    const domain = localStorage?.getItem("domain");
    const result = await getAuthToken(domain);
    setCookie(TOKEN_KEY, result?.token);
    dispatch(logoutUser());
    router.push("/asm-admin");
  };

  const handleAsmCustomerLogout = async () => {
    setCookie(TOKEN_KEY, getCookie(ASM_TOKEN_KEY));
    dispatch(logoutUser());
  };

  const handleInternalOrder = async () => {
    const payload = {
      sourceLocationId: selectedLocation,
      sourceStoreId: storeId,
      createdByUserId: jwtDecode(getCookie(ASM_TOKEN_KEY))?.id,
    };
    const body = JSON.stringify({
      order: payload,
    });
    try {
      const res = await createInternalOrder(body);
      if (res?.response?.data?.error?.message) {
        dispatch(
          createAlert({
            alertType: "error",
            msg: res?.response?.data?.error?.message,
          })
        );
      }
      if (res?.orderStatesMaps?.[0]?.orderId) {
        setCookie(ORDER_ID, res?.orderStatesMaps?.[0]?.orderId);
        setCookie(LOCATION_ID, selectedLocation);
        dispatch(
          createAlert({
            alertType: "success",
            msg: `Internal order created successfully ${res?.orderStatesMaps?.[0]?.orderId || ''}`,
          })
        );
        router.push("/");
      }
    } catch (error) {
      dispatch(
        createAlert({
          alertType: "error",
          msg: JSON.stringify(error),
        })
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12">
          {step === 1 ? (
            <div class="row">
              <div className="col-sm-6 col-auto">
                <LoginForm />
              </div>
            </div>
          ) : null}
        </div>
        <div className="col-sm-12 mt-5">
          {(step === 2 || step === 3) && asmUserEmail ? (
            <div>
              <div className="mb-4 row">
                <div className="col-sm-6">
                  Selected Store: <strong>{storeName}</strong>
                </div>
                {userDetails?.firstname && (
                  <div className="col-sm-6  d-flex justify-content-end align-items-center">
                    Selected Customer: &nbsp;
                    <strong className="mr-2">
                      {userDetails?.firstname + " " + userDetails?.lastname}
                    </strong>
                    &nbsp;
                    <span
                      role="button"
                      class="material-icons-outlined"
                      onClick={handleAsmCustomerLogout}
                    >
                      delete
                    </span>
                  </div>
                )}
              </div>
              {(step === 2 || step === 3) && (
                <div className="row d-flex mb-4">
                  <div className="col-sm-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Location
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedLocation}
                        label={locationOptions ? "Loading..." : "Location"}
                        onChange={(event) => {
                          setSelectedLocation(event.target.value);
                        }}
                      >
                        {locationOptions?.map((dropDownObj, index) => (
                          <MenuItem value={dropDownObj?.id} key={index}>
                            {dropDownObj?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-sm-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Channel of Sale
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedChannel}
                        label="Channel of Sale"
                        onChange={(event) => {
                          setSelectedChannel(event.target.value);
                        }}
                      >
                        {channelOptions?.map((dropDownObj, index) => (
                          <MenuItem value={dropDownObj?.value} key={index}>
                            {dropDownObj?.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              )}
              <div className="row d-flex mb-4 justify-content-between">
                <div className="col-sm-6">
                  {step === 2 && (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Search By
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedOption}
                        label="Search By"
                        onChange={(event) => {
                          setSelectedOption(event.target.value);
                        }}
                      >
                        {options?.map((dropDownObj, index) => (
                          <MenuItem value={dropDownObj?.value} key={index}>
                            {dropDownObj?.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </div>
                <div
                  className="col-sm-6 d-flex justify-content-end"
                  style={{ gap: "0 15px" }}
                >
                  {step === 2 && !userDetails?.firstname && (
                    <Button
                      onClick={() => setStep(3)}
                      variant="outlined"
                      className="bordered-btn d-flex justify-content-center align-items-center"
                    >
                      <span class="material-icons-outlined">add</span>Add
                      Customer
                    </Button>
                  )}
                  {step === 3 && (
                    <Button
                      onClick={() => setStep(2)}
                      variant="outlined"
                      className="bordered-btn d-flex justify-content-center align-items-center"
                    >
                      <span class="material-icons-outlined">arrow_back</span>
                      Search Customer
                    </Button>
                  )}
                  {(step === 2 || step === 3) && (
                    <Button
                      onClick={handleLogout}
                      variant="outlined"
                      className="bordered-btn d-flex justify-content-center align-items-center"
                    >
                      Logout
                    </Button>
                  )}
                </div>
              </div>
              {step === 2 && (
                <div className="row">
                  <div className="col-sm-12">
                    <div className="asm-search-block">
                      <Box display="flex" className="asm-search-field mb-4">
                        <TextField
                          type="text"
                          label={<FormattedMessage id="common.search" />}
                          // variant="standard"
                          variant="outlined"
                          onChange={(e) => setSearchText(e.target.value)}
                          sx={{ width: "100%" }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              fetchAllCustomer(selectedOption, e.target.value);
                            }
                          }}
                        />
                        <Button
                          disabled={!searchText || !selectedOption}
                          variant="outlined"
                          className="bordered-btn d-flex justify-content-center align-items-center"
                          onClick={() =>
                            fetchAllCustomer(selectedOption, searchText)
                          }
                        >
                          Search
                        </Button>
                      </Box>
                      {!loader && users !== null && !users?.length ? (
                        <div>No Record Found</div>
                      ) : null}
                      <ul class="list-group mb-4">
                        {loader ? (
                          <div>Loading...</div>
                        ) : (
                          users?.map((ele) => (
                            <li
                              type="button"
                              key={ele.email}
                              class="list-group-item"
                              onClick={() => setSelectedUser(ele)}
                              className={`list-group-item
                            ${
                              ele.email === selectedUser?.email ? "active" : ""
                            }`}
                            >
                              {/* {JSON.stringify(ele)} */}
                              <strong>
                                {ele.firstname} {ele.lastname}
                              </strong>{" "}
                              (<small>{ele.email}</small>)
                            </li>
                          ))
                        )}
                      </ul>
                      {selectedUser?.id && (
                        <Box
                          display="flex"
                          className="justify-content-center mt-4"
                        >
                          <Button
                            variant="outlined"
                            className="bordered-btn"
                            onClick={() => impersonateUserDetails()}
                            disabled={!selectedLocation || !selectedChannel}
                          >
                            Save & Proceed
                          </Button>
                        </Box>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {step === 2 && !userDetails?.firstname && (
            <Button
              onClick={handleInternalOrder}
              variant="outlined"
              className="bordered-btn d-flex justify-content-center align-items-center"
              disabled={!selectedLocation}
              style={{ pointerEvents: !selectedLocation ? "none" : "auto" }}
            >
              Create Internal Order
            </Button>
          )}
          {step === 3 && (
            <div className="row">
              <div className="col-sm-12">
                <div className="card sign-up-sec">
                  <div className="card-body">
                    <AddCustomer
                      setStep={setStep}
                      storeId={storeId}
                      selectedLocation={selectedLocation}
                      selectedChannel={selectedChannel}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AsmAdmin;
