import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import { Button } from '@mui/material'
import './Login.css'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
function SignUp() {
    const [successMessage, setSuccessmessage] = useState(false)
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .max(20, 'Password must be 20 characters')
            .required('Password is required')
            .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),

        displayName: Yup.string()
            .required('Display Name is required')
            .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
    })
    const formOptions = { resolver: yupResolver(validationSchema) }
    const { register, reset, handleSubmit, formState: { errors } } = useForm(formOptions)

    const onSubmit = data => {
        const registeredUser = data
        if (registeredUser) {
            setSuccessmessage(true)
        }
        localStorage.setItem('registeredUser', JSON.stringify(registeredUser))
        reset()
    }
    return (
        <div >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Card className='loginCard' >
                        <TextField variant='outlined' name='email' type="text" label='Email' {...register('email')} />
                        <small style={{ color: 'red' }} >{errors.email?.message}</small>
                        <TextField label='Passowrd' type='password' {...register('password', { required: true })} />
                        {errors.password && <small style={{ color: 'red' }}>{errors.password?.message}</small>}
                        <TextField label='Display Name' type='text' name='displayName' {...register('displayName', { required: true })} />
                        {errors.displayName && <small style={{ color: 'red' }}>{errors.displayName?.message}</small>}
                        <div style={{ textAlign: 'center' }}>

                            <Button variant="outlined" type='submit' style={{ width: '40%' }}>Register</Button>
                        </div>
                        {
                            successMessage &&
                            < Stack sx={{ width: '100%' }
                            } spacing={2} >
                                <Alert severity="success">Successfully registered please sign in...</Alert>
                            </Stack >

                        }
                    </Card>
                </div>
            </form>
        </div >
    )
}

export default SignUp
