import {Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import ButtonUsage from "./ButtonUsage";


const BasicCard = ({ icon, title, description }) => {
  const handleOnOpen = () => {
    alert("button clicked ")
    console.log("Button clicked");
  };
  return (

  
    <div>
      <Card
        sx={{
          backgroundColor: "#0000",
          border: "2px solid #e5e7eb",
          borderRadius: "none",
          boxShadow: "none",
        }}
      >
        <CardContent sx={{}}>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            {" "}
            <span>{icon}</span>
            <Typography
              sx={{ fontSize: 26, fontWeight: "700", marginLeft:'2px' }}
              color="#581845"
            >
              {title}
            </Typography>
          </div>
          <div style={{marginTop:"2px",width:"full", height:"1px", background:"black"}}></div>
          <Typography variant="h5" component="div">
            {/* be{bull}nev{bull}o{bull}lent */}
          </Typography> 
          kjndfknflkxv
          <Typography sx={{}} color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <ButtonUsage onClickHandler={handleOnOpen} children="Open" />
        </CardActions>
      </Card>
    </div>
  );
};

export default BasicCard;
