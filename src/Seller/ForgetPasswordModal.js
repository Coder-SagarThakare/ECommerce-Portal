import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {securePost} from '../HttpService/APIService';

export default function ForgetPasswordModal({show,setShow}) {

  // const [show, setShow] = useState(false);  
  const handleClose = () => setShow(false);
  const {register,handleSubmit} = useForm();

  const [captchaToken,setCaptchaToken] = useState()

  const onSubmit = (data)=>{
    // console.log("submitted form");
    
    data.captcha = captchaToken;

    securePost ('auth/forgot-password',data)
    .then ((response)=>{
      console.log(response);
      toast.success('account verfied')
      setShow(false)
    })
    .catch((err)=>{
      // console.log(err)
      // toast.error('first verify your mail')

    })
  
  }
    
  

  const verifyEmail = ()=>{
    window.grecaptcha.ready(function () {
      window.grecaptcha.execute("6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI", {
          action: "submit",
        })
        .then(function (token) {
          setCaptchaToken(token); 
          console.log(token);
        })
      
    });
    
  }

  return (
    <>
     

      <Modal show={show} onHide={handleClose} onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Forget Password</Modal.Title>
        </Modal.Header>
        <form  style={{border: "1px solid red"}}>

        <Modal.Body className='d-flex justify-content-evenly'>
          <input type='email' placeholder='Enter mail-id' {...register('email')}/>

          <button type='button' style={{border:'1px solid blue'}} onClick={()=>{verifyEmail()}} > veify email</button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" type='submit' >
            Save Changes
          </Button>

        </Modal.Footer>
        </form>

      </Modal>
    </>
  );
}
