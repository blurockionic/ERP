import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../config/config";
import Loader from "../../../components/Loader";
import SummaryCard from "../../../components/dashboard/SummaryCard";
import {
  CalendarCheck,
  CircleCheckBig,
  CookingPot,
  RefreshCcwIcon,
  Search,
  User,
} from "lucide-react";
import MonthlyOrdersChart from "../../../components/dashboard/MonthlyOrdersChart";
import RecentEvents from "../../../components/dashboard/RecentEvents";
import { useSelector } from "react-redux";
const Home = () => {
  const [customerDetails, setCustomerDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  const years = [2021, 2022, 2023, 2024];

  const months = [
    { value: 0, name: "January" },
    { value: 1, name: "February" },
    { value: 2, name: "March" },
    { value: 3, name: "April" },
    { value: 4, name: "May" },
    { value: 5, name: "June" },
    { value: 6, name: "July" },
    { value: 7, name: "August" },
    { value: 8, name: "September" },
    { value: 9, name: "October" },
    { value: 10, name: "November" },
    { value: 11, name: "December" },
  ];

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${config.apiUrl}/order/all`, {
          withCredentials: true,
        });
        const { data, success } = response.data;
        //filter data by company
        const filterDataByCompany = data.filter(
          (order) => order.companyId === currentUser?.companyId
        );
        if (success) {
          console.log(filterDataByCompany);
          setCustomerDetails(filterDataByCompany);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response);
        setIsLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [currentUser?.companyId]);

  //filter catering order
  const orderDone = customerDetails.filter(
    (customer) => customer.orderStatus === "Completed"
  );
  const upcomingEvent = customerDetails.filter(
    (customer) => customer.orderStatus === "Confirmed"
  );

  //filter customer
  const uniqueCustomers = customerDetails.filter(
    (customer, index, self) =>
      index === self.findIndex((c) => c.customerName === customer.customerName)
  );

  // get percentage

  // recent event
  const recentEvent = customerDetails.filter((customer) => {
    const eventDate = new Date(customer.createdAt);
    const now = new Date();

    // Get start of today
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    // Get start of the week (assuming week starts on Sunday)
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay());

    // Check if the event is between start of the week and start of today
    return eventDate >= startOfWeek && eventDate < startOfToday;
  });

  // Function to get the total orders for a given month and year
  const getOrdersForMonth = (orders, year, month) => {
    return orders
      .filter((order) => {
        const orderDate = new Date(order.date);
        return (
          orderDate.getFullYear() === year && orderDate.getMonth() === month
        );
      })
      .reduce((sum, order) => sum + order.order, 0);
  };

  //get percentage from last month
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const currentMonthOrders = getOrdersForMonth(
    customerDetails,
    currentYear,
    currentMonth
  );
  const previousMonthOrders = getOrdersForMonth(
    customerDetails,
    previousMonthYear,
    previousMonth
  );

  const percentageChange = previousMonthOrders
    ? ((currentMonthOrders - previousMonthOrders) / previousMonthOrders) * 100
    : 0;

  // handle for change month
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  //handle for change year
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log(
      `Searching for ${months[selectedMonth]?.name || "N/A"} ${selectedYear}`
    );

    if (selectedMonth === "" || selectedYear === "") {
      alert("Please select both month and year.");
      return;
    }

    const monthIndex = parseInt(selectedMonth, 10);
    const year = parseInt(selectedYear, 10);

    const filtered = customerDetails.filter((customer) => {
      const orderDate = new Date(customer.dateAndTime);
      return (
        orderDate.getMonth() === monthIndex && orderDate.getFullYear() === year
      );
    });

    setCustomerDetails(filtered);
  };

  const handleOnRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-auto">
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
              <select
                name="month"
                id="month"
                className="rounded-full px-4 border"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                <option value="" className="rounded-full px-4 border">
                  Select Month
                </option>
                {months.map((month) => (
                  <option
                    key={month.value}
                    value={month.value}
                    className="rounded-full px-4 border"
                  >
                    {month.name}
                  </option>
                ))}
              </select>
              <select
                name="year"
                id="year"
                className="rounded-full px-4 border"
                value={selectedYear}
                onChange={handleYearChange}
              >
                <option value="" className="rounded-full px-4 border">
                  Select Year
                </option>
                {years.map((year) => (
                  <option
                    key={year}
                    value={year}
                    className="rounded-full px-4 border"
                  >
                    {year}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="pr-2 bg-white border rounded-full mx-2 shadow-sm flex items-center"
                onClick={handleSearch}
              >
                 <Search className="mx-2" size={20}/>
                 <span>Search</span>
              </button>
              <button
                type="button"
                className="pr-2 bg-white border rounded-full mx-2 shadow-sm flex items-center"
                onClick={handleOnRefresh}
              >
                <RefreshCcwIcon className="mx-2" size={20}/>
                <span className="">Refresh</span>
              </button>
            </div>
          </div>
          {/* <div className="flex justify-start">
            <div className="flex gap-7 px-5 py-1 bg-gray-400 rounded-full">
              <button type="button" className="bg-white px-4 rounded-full">
                Overview
              </button>
              <button type="button" className="bg-white px-4 rounded-full">
                Analytics
              </button>
            </div>
          </div> */}
          {/* count order  */}
          <div className="flex justify-between  mt-5">
            <SummaryCard
              title="Total Orders"
              icon={<CookingPot />}
              orderCount={customerDetails.length}
              percentageChange={percentageChange.toFixed(0)}
            />
            <SummaryCard
              title="Customers"
              icon={<User />}
              orderCount={uniqueCustomers.length}
              percentageChange={percentageChange.toFixed(0)}
            />
            <SummaryCard
              title="Event Done"
              icon={<CircleCheckBig />}
              orderCount={orderDone.length}
              percentageChange={percentageChange.toFixed(0)}
            />
            <SummaryCard
              title="Upcomming Event"
              icon={<CalendarCheck />}
              orderCount={upcomingEvent.length}
              percentageChange={percentageChange.toFixed(0)}
            />
          </div>

          {/* analytics  */}
          <div className="flex mt-5 gap-5">
            <div className="h-[400px] bg-white w-3/4 p-4 rounded-md shadow-lg">
              <h1 className="px-6 py-3 text-lg">Overview</h1>
              <MonthlyOrdersChart orders={customerDetails} />
            </div>
            <div className="h-[400px] bg-white w-1/4 p-4 rounded-md shadow-lg">
              <RecentEvents recentEvent={recentEvent} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
