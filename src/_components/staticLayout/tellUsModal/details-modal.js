import TextWithInput from "@/_components/common/TextWithInput";
import useAuthHelper from "@/_hooks/useAuthHelper";
import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createAlert } from "@/_store/alert.slice";
import { getApiUrl } from "@/_utils";
import axios from "axios";
import { getCookies } from "cookies-next";
import { TOKEN_KEY } from "@/_utils/userToken";

const TextRadio = ({ radioData, title, extraClass, onSelect = {}, value }) => {
  const handleChange = (val) => {
    onSelect(val);
  };

  return (
    <div className={`text-radio-wrap ${extraClass}`}>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">{title} </FormLabel>
        <List component="div" className="text-radio-list">
          {radioData.map((ele, i) => {
            return (
              <ListItemButton
                key={`${ele.id + ele.name}`}
                onClick={() => handleChange(ele)}
                className={`${
                  ele?.id === value?.bespokeQuestionnaireOptionsId
                    ? "selected"
                    : ""
                }`}
              >
                <ListItem>
                  {ele.radioIcon && (
                    <img src={ele.radioIcon} alt={`Icon for ${ele.name}`} />
                  )}
                  <ListItemText primary={ele.name} />
                </ListItem>
              </ListItemButton>
            );
          })}
        </List>
      </FormControl>
    </div>
  );
};

const DetailsModal = ({ setIsOpen, storeId, translateId, uDetails }) => {
  const { getQuestionnaires, addBespokeEnquiries } = useAuthHelper();
  const { userDetails } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [file, setFile] = useState();
  const [selectedValues, setSelectedValues] = useState({});
  const dispatch = useDispatch();

  const fetchQuestionnaires = async () => {
    const res = await getQuestionnaires(storeId, translateId);
    const formattedRes = res.map((ele) => {
      if (ele.propertyType.propertyType === "list") {
        const t = ele.bespokeQuestionnaireOptions.map((ele) => ({
          id: ele.id,
          bespokeQuestionnaireId: ele.bespokeQuestionnaireId,
          name: ele.option,
          label: ele.option,
        }));
        return {
          ...ele,
          bespokeQuestionnaireOptions: t,
        };
      }
      return ele;
    });
    setData(formattedRes);
  };

  useEffect(() => {
    fetchQuestionnaires();
  }, []);

  const uploadFile = (resId) => {
    const { token } = getCookies(TOKEN_KEY);
    const formData = new FormData();
    formData.append("files", file.file);
    axios
      .post(
        getApiUrl(
          `/bespoke-enquiries/${resId}/questionnarie/${file.id}/attachment/add`
        ),
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(
          createAlert({
            alertType: "success",
            msg: "Record added successfully",
          })
        );
        setIsOpen(false);
      })
      .catch(() => {
        dispatch(
          createAlert({
            alertType: "error",
            msg: "Something went wrong!",
          })
        );
      });
  };

  const handleSubmit = async () => {
    const payload = {
      ...uDetails,
      customerId: userDetails.id,
      storeId: storeId,
      bespokeEnquiryPreferences: Object.values(selectedValues),
    };
    try {
      const res = await addBespokeEnquiries(payload);
      if (res?.response?.data?.error) {
        dispatch(
          createAlert({
            alertType: "error",
            msg: res.response.data.error.message,
          })
        );
      }
      if (res.id) {
        uploadFile(res.id);
      }
    } catch (error) {
      dispatch(
        createAlert({
          alertType: "error",
          msg: "Something went wrong, please try again",
        })
      );
    }
  };
  if (!data) return null;

  return (
    <>
      <div className="bespoke-details-form bespoke-form row">
        {data.map((ele, i) => {
          if (ele.propertyType.propertyType === "text") {
            return (
              <TextWithInput
                key={ele.propertyType.propertyType + i}
                inputData="Type Your answer here"
                title={`${i + 1}. ${
                  ele?.bespokeQuestionnaireTranslates?.[0]?.question
                }`}
                value="abc"
                extraClass="text-with-input"
                onChange={(e) =>
                  setSelectedValues({
                    ...selectedValues,
                    [i]: {
                      value: e.target.value,
                      bespokeQuestionnaireId:
                        ele?.bespokeQuestionnaireTranslates?.[0]
                          ?.bespokeQuestionnaireId,
                    },
                  })
                }
              />
            );
          }
          if (ele.propertyType.propertyType === "insert") {
            return (
              <TextWithInput
                key={ele.propertyType.propertyType + i}
                title={`${i + 1}. ${
                  ele?.bespokeQuestionnaireTranslates?.[0]?.question
                }`}
                file
                value="abc"
                extraClass="text-with-file-input"
                onChange={(e) =>
                  setFile({
                    id: ele?.bespokeQuestionnaireTranslates?.[0]
                      ?.bespokeQuestionnaireId,
                    file: e?.target?.files?.[0],
                  })
                }
                accept="images"
              />
            );
          }
          if (ele.propertyType.propertyType === "list") {
            return (
              <TextRadio
                key={ele.propertyType.propertyType + i}
                radioData={ele.bespokeQuestionnaireOptions}
                title={`${i + 1}. ${
                  ele?.bespokeQuestionnaireTranslates?.[0]?.question
                }`}
                icon={false}
                value={selectedValues[i]}
                extraClass="jewellery-kind"
                onSelect={(ele) =>
                  setSelectedValues({
                    ...selectedValues,
                    [i]: {
                      bespokeQuestionnaireId: ele.bespokeQuestionnaireId,
                      bespokeQuestionnaireOptionsId: ele.id,
                    },
                  })
                }
              />
            );
          }
          return (
            <div key={ele.propertyType.propertyType + i}>
              {i + 1} {ele.propertyType.propertyType}
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-center">
        <Button
          variant="outlined"
          disabled={
            Object.keys(selectedValues).length !== data.length - 1 && !file
          }
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default DetailsModal;
