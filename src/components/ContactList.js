import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

function ContactList() {
  const [con, setCon] = useState([]);
  const [user, setUser] = useState([]);

  // Load Contact data
  useEffect(() => {
    const storedContact = JSON.parse(localStorage.getItem("contactdata")) || [];
    setCon(storedContact);
  }, []);

  // Load Login data
  useEffect(() => {
    const storedLogin = JSON.parse(localStorage.getItem("logindata")) || [];
    setUser(storedLogin);
  }, []);

  return (
    <>
      <Navbar />

      {/* CONTACT DETAILS */}
      <section>
        <div className="container my-5">
          <h2 className="text-center">Contact Details</h2>

          {con.length === 0 ? (
            <p className="text-center text-danger">Data Not Found</p>
          ) : (
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {con.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* LOGIN DETAILS */}
      <section>
        <div className="container my-5">
          <h2 className="text-center">Login Details</h2>

          {user.length === 0 ? (
            <p className="text-center text-danger">Data Not Found</p>
          ) : (
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Username</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {user.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}

export default ContactList;
