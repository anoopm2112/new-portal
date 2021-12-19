import React from "react";
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import './Login.css'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function SignUp() {
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .max(20, 'Password must be 20 characters')
            .required('Password is required')
            .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),


        displayName: Yup.string()
            .required('Display Name is required')
            .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, watch, formState: { errors } } = useForm(formOptions);



    const onSubmit = data => {
        let registeredUser = data
        localStorage.setItem('registeredUser', JSON.stringify(registeredUser));

    }
    return (
        <div >
            <h3>Sign Up page</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Card className='loginCard' >
                        <TextField variant='outlined' name='email' type="text" label='Email' {...register("email")} />
                        <small style={{ color: 'red' }} >{errors.email?.message}</small>
                        <TextField label='Passowrd' type='password' {...register("password", { required: true })} />
                        {errors.password && <small style={{ color: 'red' }}>{errors.password?.message}</small>}
                        <TextField label='Display Name' type='text' name='displayName' {...register("displayName", { required: true })} />
                        {errors.displayName && <small style={{ color: 'red' }}>{errors.displayName?.message}</small>}
                        <div style={{ textAlign: 'center' }}>

                            <Button variant="outlined" type='submit' style={{ width: '40%' }}>Register</Button>
                        </div>
                    </Card>
                </div>
            </form>
        </div >
    )
}

export default SignUp
