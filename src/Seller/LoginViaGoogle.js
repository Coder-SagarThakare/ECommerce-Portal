import { GoogleLogin } from "@react-oauth/google";
import React  from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {securePost} from "../HttpService/APIService";
import { setToken } from "../HttpService/LocalStorageService";

export default function LoginViaGoogle() {

    const navigate = useNavigate();

    const onSuccess = (response)=>{
        console.log('[login suceefull  ; ]',response);

        const data ={
            token : response.credential
        }

        securePost('/auth/login/google?captcha=false',data)
        .then((response)=>{
            console.log(response)
            setToken(response.data.token);
            navigate('/myProfile')
            toast.success('Yipee!!! \n user sucessfully loggen in !!!')
            
        })
    }
    const onFailure = (res) => {
        console.log('[Login failed] res:',res)
    }
   

  return (
    <div>
        <div>
            
            
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onFailure}
                />
        </div>
    </div>
  );
}
