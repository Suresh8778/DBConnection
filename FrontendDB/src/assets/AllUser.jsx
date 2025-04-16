import React, { useState, useEffect } from "react";

function AllUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5175/users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        alert("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container text-center my-5">
      <h4>User List</h4>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllUser;
