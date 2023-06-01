import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import {securePost} from "../HttpService/APIService";

export default function CustomerRegistrationPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    securePost("/shop/auth/register", data)
      .then((response) => {
        console.log(response);
        toast.success("registered sucessfully");
      })
      .catch((response) => {
        console.log(response);
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
      <div className=" border border-primary  d-flex align-items-center justify-content-center ">
        {/* <div className="h-100 w-50 border border-danger">
            photo
        </div> */}
        <div className="h-100 w-100 border border-danger">
          <p>Registration Form</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex flex-column p-4 ">
              <input placeholder="enter name" {...register("name")} />
              <input placeholder="enter Email" {...register("email")} />
              <input placeholder="enter password" {...register("password")} />
              <input
                placeholder="enter confirm password"
                {...register("confirmPassword")}
              />

              <p>Address</p>
              <input
                placeholder="enter street"
                {...register("addresses.street")}
              />
              <input
                placeholder="enter address line 2"
                {...register("addresses.addressLine2")}
              />
              <input placeholder="enter city" {...register("addresses.city")} />
              <input
                placeholder="enter state"
                {...register("addresses.state")}
              />
              <input
                placeholder="enter pin code"
                {...register("addresses.pin")}
              />

              <button type="submit">Register</button>
              <Link to="/login">existing user?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
