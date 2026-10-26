import React from "react";
import Aboutus from "./Aboutus";
import Contactsus from "./Contactsus";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Main() {
  return (
    <>
      {/* HERO SECTION */}
      <section id="main">
        <div className="bg-image d-flex align-items-center justify-content-center text-center">
          <div className="bg-overlay"></div>

          <div className="hero-content text-light px-3">
            <h1 className="fw-bold display-5 text-primary">
              DAILY UTILITY APP
            </h1>

            <button className="banner-btn mt-3">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <Aboutus />

      {/* UTILITIES SECTION */}
      <div className="container my-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold">Daily Utility App</h1>
          <p className="text-muted">
            Manage your daily tasks, expenses, and more in one place
          </p>
        </div>

        <div className="row g-4">
          {/* TODO */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card text-center h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Todo</h5>
                <p className="card-text">Manage your daily tasks</p>
                <Link className="btn btn-primary" to="/dailytodo">
                  Open
                </Link>
              </div>
            </div>
          </div>

          {/* EXPENSE */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card text-center h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Expense</h5>
                <p className="card-text">Track your expenses</p>
                <Link className="btn btn-primary" to="/expense">
                  Open
                </Link>
              </div>
            </div>
          </div>

          {/* WEATHER */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card text-center h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Weather</h5>
                <p className="card-text">Check today’s weather</p>
                <Link className="btn btn-primary" to="/weather">
                  Open
                </Link>
              </div>
            </div>
          </div>

          {/* NEWS */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card text-center h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">News</h5>
                <p className="card-text">Read latest news</p>
                <Link className="btn btn-primary" to="/news">
                  Open
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Contactsus />
      <Footer />
    </>
  );
}

export default Main;
