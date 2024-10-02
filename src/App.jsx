import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./Components/Pages/Login/login";
import Register from "./Components/Pages/Register/Register";
import SideMenu from "./Components/SideMenu/SideMenu";

export const Context = React.createContext();

const App = () => {
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const excludedPaths = ["/register", "/"];

  const showSideMenu = !excludedPaths.includes(location.pathname);

  return (
    <Context.Provider value={{ drawerVisible, setDrawerVisible }}>
      {showSideMenu && <SideMenu />}
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Context.Provider>
  );
};

export default App;
