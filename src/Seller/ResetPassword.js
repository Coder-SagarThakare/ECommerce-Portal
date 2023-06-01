
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {securePost} from '../HttpService/APIService';

export default function ResetPassword (){

    let [searchParams, ] = useSearchParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const {register,handleSubmit} = useForm()

    const onSubmit = (data)=> {
        console.log(data);

        if(data.password !== data.confirmPassword || data.password==='')
            toast.error("password must be same")
        else {
            delete data.confirmPassword ;
            const token = searchParams.get('token');

            securePost(`auth/reset-password?token=${token}`,data)
            .then ((response)=>{
                toast.success('Password changed')
                setShow(false)
                console.log(response);
                navigate('/myProfile')
            })
            

        }
    }


  return (
    <div >

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset password</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
                <p>Enter Your New password 🙈</p> 
                <input placeholder='Enter password' {...register('password')}></input>
                <br></br>
                <br></br>
                <input placeholder='Enter confirm password' {...register('confirmPassword')}></input>

            </Modal.Body>
        
            <Modal.Footer>
                
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type='submit'>save </Button>
            </Modal.Footer>
        </form>
      </Modal>
      </div>
  )
}