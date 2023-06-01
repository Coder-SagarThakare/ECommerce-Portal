import React, { useState, useEffect } from "react";
import logo from "../components/images/coder.png";
import "./MyProfile.css";
import emailLogo from "../components/images/gmailLogo.png";
// import emailLogo from "../con";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { securePost, secureGet } from "../HttpService/APIService";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ChangePassword from "./ChangePassword";

import { AiOutlineShoppingCart, AiOutlineHistory } from "react-icons/ai";
import { GoDatabase } from "react-icons/go";
import { RiLockPasswordFill, RiLogoutBoxLine } from "react-icons/ri";
// < --------------------------------------------------------------------------------------------- >

export default function MyProfile() {
  const navigate = useNavigate();
  const [data, setData] = useState({}); // {name,compName}
  const [show, setShow] = useState(false);
  const [dummy] = useState(true);

  useEffect(() => {
    secureGet("/auth/self")
      .then((response) => {
        console.log(" myprofile response : ", response);
        // isEmailVerified = response.data.isEmailVerified;

        // console.log(isEmailVerified);

        setData({
          userName: response.data.name,
          userEmail: response.data.email,
          userCompName: response.data._org.name,
          isEmailVerified: response.data.isEmailVerified,
        });
      })
      .catch((error) => {
        console.log(" myprofile error : ", error);
      });
  }, [dummy]);

  function logOut() {
    localStorage.removeItem("activeToken");
    toast.success("Logout sucessfull");
    navigate("/seller/auth/login");
  }

  const verifyMail = () => {
    // console.log("clicked")
    securePost("auth/send-verification-email");
    toast.success(`mail shared to ${data.userEmail}`);
  };

  // ---------------------------------------------------------------------------------------------------------------------

  return (
    <div>
      {/* nav bar */}

      <Navbar className="border bg-dark px-3 dropstart" expand="lg">
        <Container className="container">
          <Navbar.Brand href="#home">Online shopping</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ">
              {/* <NavDropdown title="settings" id="basic-nav-dropdown">
                
                <NavDropdown.Item href="#action/3.2">Another action{" "}</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">update password </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Create user</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Log Out</NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item href="#action/3.4" className="bg-danger"> Log Out{" "}</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>

        <div className="d-flex align-items-center ">
          <NavDropdown title="settings" id="basic-nav-dropdown">
            <NavDropdown.Item
              // href="#action/3.1"
              onClick={() => {
                setShow(true);
              }}
            >
              <RiLockPasswordFill /> Change password
            </NavDropdown.Item>

            <NavDropdown.Item
              onClick={() => {
                navigate("/seller/product/orders");
              }}
            >
              <AiOutlineHistory /> Orders history
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                navigate("/seller/product/list");
              }}
            >
              <AiOutlineShoppingCart /> My Products
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                navigate("/seller/companyData");
              }}
            >
              <GoDatabase /> Company data
            </NavDropdown.Item>
            <NavDropdown.Divider />

            <NavDropdown.Item
              href="#action/3.4"
              onClick={logOut}
              className="bg-danger"
            >
              <RiLogoutBoxLine /> Log Out{" "}
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </Navbar>

      <ChangePassword show={show} setShow={setShow} />

      {/* card  */}
      <div className="mainDiv d-flex justify-content-center align-items-center">
        <div className="card mb-3 " style={{ maxWidth: "500px" }}>
          <div className="row g-0 p-2 border rounded">
            <div className="col-md-4  p-1">
              <img src={logo} className="img-fluid  " alt="..." />
            </div>

            <div className="col-md-8 ">
              <div className="card-dy d-flex flex-column justify-content-between">
                <h5 className="card-name ">{data?.userName} </h5>
                {/* <h6> */}
                <p className="card-mail">
                  <img className="mailLogo" src={emailLogo} alt=""></img>
                  {data.userEmail}
                </p>

                {data.isEmailVerified ? (
                  <div className="d-flex justify-content-evenly">
                    <button className="bg-success border-0 rounded-3">
                      Account verified
                    </button>
                  </div>
                ) : (
                  <div className="border d-flex justify-content-evenly">
                    <button className="   bg-danger border-0 rounded-3 ">
                      {" "}
                      not verified{" "}
                    </button>
                    <button
                      className="bg-secondary border-0 rounded-3 "
                      onClick={() => verifyMail()}
                    >
                      {" "}
                      verify email
                    </button>
                  </div>
                )}
                {/* </div> */}
                <p className="card-compName">
                  Comp name : {data?.userCompName}
                </p>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
    </div>
  );
}
