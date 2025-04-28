import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../src/assets/Register";
import Login from "../src/assets/login";
import UserInfo from "../src/assets/UserInfo";
import "./App.css";
import AllUser from "./assets/AllUser";
import ForgotPass from "./assets/ForgotPass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/users" element={<AllUser />} />
        <Route path="/forgot" element={<ForgotPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
