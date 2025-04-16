import React, { useEffect, useState } from "react";

function UserInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="container">
      <h4 className="text-center my-5">User Info</h4>

      <p
        className="text-success text-center my-3"
        style={{ fontSize: "24px", fontWeight: "bold" }}
      >
        Login Successfully!!!
      </p>

      {user && (
        <p style={{ fontSize: "18px" }} className="text-center my-4">
          Hi, I am <span className="text-danger">{user.name}</span> and my email
          is <span className="text-danger">{user.email}</span> and my phone
          number is <span className="text-danger">{user.phone}</span> and I'm
          from Tiruppur.
        </p>
      )}
    </div>
  );
}

export default UserInfo;
