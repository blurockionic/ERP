import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Lead_Management/auth/Login";

import Order from "./pages/orderManagement/order/Order";
import OrderCalendar from "./pages/orderManagement/order/calendar/OrderCalendar";
import OrderCaters from "./pages/orderManagement/order/OrderCaters";

import OrderDetails from "./pages/orderManagement/order/OrderDetails";
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
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/orderManagement/home/Home";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import ManageUser from "./pages/orderManagement/manage user/ManageUser";
import SubscriptionPlan from "./pages/orderManagement/subscription/SubscriptionPlan";
import PaymentHistory from "./pages/orderManagement/payment/PaymentHistory";
import ForgotPassword from "./pages/orderManagement/auth/ForgotPassword";
import ResetPassword from "./pages/orderManagement/auth/ResetPassword";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  if (!currentUser) {
    <Login />;
  }
  return (
    <OrderDataContextProvider>
      {currentUser && <Header />}
      <Routes>
        {/* <Route path="/" element={<Navigate to={"/login"} />} /> */}
        <Route path="/login" element={<Login />} />
        {/* //dashboard for lead management  */}
        {/* <Route path="/leadmanagement-dashboard" element={<LeadManagement />}>
          <Route path="" element={<Navigate to={"lead"} />} />
          <Route path="home" element={<Dashboard />} />
          <Route path="lead" element={<Lead />} />
          <Route path="task" element={<Tasks />} />
          <Route path="calendar" element={<EventCalendar />} />
          <Route path="approval" element={<Approval />} />
          <Route path="customer" element={<Customers />} />
        </Route> */}

        {/* // Dashboard for the Order  Management */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Navigate to={"order"} />} />
          <Route path="home" element={<Home />} />
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
        <Route path="manage-user" element={<ManageUser />} />
        <Route path="subscription-plan" element={<SubscriptionPlan />} />
        <Route path="payment-history" element={<PaymentHistory />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset" element={<ResetPassword />} />
      </Routes>
    </OrderDataContextProvider>
  );
}

export default App;
