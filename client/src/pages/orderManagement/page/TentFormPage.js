import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";

const TentFormPage = () => {
  const [step, setStep] = useState(1);
  const [stage, setStage] = useState("");
  const [isUseSelectLead, setIsUseSelected] = useState(false);

  const [isCateringSelected, setIsCateringSelected] = useState(false);

  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
  });
  //   custom css for select tag
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "lightblue" : "white",
      color: state.isFocused ? "black" : "inherit",
      border: "none",
      boxShadow: "none",
    }),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 2);
    }
  };

  //handle on
  const handleOnOrder = (order) => {
    setStage(order.value);
    setIsUseSelected(true);
  };

  useEffect(() => {
    // Check if stage is "Catering" and open the model

    console.log(stage === "Catering");
    if (stage === "Catering") {
      setIsCateringSelected(true);
      console.log("hello");
    } else {
      setIsCateringSelected(false);
    }
  }, [isUseSelectLead, stage]); // Run this effect whenever the value of stage changes

  const options = [
    { value: "Piller", label: "Piller" },
    { value: "Beam", label: "Beam" },
    { value: "Pipe", label: "Pipe" },
    { value: "Chair", label: "Chair" },
  ];

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Add your submission logic here
  };

  return (
    <div className=" max-w-xl mx-auto mt-8 items-center mb-4 rounded-lg bg-white shadow-xl p-1">
      <div className=" flex w-full bg-blue-500 justify-center p-2 rounded font-bold text-xl text-white">TENT </div>
      <div className="flex flex-row justify-between mb-3 p-2">
        <span
          className={`text-xl font-bold  text-center w-[2rem] h-[2rem] rounded-full border-2 ml-4
                ${step === 1 ? "text-blue-600 bg-slate-300" : "text-gray-500"}`}
        >
          1
        </span>
        <span
          className={` text-gray-500 
                 ${
                   step >= 2
                     ? "opacity-100 text-red-600 font-bold "
                     : "opacity-50"
                 }`}
        >
          .......................................
        </span>
        <span
          className={`text-xl font-bold  text-center w-[2rem] h-[2rem] rounded-full border-2
                 ${step === 2 ? "text-blue-600 " : "text-gray-500"}`}
        >
          2
        </span>
        <span
          className={` text-gray-500 
                 ${
                   step >= 2
                     ? "opacity-100 text-red-600 font-bold "
                     : "opacity-50"
                 }`}
        >
          .......................................
        </span>
        <span
          className={`text-xl font-bold  text-center w-[2rem] h-[2rem] rounded-full border-2 mr-4
                 ${step === 3 ? "text-blue-600" : "text-gray-500"}`}
        >
          3
        </span>
      </div>

      {/* 1 step div input */}
      {step === 1 && (
        <>
          <div>
            <input
              type="text"
              name="field1"
              value={formData.field1}
              onChange={handleChange}
              placeholder="Field 1"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="flex flex-col border-b p-1 ">
            <label htmlFor="stage"> Type of Order </label>

            <ReactSelect
              className="outline-none border-none"
              onChange={handleOnOrder}
              options={options}
              styles={customStyles}
              components={{
                IndicatorSeparator: () => null, // Remove the indicator separator
                //  DropdownIndicator: () => null, // Remove the dropdown indicator
              }}
            />
          </div>

          {isCateringSelected && (
            <div className="flex flex-col border-b p-1 ">
              <label htmlFor="source"> Source </label>
              <ReactSelect
                className="outline-none border-none"
                // value={source}
                //   onChange={handleOnSource}
                //   options={sourceOptions}
                styles={customStyles}
                components={{
                  IndicatorSeparator: () => null, // Remove the indicator separator
                  //  DropdownIndicator: () => null, // Remove the dropdown indicator
                }}
              />
            </div>
          )}
        </>
      )}
      {/* step 2 input fields  */}
      {step === 2 && (
        <div>
          <input
            type="text"
            name="field2"
            value={formData.field2}
            onChange={handleChange}
            placeholder="Field 2"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
      )}

      {/* step 3 inputs fields  */}
      {step === 3 && (
        <div>
          <input
            type="text"
            name="field3"
            value={formData.field3}
            onChange={handleChange}
            placeholder="Field 3"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
      )}

      <div className="mt-4 mb-3">
        {step !== 1 && step === 3 && (
          <div className="mb-8">
            <button
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md mr-4"
              onClick={handlePrevious}
            >
              Preview
            </button>
            <button
              className="px-4 py-2 text-sm bg-green-600 text-white rounded-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}

        {step !== 3 && (
          <button
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default TentFormPage;
