import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainPage from "./pages/mainErp/MainPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import LeadManagement from "./pages/leadManagement/LeadManagement";
import Lead from "./pages/lead/Lead";
import Tasks from "./pages/task/Tasks";
import EventCalendar from "./pages/calendar/EventCalendar";
import Dashboard from "./pages/dashaboard/Dashboard";
import Customers from "./pages/customers/Customers";
import Approval from "./pages/approval/Approval";
import ManageUsers from "./pages/usermanage/ManageUsers";
import SoftwareOpenCard from "./pages/SoftwareOpenCard";
import OrderManagement from "./pages/orderManagement/OrderManagement";
import Order from "./pages/orderManagement/order/Order"
import Om_Dashboard from "./pages/orderManagement/om_dashboard/Om_Dashboard";
import OrderCalendar from "./pages/orderManagement/calendar/OrderCalendar";
function App() {
  return (
    <Router>
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
        <Route path="/orderManagement-dashboard" element={<OrderManagement />}>
          <Route path="" element={<Navigate to={"order"} />} />
          <Route path="home" element={<Om_Dashboard/>} />
          <Route path="order" element={<Order/>} />
          <Route path="task" element={<Tasks />} />
          <Route path="calendar" element={<OrderCalendar />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
