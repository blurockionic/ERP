import React from "react";

import { Grid } from "@mui/material";


import NavigationBar from "../../components/NavigationBar";
import BasicCard from "../../components/BasicCard";

import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { Outlet, useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate =  useNavigate()
  const handleOnOpen = () => {
    //navigate to lead management system
    navigate('/leadmanagement-dashboard')
  };

  return (
    <div>
      <NavigationBar />

      {/* <div style={{ width: "100%" }}>
        <Grid
          padding={3}
          container
          spacing={{ xs: 2, sm: 2, md: 2 }}
          sx={{ marginLeft: "0.12rem" }}
        >
          <Grid
            padding={1}
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            sx={{ width: "400px" }}
          >
            <BasicCard
             icon={<ContactPhoneIcon sx={{ fontSize: 35, color: '#581845' }} />}
              title={"Lead Management"}
              description={"Lead management system. Manage lead record"}
            
            />
          </Grid>
          <Grid
            padding={1}
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            sx={{ width: "400px" }}
          >
            <BasicCard
             icon={<ContactPhoneIcon sx={{ fontSize: 35, color: '#581845' }} />}
              title={"Lead Management"}
              description={"Lead management system. Manage lead record"}
            
            />
          </Grid>
          <Grid
            padding={1}
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            sx={{ width: "400px" }}
          >
            <BasicCard
             icon={<ContactPhoneIcon sx={{ fontSize: 35, color: '#581845' }} />}
              title={"Lead Management"}
              description={"Lead management system. Manage lead record"}
            
            />
          </Grid>
          <Grid
            padding={1}
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            sx={{ width: "400px" }}
          >
            <BasicCard
             icon={<ContactPhoneIcon sx={{ fontSize: 35, color: '#581845' }} />}
              title={"Lead Management"}
              description={"Lead management system. Manage lead record"}
            
            />
          </Grid>

        </Grid>
      </div> */}
      <div className="w-full">
        <Outlet/>
      </div>
    </div>
  );
};

export default MainPage;
