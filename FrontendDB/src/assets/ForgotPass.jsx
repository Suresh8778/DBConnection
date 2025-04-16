import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = () => {
    setEmail(""), setNewPassword("");
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch("http://localhost:5175/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password updated successfully");
        navigate("/login");
      } else {
        alert(data.message || "Failed to update password");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="form-container my-5">
        <div className="form p-3">
          <p className="form-head">FORGOT PASSWORD</p>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email :
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              New Passowrd :
            </label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="reset"
              className="btn btn-primary"
              onClick={handleReset}
            >
              Reset
            </button>
            <button className="btn btn-success" onClick={handleUpdate}>
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
