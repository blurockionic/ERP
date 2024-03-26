import React, { useState } from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Tooltip } from "@mui/material";
import CateringOrder from "../pages/orderManagement/page/CateringOrder";
import BisterOrder from "../pages/orderManagement/page/BisterOrder";
import axios from "axios";
import config from "../config/config";
import LightOrder from "../pages/orderManagement/page/LightOrder";

const CreateAllOrders = ({ setShowModel }) => {
  //usestate for bistar order
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  // useState for the check  boxes in step 2 order form
  const [isTentChecked, setIsTentChecked] = useState(false);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [isCateringChecked, setIsCateringChecked] = useState(false);
  const [isLightChecked, setIsLightChecked] = useState(false);
  const [isBistarChecked, setIsBistarChecked] = useState(false);

  //   use state for the nextstep page
  const [step, setStep] = useState(1);
  const [checkedItems, setCheckedItems] = useState([]);
  // code for submit the bister order details and save it

  // bistar  order function
  const handlebistarOrdar = async () => {
    try {
      const orderType = "Bistar";
      const response = await axios.post(
        `${config.apiUrl}/bistar/new`,
        {
          name,
          address,
          phoneNumber,
          alternateNumber,
          otherDetails,
          dateAndTime,
          orderType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message, id } = response.data;

      if (success) {
        localStorage.setItem("bistaerId", id);
        alert(message);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleCheckboxChange = (value) => {
    // Toggle the checkbox state
    switch (value) {
      case "tent":
        // Toggle the checkbox state
        setIsTentChecked(!isTentChecked);
        break;
      case "catering":
        setIsCateringChecked(!isCateringChecked);
        break;
      case "light":
        setIsLightChecked(!isLightChecked);
        break;
      case "bistar":
        setIsBistarChecked(!isBistarChecked);
        break;
      default:
        break;
    }

    // Toggle the array of checked items
    if (checkedItems.includes(value)) {
      setCheckedItems(checkedItems.filter((item) => item !== value));
    } else {
      setCheckedItems([...checkedItems, value]);
    }
  };
  console.log(checkedItems);
  //  handler for change the nuber
  const handleChangePhoneNumber = (e) => {
    const { value } = e.target;
    setPhoneNumber(value);
  };
  // handler for the alternate  number
  const handleChangeAlternateNumber = (e) => {
    const { value } = e.target;
    setAlternateNumber(value);
  };
  // date and time handle function
  const handleDateTimeChange = (moment) => {
    setDateAndTime(moment);
  };
  // back button
  const backButtonHandle = () => {
    setStep(step - 1);
  };
  // submit button handlar for the submitting the ordars  to the database
  const handleSubmitButton = () => {
    // console.log("working");
    if (checkedItems.includes("bistar") === true) {
      handlebistarOrdar();
    }
  };
  const nextPageHandler = () => {
    if (step === 1) {
      setStep(step + 1);
      setIsNextClicked(true);
    } else {
      // Check if any items are selected
      if (
        !(
          isTentChecked ||
          isCateringChecked ||
          isLightChecked ||
          isBistarChecked
        )
      ) {
        alert("Please select at least one option.");
      } else {
        setStep(step + 1);
      }
    }
  };
  return (
    <>
     
    </>
  );
};

export default CreateAllOrders;
