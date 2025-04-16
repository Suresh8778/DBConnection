import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { name, email, password, phone } = formData;

    if (!name || !email || !password || !phone) {
      alert("All fields are required.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5175/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registered successfully!");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server error");
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", password: "", phone: "" });
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="form-container my-5">
        <div className="form p-3">
          <p className="form-head">REGISTER</p>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Username :
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your Name"
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email :
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your Email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password :
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your Password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone :
            </label>
            <input
              type="number"
              name="phone"
              className="form-control"
              placeholder="Enter your Phone Number"
              onChange={handleChange}
              value={formData.phone}
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
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
          <div className="mt-4 text-center">
            <span className="fs-small">
              Already have an Account?{" "}
              <a href="/login" className="text-decoration-none text-dark">
                <u>Login</u>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
