import React, { useState } from "react";

// import SearchBar from "../../components/SearchBar";
// import { Tooltip } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import TuneIcon from "@mui/icons-material/Tune";
// import ComingSoon from "../../components/ComingSoon";
import StepOne from "../../components/StepOne";
import StepTwo from "../../components/StepTwo";
import StepThree from "../../components/StepThree";
import StepFour from "../../components/StepFour";
import StepFinal from "../../components/StepFinal";
import StepFive from "../../components/StepFive";

const Tasks = () => {
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
        return <StepFive nextStep={nextStep} prevStep={prevStep}/>

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
          {step !== 1  && (
            <button onClick={skipStep} className="mx-6">
              Skip
            </button>
          )}
          {step !== 1 && <button onClick={prevStep} className="mx-6">Back</button>}
        </div>

        {/* fom pages*/}
        {renderStep()}
      </>
    </div>
  );
};

export default Tasks;
