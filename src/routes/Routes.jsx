import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import MainScreen from "../pages/Dashboard/MainScreen";
import Header from "../components/atoms/Header";
import Sidebar from "../components/atoms/Sidebar";
import Login from "../pages/AuthPages/Login";
import Signup from "../pages/AuthPages/Signup"; // Corrected typo in import
import Profile from "../pages/AuthPages/Profile";
import Logout from "../pages/AuthPages/Logout";

import Contract from "../pages/TransactionPages/Contract/Contract"



const AppRoutes = () => {
    return (
      <Routes>
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="/" element={<Dashboard />}>
        <Route path="MainScreen" element={<MainScreen />} />
          <Route path="Sidebar" element={<Sidebar />} />
          <Route path="Header" element={<Header />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Logout" element={<Logout />} />

          <Route path="Contract" element={<Contract/>} />              
        </Route>
      </Routes>
    );
};

export default AppRoutes;
