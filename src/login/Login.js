import React from "react";
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

import { Button } from '@mui/material';
import './Login.css'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Login() {
    const [notExistError, setNotExistError] = React.useState(false);

    const navigate = useNavigate()
    const { email } = JSON.parse(localStorage.getItem('registeredUser')) || {};
    console.log({ email })
    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);



    const onSubmit = data => {
        if (data.email !== email) {
            setNotExistError(true)
        } else {
            localStorage.setItem('userDetails', JSON.stringify(data));
            navigate('/home')
        }

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Card className='loginCard' >
                        <TextField 
                            variant='outlined' 
                            name='email' 
                            type="text" 
                            label='Email' 
                            {...register("email")} 
                        />  
                        <small style={{ color: 'red' }} >{errors.email?.message}</small>
                        <TextField 
                            label='Passowrd' 
                            type='password' 
                            {...register("password", { required: true })} 
                        />
                        {errors.password && <small style={{ color: 'red' }}>{errors.password?.message}</small>}
                        <div style={{ textAlign: 'center' }}>

                            <Button variant="outlined" disabled={email ? false : true} 
                                type='submit' style={{ width: '40%' }}>Login</Button>

                        </div>
                        {
                            notExistError &&
                            < Stack sx={{ width: '100%' }
                            } spacing={2} >
                                <Alert severity="error">Not an existing user</Alert>
                            </Stack >

                        }
                    </Card>
                </div>
            </div >
        </form>
    )
}

export default Login
