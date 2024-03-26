import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TuneIcon from "@mui/icons-material/Tune";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import config from "../../../config/config";
import SearchBar from "../../../components/SearchBar";
import { Link } from "react-router-dom";
import CreateAllOrders from "../../../components/CreateAllOrders";

const Order = () => {

  const [showModel, setShowModel] = useState(false);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [viewOrder, setViewOrder] = useState(true);
  const [activeButton, setActiveButton] = useState("view");

  const [allBistarOrder, setAllBistarOrder] = useState([]);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [indexNumber, setIndexNumber] = useState(0);

  useEffect(() => {
    const fetchAllBistarOrder = async () => {
      const response = await axios.get(`${config.apiUrl}/bistar/all`, {
        withCredentials: true,
      });
      console.log("DATA", response);

      const { status, data } = response;
      if (status === 200) {
        console.log(data);
        setAllBistarOrder(data);
      }
    };

    //invoke
    fetchAllBistarOrder();
  }, []);

  // handle view  order details

  const ViewOrderDetailsHandler = () => {
    setActiveButton("view");
    setShowModel(false);
    setViewOrder(true);
  };
  // create button handler
  const CreateOrderHandler = () => {
    setActiveButton("create");
    setViewOrder(false);
    setShowModel(true);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(
      selectAll
        ? []
        : Array.from({ length: allBistarOrder.length }, (_, index) => index)
    );
  };
  // Function to handle individual row selection
  const handleRowSelect = (rowIndex) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowIndex)) {
        return prevSelectedRows.filter((row) => row !== rowIndex);
      } else {
        return [...prevSelectedRows, rowIndex];
      }
    });
  };



  //handle for save the updated details
  const handleOnSave = () => {
    setIsUpdateClicked(false);
  };

  return (
    <div className=" w-full ">
      <nav className="bg-white flex flex-row justify-between border-b-2">
        {/* company Details  */}
        <div className="flex items-center">
          <Link>
            <button
              className={`p-2 m-2 rounded ${
                activeButton === "view" ? "bg-slate-100" : "bg-white"
              }`}
              onClick={ViewOrderDetailsHandler}
            >
              View Order Details
            </button>
          </Link>

          <Link>
            <button
              className={`p-2 m-2 rounded ${
                activeButton === "create" ? "bg-slate-100" : "bg-white"
              }`}
              onClick={CreateOrderHandler}
            >
              Create Order
            </button>
          </Link>
        </div>

        <div className="bg-white flex flex-row justify-between border-b-2">
          {/* search button tab div */}
          <div className="pt-1">
            <SearchBar />
          </div>
          {/* user detail tab  */}
          <div className=" flex flex-row items-center gap-4 mr-5">
            {/* user menu div  */}

            <div>
              {/* three dot button */}
              <Tooltip title="Edit Column " placement="bottom" arrow>
                <MoreVertIcon />
              </Tooltip>
            </div>

            <div>
              <Tooltip title="Fillter" placement="bottom" arrow>
                <TuneIcon />
              </Tooltip>
            </div>
          </div>
        </div>
      </nav>

      {/* table div*/}
      {viewOrder && (
        <div className="mt-2 border-2 table-container h-[35rem] overflow-y-auto">
          <table className="w-full text-center">
            <thead className="sticky top-0 bg-slate-300 ">
              <tr>
                <th className="border-r-2 p-2 ">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-green-600"
                    style={{
                      marginTop: "1px", // Adjust vertical alignment if necessary
                    }}
                    checked={selectAll}
                    onChange={handleSelectAll}
                 
                  />
                </th>
                <th className=" border-r-2 ">Order Id</th>
                <th className=" border-r-2 ">Mobile Number</th>
                <th className="border-r-2">Name </th>
                <th className="border-r-2">Address</th>
                <th className="border-r-2">Date & Time </th>
                <th className="border-r-2">Type of Order</th>
                <th className="border-r-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal overflow-y-auto mt-4 ">
              {allBistarOrder.map((order, index) => (
                <tr
                  className={`border-b ${
                    index + 1 === indexNumber &&
                    isUpdateClicked === true &&
                    "bg-slate-100"
                  }`}
                  key={index}
                >
                  <td className="py-2  border-r-2 text-center font-bold">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleRowSelect(index)}
                    />
                  </td>
                  <td className="py-2   text-center  ">
                    {"BIS-" + (index + 1)}
                  </td>
                  <td className="py-2   text-center ">
                    {order.mobileNumber === "" ? (
                      "-"
                    ) : (
                      <input
                        type={
                          index + 1 === indexNumber && isUpdateClicked === true
                            ? "text"
                            : null
                        }
                        disabled={
                          index + 1 === indexNumber && isUpdateClicked === true
                            ? false
                            : true
                        }
                        value={order.phoneNumber}
                        className={`border ${
                          index + 1 === indexNumber &&
                          isUpdateClicked === true &&
                          "border-green-500"
                        }`}
                      />
                    )}
                  </td>
                  <td className="py-2  text-center ">
                    {order.name === "" ? (
                      "-"
                    ) : (
                      <input
                        type={
                          index + 1 === indexNumber && isUpdateClicked === true
                            ? "text"
                            : null
                        }
                        disabled={
                          index + 1 === indexNumber && isUpdateClicked === true
                            ? false
                            : true
                        }
                        value={order.name}
                        className={`border ${
                          index + 1 === indexNumber &&
                          isUpdateClicked === true &&
                          "border-green-500"
                        }`}
                      />
                    )}
                  </td>
                  <td className="py-2   text-center ">
                    {order.address === "" ? (
                      "-"
                    ) : (
                      <input
                        type={
                          index + 1 === indexNumber && isUpdateClicked === true
                            ? "text"
                            : null
                        }
                        disabled={
                          index + 1 === indexNumber && isUpdateClicked === true
                            ? false
                            : true
                        }
                        value={order.address}
                        className={`border w-full ${
                          index + 1 === indexNumber &&
                          isUpdateClicked === true &&
                          "border-green-500"
                        }`}
                      />
                    )}
                  </td>
                  <td className="py-2   text-center ">
                    {order.dateAndTime === "" ? (
                      "-"
                    ) : (
                      <input
                        type={
                          index + 1 === indexNumber && isUpdateClicked === true
                            ? "date"
                            : "text"
                        }
                        disabled={
                          index + 1 === indexNumber && isUpdateClicked === true
                            ? false
                            : true
                        }
                        value={order.dateAndTime}
                        className={`border ${
                          index + 1 === indexNumber &&
                          isUpdateClicked === true &&
                          "border-green-500"
                        }`}
                      />
                    )}
                  </td>
                  <td className="py-2  text-center ">
                    {order.orderType === "" ? "-" : order.orderType}
                  </td>
                  <td className="py-2 text-center flex justify-evenly cursor-pointer">
                    {index + 1 === indexNumber && isUpdateClicked === true ? (
                      <span
                        className="bg-green-50 px-4 border rounded-full"
                        onClick={() => handleOnSave()}
                      >
                        Save
                      </span>
                    ) : (
                      <EditIcon />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showModel && <CreateAllOrders setShowModel={setShowModel} />}
    </div>
  );
};

export default Order;
