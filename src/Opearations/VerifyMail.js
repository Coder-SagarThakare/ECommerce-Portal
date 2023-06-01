import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom'
import {securePost} from '../HttpService/APIService';

export default function VerifyMail() {

    const [searchParams, ]=useSearchParams();
    const navigate = useNavigate()

        let token = searchParams.get('token')
        
        console.log(token)
        securePost(`/auth/verify-email?token=${token}`)
        .then(()=>{
            toast.success('email verified sucesfully !!!');
            navigate('/auth/login');
        })
        
}
