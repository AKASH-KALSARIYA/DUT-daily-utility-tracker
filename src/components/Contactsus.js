import React from "react";
import { useState } from "react";

function Contactsus() {
  const [form, setform] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handlechange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    const olddata = JSON.parse(localStorage.getItem("contactdata")) || [];
    const updateData = [...olddata, form];
    localStorage.setItem("contactdata", JSON.stringify(updateData));
    setform({ name: "", email: "", message: "" });
    alert("message submitted successfully");
  };
  return (
    <>
      <section id="contactus">
        <div className="container my-5">
          {/* Heading */}
          <div className="text-center mb-4">
            <h1 className="fw-bold">Contact Us</h1>
            <p className="text-muted">
              We’d love to hear from you. Please fill out the form below.
            </p>
          </div>

          <div className="row align-items-center">
            <div className="col-md-6">
              <form
                className="card p-5 shadow-sm contact-form-card fade-in-up"
                onSubmit={handlesubmit}
              >
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    className="form-control"
                    onChange={handlechange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    className="form-control"
                    placeholder="Enter your email"
                    onChange={handlechange}
                    required
                  />
                </div>

                {/* Message */}
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    className="form-control"
                    rows="4"
                    placeholder="Write your message"
                    onChange={handlechange}
                    required
                  ></textarea>
                </div>

                {/* Button */}
                <button type="submit" className="btn btn-primary w-100">
                  Send Message
                </button>
              </form>
            </div>
            <div className="col-md-6">
              <iframe
                title="Google Map Location Surat"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.52982230402!2d72.8222859!3d21.15920015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1770787433707!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contactsus;
