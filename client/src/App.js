import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainPage from "./pages/mainErp/MainPage";
import Login from "./pages/Lead_Management/auth/Login";

import LeadManagement from "./pages/Lead_Management/leadManagement/LeadManagement";
import Lead from "./pages/Lead_Management/lead/Lead";
import Tasks from "./pages/Lead_Management/task/Tasks";
import EventCalendar from "./pages/Lead_Management/calendar/EventCalendar";
import Dashboard from "./pages/Lead_Management/dashaboard/Dashboard";
import Customers from "./pages/Lead_Management/customers/Customers";
import Approval from "./pages/Lead_Management/approval/Approval";
import ManageUsers from "./pages/usermanage/ManageUsers";
import SoftwareOpenCard from "./pages/SoftwareOpenCard";
import OrderManagement from "./pages/orderManagement/OrderManagement";
import Order from "./pages/orderManagement/order/Order";
import Om_Dashboard from "./pages/orderManagement/om_dashboard/Om_Dashboard";

import OrderCaters from "./pages/orderManagement/order/OrderCaters";
import OrderCalendar from "./pages/orderManagement/calendar/OrderCalendar";
import OrderDetails from "./pages/orderManagement/order/OrderDetails";
import Signup from "./pages/Lead_Management/auth/Signup";
import Inventory from "./pages/orderManagement/inventory/Inventory";
import Customer from "./pages/orderManagement/customer/Customer";
import ActiveOrder from "./pages/orderManagement/order/ActiveOrder";
import { OrderDataContextProvider } from "./context/OrderdataContext";
import CustomerProfilePage from "./pages/orderManagement/customer/CustomerProfilePage";

function App() {
  return (
    <Router>
      <OrderDataContextProvider>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={"/dashboard/softwareopencard"} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* erp solution dashbord */}
          <Route path="/dashboard" element={<MainPage />}>
            <Route path="manageusers" element={<ManageUsers />} />
            <Route path="softwareopencard" element={<SoftwareOpenCard />} />
          </Route>

          {/* //dashboard for lead management  */}
          <Route path="/leadmanagement-dashboard" element={<LeadManagement />}>
            <Route path="" element={<Navigate to={"lead"} />} />
            <Route path="home" element={<Dashboard />} />
            <Route path="lead" element={<Lead />} />
            <Route path="task" element={<Tasks />} />
            <Route path="calendar" element={<EventCalendar />} />
            <Route path="approval" element={<Approval />} />

            <Route path="customer" element={<Customers />} />
          </Route>

          {/* // Dashboard for the Order  Management */}
          <Route
            path="/orderManagement-dashboard"
            element={<OrderManagement />}
          >
            <Route path="" element={<Navigate to={"order"} />} />
            <Route path="home" element={<Om_Dashboard />} />
            <Route path="order" element={<Order />} />
            <Route path="orderdetails/:id" element={<OrderDetails />} />
            {/* Add the route for ActiveOrder here */}
            <Route path="activeOrder" element={<ActiveOrder />} />
            <Route path="neworder" element={<OrderCaters />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="customer" element={<Customer />} />
            {/* this is another way to send the id in url */}
            {/* <Route path="customer/customerProfileDetails/:id" element={<CustomerProfilePage />}
            /> */}
            <Route path="customer/customerProfileDetails" element={<CustomerProfilePage />} />

            <Route path="calendar" element={<OrderCalendar />} />
          </Route>
        </Routes>
      </OrderDataContextProvider>
    </Router>
  );
}

export default App;
