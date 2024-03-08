import React from "react";

import SearchBar from "../../components/SearchBar";
import { Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TuneIcon from "@mui/icons-material/Tune";
import ComingSoon from "../../components/ComingSoon";

const Customers = () => {
  const data = [
    {
      customerId: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      owner: "Company A",
    },
    {
      customerId: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      owner: "Company B",
    },
    {
      customerId: 3,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      owner: "Company C",
    },
    {
      customerId: 4,
      firstName: "Bob",
      lastName: "Brown",
      email: "bob.brown@example.com",
      owner: "Company A",
    },
    {
      customerId: 5,
      firstName: "Eva",
      lastName: "Williams",
      email: "eva.williams@example.com",
      owner: "Company B",
    },
    {
      customerId: 6,
      firstName: "Charlie",
      lastName: "Davis",
      email: "charlie.davis@example.com",
      owner: "Company C",
    },
    {
      customerId: 7,
      firstName: "Grace",
      lastName: "Miller",
      email: "grace.miller@example.com",
      owner: "Company A",
    },
    {
      customerId: 8,
      firstName: "Daniel",
      lastName: "Moore",
      email: "daniel.moore@example.com",
      owner: "Company B",
    },
    {
      customerId: 9,
      firstName: "Olivia",
      lastName: "Jones",
      email: "olivia.jones@example.com",
      owner: "Company C",
    },
    {
      customerId: 10,
      firstName: "Frank",
      lastName: "Wilson",
      email: "frank.wilson@example.com",
      owner: "Company A",
    },
    {
      customerId: 11,
      firstName: "Sophie",
      lastName: "Anderson",
      email: "sophie.anderson@example.com",
      owner: "Company B",
    },
    {
      customerId: 12,
      firstName: "David",
      lastName: "Thomas",
      email: "david.thomas@example.com",
      owner: "Company C",
    },
    {
      customerId: 13,
      firstName: "Lily",
      lastName: "White",
      email: "lily.white@example.com",
      owner: "Company A",
    },
    {
      customerId: 14,
      firstName: "Henry",
      lastName: "Hall",
      email: "henry.hall@example.com",
      owner: "Company B",
    },
    {
      customerId: 15,
      firstName: "Emma",
      lastName: "Johnson",
      email: "emma.johnson@example.com",
      owner: "Company C",
    },
    {
      customerId: 16,
      firstName: "William",
      lastName: "Turner",
      email: "william.turner@example.com",
      owner: "Company A",
    },
    {
      customerId: 17,
      firstName: "Zoe",
      lastName: "Cooper",
      email: "zoe.cooper@example.com",
      owner: "Company B",
    },
    {
      customerId: 18,
      firstName: "Michael",
      lastName: "Wright",
      email: "michael.wright@example.com",
      owner: "Company C",
    },
    {
      customerId: 19,
      firstName: "Sophia",
      lastName: "Walker",
      email: "sophia.walker@example.com",
      owner: "Company A",
    },
    {
      customerId: 20,
      firstName: "James",
      lastName: "Allen",
      email: "james.allen@example.com",
      owner: "Company B",
    },
  ];

  return (
    <>
      {/* <ComingSoon /> */}
      <div className=" w-full ">
        <nav className="bg-white flex flex-row justify-between border-b-2">
          {/* company Details  */}
          <div className="flex items-center">
            {" "}
            <div className=" w-[3rem] h-[3rem] border-2 solid border-black bg-white ml-5  rounded-full">
              {" "}
            </div>
            <div> company Name</div>
          </div>

          <div className=" flex flex-row items-center gap-4 mr-5 h-[2.7rem]">
            <div className=" bg-white  border-2 text-center  rounded-full w-[5rem] p-1  ">
              <button>Action</button>
            </div>{" "}
            <div className=" bg-white border-2 text-center rounded-full w-[5rem] p-1  ">
              <button> Export </button>
            </div>{" "}
          </div>
        </nav>

        <div className="bg-white flex flex-row justify-between border-b-2">
          {/* search button tab div */}
          <div className="">
            <SearchBar />
          </div>
          {/* user detail tab  */}
          <div className=" flex flex-row items-center gap-4 mr-5">
            {/* user menu div  */}

            {/* <div> grid view </div> */}
            <div>
              {/* three dot button */}
              <Tooltip title="Edit Column " placement="bottom" arrow>
                <MoreVertIcon />
              </Tooltip>
            </div>

            <div>
              <TuneIcon />
            </div>
          </div>
        </div>

        {/* table div*/}
        <div className="mt-2 border-2 table-container overflow-y-auto h-[32rem] ">
          <table className="w-full text-center ">
            <thead className="border-b-2">
              <tr>
                <th className="border-r-2 p-2">
                  <input
                    style={{
                      marginLeft: "4px",
                      paddingTop: "2px",
                      width: "16px",
                      height: "16px",
                      border: "2px solid #4F46E5",
                    }}
                    type="checkbox"
                    // checked={selectAll}
                    // onChange={handleSelectAll}
                  />
                </th>
                <th className="border-r-2 font-medium">Customer ID</th>
                <th className="border-r-2 font-medium">First Name</th>
                <th className="border-r-2 font-medium">Last Name </th>
                <th className="border-r-2 font-medium">Email</th>
                <th className="border-r-2 font-medium">Owner </th>
              </tr>
            </thead>
            <tbody className=" ">
              {data.map((single, index) => (
                <tr className="border-b" key={index}>
                  <td> <input
                    style={{
                      marginLeft: "4px",
                      paddingTop: "2px",
                      width: "16px",
                      height: "16px",
                      border: "2px solid #4F46E5",
                    }}
                    type="checkbox"
                    // checked={selectAll}
                    // onChange={handleSelectAll}
                  /></td>
                  <td className="p-2">C_ID-00{single.customerId}</td>
                  <td>{single.firstName}</td>
                  <td>{single.lastName}</td>
                  <td>{single.email}</td>
                  <td>{single.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <div>jai shree ram</div> */}
      </div>
    </>
  );
};

export default Customers;
