import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../config/config";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../../components/Loader";
import SummaryCard from "../../../components/dashboard/SummaryCard";
import {
  CalendarCheck,
  CircleCheckBig,
  CookingPot,
  ListOrdered,
  User,
} from "lucide-react";
import MonthlyOrdersChart from "../../../components/dashboard/MonthlyOrdersChart";
import RecentEvents from "../../../components/dashboard/RecentEvents";
const Home = () => {
  const [customerDetails, setCustomerDetails] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${config.apiUrl}/order/all`, {
          withCredentials: true,
        });
        const { data, success } = response.data;
        if (success) {
          setCustomerDetails(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response);
        setIsLoading(false);
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
    const { cx, cy, fill, value, percent } = props;
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
      {isLoading ? (
        <div className="flex justify-center items-center h-[500px]">
          {" "}
          <Loader />{" "}
        </div>
      ) : (
        <div className="bg-gray-50 h-screen -z-10 px-10">
          {/* dashboard  */}

          <div className="flex flex-row justify-between  py-1.5 ">
            <div className="px-3 py-1.5 m-1 rounded-md font-semibold ">
              <h1 className="text-xl">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <input
                type="datetime-local"
                name="date"
                id="date"
                className="rounded-full px-4 border"
              />
              <button
                type="button"
                className="px-4  bg-white border rounded-full mx-2 shadow-sm"
              >
                Search
              </button>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="flex gap-7 px-5 py-1 bg-gray-400 rounded-full">
              <button type="button" className="bg-white px-4 rounded-full">
                Overview
              </button>
              <button type="button" className="bg-white px-4 rounded-full">
                Analytics
              </button>
            </div>
          </div>
          {/* count order  */}
          <div className="flex justify-between  mt-5">
            <SummaryCard
              title="Total Orders"
              icon={<CookingPot />}
              orderCount={120}
              percentageChange={15}
            />
            <SummaryCard
              title="Customers"
              icon={<User />}
              orderCount={400}
              percentageChange={-10}
            />
            <SummaryCard
              title="Event Done"
              icon={<CircleCheckBig />}
              orderCount={400}
              percentageChange={15}
            />
            <SummaryCard
              title="Upcomming Event"
              icon={<CalendarCheck />}
              orderCount={10}
              percentageChange={-2}
            />
          </div>

          {/* analytics  */}
          <div className="flex mt-5 gap-5">
            <div className="h-96 bg-white w-3/4 p-4 rounded-md shadow-lg">
              <h1 className="px-6 py-3 text-lg">Overview</h1>
              <MonthlyOrdersChart />
            </div>
            <div className="h-96 bg-white w-1/4 p-4 rounded-md shadow-lg">
              <RecentEvents />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
