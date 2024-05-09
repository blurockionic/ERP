import React, { useEffect, useState, PureComponent } from "react";
import TabButtons from "../../../components/TabButtons";
import axios from "axios";
import config from "../../../config/config";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
} from "recharts";

const Om_Dashboard = () => {
  const [customerDetails, setCustomerDetails] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  let catringGraph = [];

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/order/all`, {
          withCredentials: true,
        });
        const { data, success } = response.data;
        if (success) {
          setCustomerDetails(data);
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchCustomerDetails();
  }, []);

  //filter catering order
  const cateringOrdered = customerDetails.filter(
    (customer) => customer.isCateringOrdered === true
  );
  const tentOrder = customerDetails.filter(
    (customer) => customer.isTentOrdered === true
  );
  const lightOrder = customerDetails.filter(
    (customer) => customer.isLightOrdered === true
  );
  const bistar = customerDetails.filter(
    (customer) => customer.isBistarOrdered === true
  );

  // for (let i = 0; i < customerDetails.length; i++) {
  //   if (customerDetails[i].isCateringOrdered === true) {
  //     cateringOrdered.push({
  //       name: customerDetails.customerName,
  //       order: customerDetails.filter(
  //         (customer) => customer.isCateringOrdered === true
  //       ),
  //     });
  //   }
  // }

  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  const renderActiveShape = (props) => {
    const { cx, cy, fill, value, percent, midAngle } = props;
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {value}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={60}
          outerRadius={80}
          startAngle={props.startAngle}
          endAngle={props.endAngle}
          fill={fill}
        />
        <text
          x={cx}
          y={cy}
          dy={25}
          textAnchor="middle"
          fill="#333"
          fontSize={14}
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  return (
    <>
      {/* <div className=" xl:w-full">
       
        <nav className="bg-slate-100 flex flex-row border-b-2">
         
          <div className="text-sm w-[7rem] text-center m-2 bg-[#d0dde0dd] p-2 font-semibold rounded-md">
            <button onClick={allOrderhandler}>All Type Order</button>{" "}
          </div>
          <div className="text-sm  w-[7rem] text-center m-2 bg-[#FAF3DD] p-2 font-semibold rounded-md">
            <button className="" onClick={otherDetailsHandler}>
              Other Details
            </button>{" "}
          </div>
        </nav>
      </div> */}

      {/* Crad div  */}
      {/* {orderModel && <TabButtons />} */}
      {/* 
      {otherDetails && (
        <>
          <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Coming Soon!</h2>
            <p className="text-lg text-gray-100">
              We're working on bringing you an exciting new feature. Stay tuned!
            </p>
          </div>
        </>
      )} */}

      <div className="bg-gray-50 h-screen">
        {/* dashboard  */}

        <div className="flex flex-row justify-between border-b py-1.5">

        <div className="px-3 py-1.5 m-1 rounded-md font-semibold cursor-pointer bg-gray-200 border ">
          <h1 className="">Dashboard</h1>
        </div>
        </div>
        {/* count order  */}
        <div className="flex justify-between mx-2 mt-2">
          {/* total order count  */}
          <div className="w-64 h-44 bg-white border shadow-sm rounded p-4">
            <h2 className="text-md font-thin">Total Order</h2>
            <h1 className="text-2xl font-semibold">{customerDetails.length}</h1>
            <p className="text-sm font-thin text-gray-600">
              <span className="text-green-500">+20% </span>sale increment
            </p>
            <div style={{ width: "100%", height: "50%" }} className="p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* catering order */}
          <div className="w-64 h-44 bg-white border shadow-sm rounded p-4">
            <h2 className="text-md font-thin">Catering Order</h2>
            <h1 className="text-2xl font-semibold">{cateringOrdered.length}</h1>
            <p className="text-sm font-thin text-gray-600">
              <span className="text-green-500">+20% </span>sale increment
            </p>
            <div style={{ width: "100%", height: "50%" }} className="p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cateringOrdered}>
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* tent order */}
          <div className="w-64 h-44 bg-white border shadow-sm rounded p-4">
            <h2 className="text-md font-thin">Tent Order</h2>
            <h1 className="text-2xl font-semibold">{tentOrder.length}</h1>
            <p className="text-sm font-thin text-gray-600">
              <span className="text-green-500">+20% </span>sale increment
            </p>
            <div style={{ width: "100%", height: "50%" }} className="p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* light order */}
          <div className="w-64 h-44 bg-white border shadow-sm rounded p-4">
            <h2 className="text-md font-thin">Light Order</h2>
            <h1 className="text-2xl font-semibold">{lightOrder.length}</h1>
            <p className="text-sm font-thin text-gray-600">
              <span className="text-green-500">+20% </span>sale increment
            </p>
            <div style={{ width: "100%", height: "50%" }} className="p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* bistar order */}
          <div className="w-64 h-44 bg-white border shadow-sm rounded p-4">
            <h2 className="text-md font-thin">Bister Order</h2>
            <h1 className="text-2xl font-semibold">{bistar.length}</h1>
            <p className="text-sm font-thin text-gray-600">
              <span className="text-green-500">+20% </span>sale increment
            </p>
            <div style={{ width: "100%", height: "50%" }} className="p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* customer  */}
        <div className="flex justify-around mt-2 mx-16">
          <div className="flex justify-between w-64 h-auto bg-white border shadow-sm rounded p-4">
            <div>
              <h2 className="text-sm font-thin">Total Customer</h2>
              <h1 className="text-2xl font-semibold">2382</h1>
            </div>
            <div>
              <Diversity3Icon className="w-40 h-40" />
            </div>
          </div>
          <div className="w-64 h-auto bg-white border shadow-sm rounded p-4">
            <h2 className="text-sm font-thin">New Customer</h2>
            <h1 className="text-2xl font-semibold">2382</h1>
          </div>
          <div className="w-64 h-auto bg-white border shadow-sm rounded p-4">
            <h2 className="text-sm font-thin">Trusted Customer</h2>
            <h1 className="text-2xl font-semibold">2382</h1>
          </div>
          <div className="w-64 h-auto bg-white border shadow-sm rounded p-4">
            <h2 className="text-sm font-thin">Repeated Order</h2>
            <h1 className="text-2xl font-semibold">2382</h1>
          </div>
        </div>

        {/* analytics  */}
        <div className="w-full mx-16 flex justify-evenly">
          <div>
            {" "}
            <ResponsiveContainer width="100%" height={400}>
              <PieChart width={400} height={400}>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Om_Dashboard;
