import React from "react";

const LeadCard = ({title, leadcount}) => {
  return (
    <div className="border solid">
        <h1>{title}</h1>
      <div>
        <span> {leadcount}</span>
      </div>
      <div>Lead Count</div>
    </div>
  );
};

export default LeadCard;
