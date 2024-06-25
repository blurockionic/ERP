import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
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
import OrderCalendar from "./pages/orderManagement/order/calendar/OrderCalendar";
import OrderCaters from "./pages/orderManagement/order/OrderCaters";

import OrderDetails from "./pages/orderManagement/order/OrderDetails";
import Signup from "./pages/Lead_Management/auth/Signup";
import Inventory from "./pages/orderManagement/inventory/Inventory";
import Customer from "./pages/orderManagement/customer/Customer";
import ActiveOrder from "./pages/orderManagement/order/ActiveOrder";
import { OrderDataContextProvider } from "./context/OrderdataContext";
import CustomerProfilePage from "./pages/orderManagement/customer/CustomerProfilePage";

import AllRecipes from "./pages/orderManagement/recipes/AllRecipes";
import CreateNewRecipe from "./pages/orderManagement/recipes/CreateNewRecipe";
import GeneratePurchaseDetails from "./pages/orderManagement/purchase/GeneratePurchaseDetails";
import SeeMoreDetailsOfRecipe from "./pages/orderManagement/recipes/SeeMoreDetailsOfRecipe";
import Purchase from "./pages/orderManagement/purchase/Purchase";
import Home from "./pages/company/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LoginForm from "./components/LoginForm";

function App() {
  const { isAuthenticated } = useSelector((state) => state?.signInCredential);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Simulated authentication check using localStorage
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (token) {
      // If token exists, assume user is authenticated
      dispatch({
        type: "SIGN_IN_AUTHENTICATE",
        payload: { isAuthenticated: true, user: user },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    // Redirect to dashboard/home when isAuthenticated changes to true
    if (isAuthenticated) {
      navigate("./dashboard/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <OrderDataContextProvider>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* erp solution dashbord */}
        <Route path="/dashboard" element={<MainPage />}>
          <Route path="home" element={<Home />} />
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
        <Route path="/orderManagement-dashboard" element={<OrderManagement />}>
          <Route path="" element={<Navigate to={"order"} />} />
          <Route path="home" element={<Om_Dashboard />} />
          <Route path="order" element={<Order />} />
          <Route path="orderdetails/:id" element={<OrderDetails />} />
          {/* Add the route for ActiveOrder here */}
          <Route path="activeOrder" element={<ActiveOrder />} />
          <Route path="neworder" element={<OrderCaters />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="order/calendar" element={<OrderCalendar />} />
          <Route path="customer" element={<Customer />} />
          {/* this is another way to send the id in url */}
          {/* <Route path="customer/customerProfileDetails/:id" element={<CustomerProfilePage />}
            /> */}
          <Route
            path="customer/customerProfileDetails"
            element={<CustomerProfilePage />}
          />
          <Route path="allRecipes" element={<AllRecipes />} />
          <Route path="createNewRecipes" element={<CreateNewRecipe />} />
          <Route
            path="generate-purchase"
            element={<GeneratePurchaseDetails />}
          />
          <Route
            path="allRecipes/seeMoreDetailsOfRecipe"
            element={<SeeMoreDetailsOfRecipe />}
          />
        </Route>
      </Routes>
    </OrderDataContextProvider>
  );
}

export default App;
