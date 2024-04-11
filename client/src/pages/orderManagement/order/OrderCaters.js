import React, { useState } from "react";
import StepOne from "../../../components/StepOne";
import StepTwo from "../../../components/StepTwo";
import StepThree from "../../../components/StepThree";
import StepFour from "../../../components/StepFour";
import StepFive from "../../../components/StepFive";
import StepFinal from "../../../components/StepFinal";

const OrderCaters = () => {
  const [step, setStep] = useState(1);

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
        return <StepTwo nextStep={nextStep} prevStep={prevStep} />;

      case 3:
        //catering
        return <StepThree nextStep={nextStep} prevStep={prevStep} />;

      case 4:
        //bistar
        return <StepFour nextStep={nextStep} prevStep={prevStep} />;

      case 5:
        return <StepFive nextStep={nextStep} prevStep={prevStep} />;

      case 6:
        return <StepFinal prevStep={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-y-scroll">
      <>
        <div className="flex justify-between">
          {step !== 1 && step !== 6 && (
            <button onClick={prevStep} className="m-5 select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              Back
            </button>
          )}
          {step !== 1 && step !== 6 && (
            <button onClick={skipStep} className="m-5 select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              Skip
            </button>
          )}
        </div>

        {/* fom pages*/}
        {renderStep()}
      </>
    </div>
  );
};

export default OrderCaters;
