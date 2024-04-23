import React, { useEffect, useState } from "react";
import StepOne from "../../../components/StepOne";
import StepTwo from "../../../components/StepTwo";
import StepThree from "../../../components/StepThree";
import StepFour from "../../../components/StepFour";
import StepFive from "../../../components/StepFive";
import StepFinal from "../../../components/StepFinal";
import axios from "axios";
import config from "../../../config/config";

const OrderCaters = () => {
  const [step, setStep] = useState(1);
  const [allItem, setAllItem] = useState([]);

  // get all inventary items
  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/inventory/all`, {
          withCredentials: true,
        });
        setAllItem(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchInventoryItems();
  }, []);

  //filter tent item
  const tentItem = allItem.filter((item) => item.itemCategoryType === "tent");

  //filter decoration item
  const decorationItem =  allItem.filter((item)=>item.itemCategoryType === "decoration")

  //filter for catering item
  const cateringItem =  allItem.filter((item)=> item.itemCategoryType === "catering")

  //filter for light items
  const lightItem =  allItem.filter((item)=>item.itemCategoryType === "light")

  const bistarItem = allItem.filter((item)=> item.itemCategoryType === "bistar")


  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const skipStep = () => {
    nextStep();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        //customer
        return <StepOne nextStep={nextStep} />;
      case 2:
        //tent
        return <StepTwo nextStep={nextStep} prevStep={prevStep} tentItem={tentItem}/>;

      case 3:
        //catering
        return <StepThree nextStep={nextStep} prevStep={prevStep}  cateringItem={cateringItem}/>;

      case 4:
        //light
        return <StepFour nextStep={nextStep} prevStep={prevStep} lightItem={lightItem}/>;

      case 5:
        return <StepFive nextStep={nextStep} prevStep={prevStep} bistarItem={bistarItem}/>;

      case 6:
        return <StepFinal prevStep={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex justify-between border-b">
        {step !== 1 && step !== 6 && (
          <button
            onClick={prevStep}
            className="uppercase mx-3 my-3 px-2 py-1 border rounded shadow-sm"
          >
            Back
          </button>
        )}
        {step !== 1 && step !== 6 && (
          <button
            onClick={skipStep}
            className="uppercase mx-3 my-3 px-2 py-1 border rounded shadow-sm"
          >
            Skip
          </button>
        )}
      </div>

      {/* fom pages*/}
      {renderStep()}
    </>
  );
};

export default OrderCaters;
