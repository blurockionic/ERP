import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainPage from "./pages/mainErp/MainPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NavBarforAllProjects from "../src/components/NavBarforAllProjects"
import LeadManagement from "./pages/leadManagement/LeadManagement";
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/dashboard"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* erp solution dashbord */}
        <Route path="/dashboard" element={<MainPage />}/>

        {/* //dashboard for lead management  */}
        <Route path="/leadmanagement-dashboard" element={<NavBarforAllProjects/>}>
          <Route path="" element={<Navigate to={"home"}/>}/>
          <Route path="home" element={<LeadManagement />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
