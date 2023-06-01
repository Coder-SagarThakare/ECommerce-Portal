

import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {securePost} from '../HttpService/APIService';

export default function ChangePassword({show,setShow}) {

    const {register, handleSubmit} = useForm();

    const onSubmit = (data)=>{
        console.log(data);

        if(data.confirmPassword !== data.new_password ){
            toast.error('new password must be same')
        }else{
            delete data.confirmPassword ;
            securePost('users/auth/change-password',data)
            .then((res)=>{
                console.log( "response ",res);
                toast.success("password changed successfully ")
            })
            console.log(data)
        }
    }

  return (
    <>
      <Modal show={show} >
        <Modal.Header >
          <Modal.Title>Change password 🙈</Modal.Title>
        </Modal.Header>
        <form  onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
                <input placeholder='Enter old password' {...register('old_password')}></input>
                <br></br>
                <br></br>
                <input placeholder=' new password' {...register('new_password')}></input>
                <br></br>
                <br></br>
                <input placeholder=' confirm new password' {...register('confirmPassword')}></input>

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>{setShow(false) }}>
                Close
            </Button>
            <Button variant="primary"  type='submit'>
                Save Changes
            </Button>
            </Modal.Footer>
        </form>
      </Modal>
    </>

  );
}

