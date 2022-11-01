import React from 'react'
import { Link } from 'react-router-dom'
import Card from "react-bootstrap/Card";
import "../home/home.css";

function Home() {


  return (
    <div className="container-lg">
      <div
        className="alert alert-warning mt-5"
        style={{ textAlign: "center", maxWidth: "700px", margin: "auto" }}
      >
        <h3>Digital Democracy</h3>
        <hr />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-exclamation-triangle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <p>Application currently under construction.</p>
      </div>

      {/* <div className="row">
        <div className="col-12 col-sm-6">
          <div className="card-header mt-5">
            <h4>Features</h4>
          </div>
          <ul
            className="list-group list-group-flush"
            style={{ boxShadow: "10px 5px 5px" }}
          >
            <li className="list-group-item">
              <Link className="link-info" to="/comparison">
                Politician Comparison
              </Link>
            </li>
            <li className="list-group-item">
              <Link className="link-info" to="/profile/Ted%20Cruz">
                Politician Profile
              </Link>
            </li>
            <li className="list-group-item">
              <Link className="link-info" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="list-group-item">
              <Link className="link-info" to="/districtmap">
                District Map
              </Link>
            </li>
            <li className="list-group-item">
              <Link className="link-info" to="/donations">
                Donations
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-12 col-sm-6">
          <div className="card-header mt-5">
            <h4>Components</h4>
          </div>
          <ul
            className="list-group list-group-flush"
            style={{ boxShadow: "10px 5px 5px" }}
          >
            <li className="list-group-item">
              <Link className="link-info" to="/signup">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </div> */}

      {/*  ||||||||||| new feature section here using react Bootstrap ||||||||||||*/}

      <div className="card-header mt-5 mb-3" style={{ textAlign: "center" }}>
        <h4>FEATURES</h4>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}>
          {/* Politician Comparision */}

          <Card.Link className="card-link" href="/comparison">
            <Card
              className="card-styles"
              style={{ width: "18rem", marginBottom: "1%", height: "200px" }}
            >
              <Card.Body>
                <Card.Title>Politician Comparison</Card.Title>
              </Card.Body>
            </Card>
          </Card.Link>
          {/* Politician Profile */}

          <Card.Link className="card-link" href="/profile/Ted%20Cruz">
            <Card
              className="card-styles"
              style={{ width: "18rem", marginBottom: "1%", height: "200px" }}
            >
              <Card.Body>
                <Card.Title>Politician Profile</Card.Title>
              </Card.Body>
            </Card>
          </Card.Link>

          {/* Dashboard */}

          <Card.Link className="card-link" href="/dashboard">
            <Card
              className="card-styles"
              style={{ width: "18rem", marginBottom: "1%", height: "200px" }}
            >
              <Card.Body>
                <Card.Title>Dashboard</Card.Title>
              </Card.Body>
            </Card>
          </Card.Link>

          {/* Disrict Map */}

          <Card.Link className="card-link" href="/districtmap">
            <Card
              className="card-styles"
              style={{ width: "18rem", marginBottom: "1%", height: "200px" }}
            >
              <Card.Body>
                <Card.Title>District Map</Card.Title>
              </Card.Body>
            </Card>
          </Card.Link>

          {/* Donation */}

          <Card.Link className="card-link" href="/donations">
            <Card
              className="card-styles"
              style={{ width: "18rem", marginBottom: "1%", height: "200px" }}
            >
              <Card.Body>
                <Card.Title>Donations</Card.Title>
              </Card.Body>
            </Card>
          </Card.Link>

        </div>
      </div>
    </div>
  );
}

export default Home