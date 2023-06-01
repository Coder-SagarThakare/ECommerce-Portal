// import React from "react";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import { secureDelete, secureGet } from "../HttpService/APIService";
import { deleteToken } from "../HttpService/LocalStorageService";
import ChangeCustomerPassword from "./ChangeCustomerPassword";
import { CgLogOut } from "react-icons/cg";
import { MdSettingsSuggest } from "react-icons/md";
import {RiUserUnfollowLine, RiLockPasswordLine} from 'react-icons/ri'
// import {RiUserUnfollowLine} from 'react-icons/'
// import getToken from "../HttpService/LocalStorageService";
// import UpdateCustomerInfo from "./UpdateCustomerInfo";
// import UpdateCustomerProfile from "./UpdateCustomerProfile";
// import UpdateCustomerProfilePhoto from "./UpdateCustomerProfilePhoto";

export default function OffCanvas({ showCanvas, setShowCanvas }) {
  const navigate = useNavigate();
  const [changePassword, setChangePassword] = useState();
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState();

  useEffect(() => {
    secureGet("shop/auth/self").then((response) => {
      console.log(response.data);
      setCurrentLoggedInUser(response.data);
      console.log("in useEffect");
    });
  }, []);
  console.log(currentLoggedInUser);
  // }, [updateProfile, updatePhoto]);

  function logOutCustomer() {
    deleteToken("activeCustomerToken");
    setShowCanvas(false);
  }

  return (
    <>
      <div>
        <Offcanvas
          show={showCanvas}
          onHide={() => {
            setShowCanvas(false);
          }}
          placement="end"
          className="w-25 text-light"
          // backdrop="true"
          style={{ backgroundColor: "#050e36" }}
        >
          <Offcanvas.Header closeButton style={{ background: "#434375" }}>
            <Offcanvas.Title>User profile</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="d-flex flex-column justify-content-center align-items-center ">
              <div className="d-flex justify-content-center rounded-circle overflow-hidden" style={{width:'200px', height:'200px'}} >
                <img className="w-100 h-100 object-fit-cover"  src={currentLoggedInUser?.picture}></img>
              </div>
              <p>{currentLoggedInUser?.name}</p>
              <p> {currentLoggedInUser?.email}</p>

              <div className=" w-100" role='button'>
                <h5
                  variant="secondary"
                  onClick={() => {
                    setChangePassword(true);
                  }}
                >
                  <RiLockPasswordLine />{" "}
                  Change password
                </h5>
                <h5 variant="danger"><RiUserUnfollowLine /> delete user</h5>
                <h5
                  variant="light"
                  // className="border border-secondary"
                  onClick={() => {
                    navigate("/update");
                  }}
                >
                  {" "}
                  <MdSettingsSuggest />{" "}
                  setting
                </h5>
                <h5 onClick={() => logOutCustomer()}>
                  <CgLogOut /> log out
                </h5>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        {changePassword ? (
          <ChangeCustomerPassword
            changePassword={changePassword}
            setChangePassword={setChangePassword}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
