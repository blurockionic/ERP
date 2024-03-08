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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/dashboard"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* erp solution dashbord */}
        <Route path="/dashboard" element={<MainPage />}>
          <Route path="manageusers" element={<ManageUsers />} />
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
      </Routes>
    </Router>
  );
}

export default App;