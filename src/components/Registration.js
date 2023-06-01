import React, { useState } from "react";
import "./Registration.css";
import regImage from "./images/register.png";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {securePost} from "../HttpService/APIService";

export default function Registration() {
  
  const navigate = useNavigate();
  
  // destructuring of useForm---------------------------------------------------

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [captchaToken,setCaptchaToken] = useState();

  // ater submittingn form call will go to onSubmit 
  const onSubmit = (data)=>{
    data.captcha  = captchaToken;
    delete data.confirmPassword;
    
    console.log(data);
    console.log("captcha ", data.captcha)
    // if(data.captcha)
    // toast.error("captcha not found")

    securePost("/auth/register",data)
    .then((response)=> {

      toast.success("user registered succesfully")
      navigate("/seller/auth/login")

    }).catch( (errroOfResponse)=>{
      // toast.error(errroOfResponse?.response?.data?.message);
    })
  }



  // errorneous output styling--------------------------------------
  const error = {
    color: "red",
    fontSize: "12px",
    textShadow: "1px 1px 0px black",
  };

  // Generate captcha token ============================================
  const generateCaptchToken = ()=>{
    window.grecaptcha.ready(function() {
      window.grecaptcha.execute('6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI', {action: 'submit'})
      .then(function(token) {
          console.log(token);
          setCaptchaToken(token)

      });
    });
  }

  // return component ==================================================
  return (
    <div>
      <div className="RegPage d-flex justify-content-center">
        <div className="leftCol-RegPage d-flex justify-content-center">
          <img className="regImg " src={regImage} alt="registration-img" />
        </div>

        <div className="rightCol-RegPage d-flex justify-content-center align-items-center">
          {/* Registration Form */}
          <form
            className="regForm d-flex justify-content-center align-items-center flex-column"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 style={{ textDecoration: "underline" }}>Registration Form</h2>

            {/* name field */}
            <h6>Enter Name</h6>
            <input
              type="text"
              placeholder="Enter Name"
              {...register("name", {
                required: true,
                pattern: {
                  value: /^[A-Z ]{1,}$/i,
                  message: "Only character allowed in name",
                },
              })}
            />
            {errors.name?.type === "required" && (
              <p style={error}>First name is mandatory</p>
            )}
            {errors.name?.type === "pattern" && (
              <p style={error}> {errors.name.message} </p>
            )}

            {/* company name field */}
            <h6>Enter Company Name</h6>
            <input
              type="text"
              placeholder="Enter Company name"
              {...register("company", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9 ]{1,}$/i,
                  message: "character & numbers allowed ",
                },
              })}
            />
            {errors.company?.type === "required" && (
              <p style={error}>Company name is mandatory</p>
            )}
            {errors.company?.type === "pattern" && (
              <p style={error}> {errors.company.message}</p>
            )}

            {/* mail id field */}
            <h6>Enter Mail Id</h6>
            <input
              type="Mail"
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

            {/* password field */}

            <h6>Enter Password</h6>
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 12,
              })}
            />
            {errors.password?.type === "required" && (
              <p style={error}>Enter password</p>
            )}
            {errors.password?.type === "minLength" && (
              <p style={error}>password must between 8-12 character</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p style={error}>password must less than 12 character</p>
            )}

            {/* confirm password field */}

            <h6>Enter ConfirmPassword</h6>
            <input
              type="password"
              placeholder="Enter Password"
              {...register("confirmPassword", {
                required: true,
                minLength: 8,
                maxLength: 12,
                validate: (value) => value === watch("password"),
              })}
            />
            {errors.confirmPassword?.type === "validate" && (
              <p style={error}>password do not match</p>
            )}
            <hr></hr>

            
            <input type='checkbox' onClick={generateCaptchToken}/> i am not robot

            <hr></hr>



            <button type="submit" className="regButton ">
              Register
            </button>

            <hr></hr>

            <Link to="/seller/auth/login">
              <h6>existing user ?</h6>
            </Link>
            <div className="regError">{/* {emailIDError} */}</div>
          </form>
        </div>
      </div>
      {/* <div className="regError"> */}
      {/* {emailIDError} */}
      {/* </div> */}
    </div>
  );
}
