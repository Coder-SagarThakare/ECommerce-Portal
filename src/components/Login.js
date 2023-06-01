import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import logInPhoto from "./images/logInAnimatedPhoto.png";
import toast from "react-hot-toast";
import {securePost} from "../HttpService/APIService";
import { setToken } from "../HttpService/LocalStorageService";
import ForgetPasswordModal from "../Opearations/ForgetPasswordModal";

import LoginViaGoogle from "../Opearations/LoginViaGoogle";

export default function Login() {
  const navigate = useNavigate();

  const [captchaToken, setCaptchaToken] = useState();
  const [show, setShow] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // errorneous output styling--------------------------------------
  const error = {
    color: "red",
    fontSize: "12px",
  };

  const onSubmit = (data) => {
    data.captcha = captchaToken;
    console.log(data);

    // console.log('in login page after securepost');


    securePost("/auth/login", data)
      .then((response) => {
        setToken("activeToken", response.data.token);
        // console.log(response);

        toast.success("login successful");
        navigate("/seller/myProfile");
      })
      .catch((errorOfResponse) => {
        console.log("error response : ", errorOfResponse);

        // toast.error(errorOfResponse?.response?.data?.message);
      });
      // console.log('in login page after securepost');
  };

  const captcha = () => {
    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute("6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI", {
          action: "submit",
        })
        .then(function (token) {
          setCaptchaToken(token);
          console.log(token);
        });
    });
  };

  return (
    <div>
      <div className="logInPage d-flex justify-content-center p-5">
        <div className="leftCol">
          <img src={logInPhoto} alt="login-img" />
        </div>

        <div className="rightCol flex-column d-flex">
          <h2 style={{ textDecoration: "underline" }}>LogIn Form</h2>
          <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <h6>Enter Mail</h6>
            <input
              type="text"
              placeholder="Enter Mail"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter Valid mail ID",
                },
              })}
            />
            {errors.email?.type === "required" && (
              <p style={error}>Email-ID is mandatory</p>
            )}
            {errors.email?.type === "pattern" && (
              <p style={error}> {errors.email.message}</p>
            )}
            <h6>Enter Password</h6>
            <input
              type="Password"
              placeholder="Enter Password"
              {...register("password", {
                required: true,
                minLength: 8,
                // maxLength: 12,
                pattern: {
                  value: /^[A-Z0-9]{1,}$/i,
                },
              })}
            />
            {errors.password?.type === "required" && (
              <p style={error}>Enter password</p>
            )}
            {errors.password?.type === "minLength" && (
              <p style={error}>password must between 8-12 character</p>
            )}
            {/* {errors.password?.type === "maxLength" && (
              <p style={error}>password must less than 8 character</p>
            )} */}
           
            <hr></hr>
            <div>
              <input
                type="checkbox"
                onClick={captcha}
                style={{ width: "20px" }}
              ></input>
              i am not robot
            </div>
            <button type="submit">Log In</button>
            <hr></hr>
            <Link to="/seller/auth/registration">
              {" "}
              {
                <p style={{ color: "blue", fontSize: "14px" }}>
                  new user Register
                </p>
              }
            </Link>
          </form>
          <div className="d-flex justify-content-center">
            <button
              style={{
                width: "50%",
                backgroundColor: "transparent",
                border: "0.5px solid black",
              }}
              onClick={() => {
                setShow(true);
              }}
            >
              {" "}
              forget password{" "}
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <LoginViaGoogle />

            {/* <img
              src={googleLogo}
              alt="..."
              style={{ width: "30px" }}
              onClick={() => {
                login();
              }}
            /> */}
          </div>
          <div className="loginErr"></div>
        </div>
      </div>

      <ForgetPasswordModal show={show} setShow={setShow} />
    </div>
  );
}
