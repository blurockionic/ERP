import { Grid } from "@mui/material";
import React from "react";
import LeadCard from "../../components/LeadCard";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

const Dashboard = () => {

  return (
    <>
      <div className=" xl:w-full">
        <nav className="bg-slate-100 xl:flex flex-row xl:border-b-2 sm:flex sm:w-full ">
          {/* company Details  */}
          <div className="flex items-center">
            {" "}
            <div className=" w-[3rem] h-[3rem] border-2 solid border-black bg-white ml-5  rounded-full">
              {" "}
            </div>
            <div className="sm:hidden "> company Name</div>
          </div>
        </nav>

        <nav className="bg-slate-100 flex flex-row border-b-2">
            {/* dashboard  */}
          <div className="text-sm w-[7rem] text-center m-2 bg-slate-500 p-2 font-semibold rounded-md">
            <button>Dashboard</button>{" "}
          </div>
          <div className="text-sm  w-[7rem] text-center m-2 bg-slate-50 p-2 font-semibold rounded-md">
            <button>Reports</button>{" "}
          </div>
        </nav>


        <div>
            {/* Crad div  */}
      <div style={{ width: "100%" }}>
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
            <LeadCard
             icon={<ContactPhoneIcon sx={{ fontSize: 35, color: '#581845' }} />}
              title={"Lead"}
              leadcount={'12'}
            
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
            <LeadCard
             icon={<ContactPhoneIcon sx={{ fontSize: 35, color: '#581845' }} />}
              title={"Lead"}
              leadcount={'12'}
            
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
            <LeadCard
             icon={<ContactPhoneIcon sx={{ fontSize: 35, color: '#581845' }} />}
              title={"Lead"}
              leadcount={'12'}
            
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
            <LeadCard
             icon={<ContactPhoneIcon sx={{ fontSize: 35, color: '#581845' }} />}
              title={"Lead"}
              leadcount={'12'}
            
            />
          </Grid>

        </Grid>
      </div>

      </div>






      </div>

      
    </>
  );
};

export default Dashboard;
