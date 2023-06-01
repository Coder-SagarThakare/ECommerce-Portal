import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {  Link, useNavigate } from "react-router-dom";
import {securePost} from "../HttpService/APIService";
import { setToken } from "../HttpService/LocalStorageService";

export default function CustomerLoginPage({setLoggedInUser}) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    securePost("/shop/auth/login?captcha=false", data).then((response) => {
      console.log(response.data);
      setToken("activeCustomerToken", response.data.token);
      toast.success("user logged in succesfully");
      navigate(`/`)

      setLoggedInUser(response.data)


    });
  };

  
  return (
    <div
      className="w-100 vh-100 border border-primary d-flex align-items-center justify-content-center "
      style={{
        backgroundImage:
          "radial-gradient(70.31% 84.8% at 83.06% 62.3%, rgba(205, 23, 235, 0.2) 0%, rgba(247, 247, 247, 0) 100%), radial-gradient(46.81% 92.56% at 17.26% 17.14%, rgba(124, 209, 221, 0.85) 0.36%, rgba(255, 252, 252, 0.13) 98.67%)",
      }}
    >
      <div className="h-50 w-50 border border-danger d-flex ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" h-100 w-100 d-flex flex-column jutify-conmtent-center align-items-center p-4 border">
            <input placeholder="enter username" {...register("email")} />
            <input placeholder="enter password" {...register("password")} />
            <button>Login</button>

            
              
            <Link to="/registration">new user ? register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
