import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import MainPage from "./pages/mainErp/MainPage";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainPage/>}>
          {/* Default route, render LeadManagement */}
        
        </Route>
      </Routes>
    </Router>
   );
  }
  
  export default App;
  