import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';


import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

import { Button, CardActionArea, CardActions } from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function AppBarComponent() {
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { email = '', displayName = '' } = JSON.parse(localStorage.getItem('registeredUser')) || {};
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleModalClose = () => setOpen(false);
    const handleModelOpen = () => setOpen(true)

    const onSubmit = data => {
        //api codes here

    }

    const logoutClick = () => {
        localStorage.clear();
        navigate('/')
    }
    return (
        <div>
            <AppBar position="fixed" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant="h3" component="div" >
                    Welcome {displayName}
                </Typography>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleModelOpen}><AccountCircle /> Profile</MenuItem>
                    <MenuItem onClick={logoutClick}><LogoutIcon /> Logout</MenuItem>
                </Menu>


            </AppBar>
            {
                open &&
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>

                                    <Card className='loginCard' >
                                        <TextField variant='outlined' name='displayname' type="text" label='Change Display Name' {...register("password")} />

                                        <TextField autoComplete='off' variant='outlined' name='password' type="password" label='Change password' {...register("password")} />
                                        <small style={{ color: 'red' }} >{errors.email?.message}</small>
                                        <TextField label='Email' type='email' disabled={true} defaultValue={email} {...register("email", { required: true })} />
                                        {/* {errors.password && <small style={{ color: 'red' }}>{errors.password?.message}</small>} */}
                                        <div style={{ textAlign: 'center' }}>

                                            <Button variant="outlined" type='submit' style={{ width: '40%' }}>Submit</Button>
                                        </div>
                                    </Card>
                                </div>
                            </form>
                        </Box>
                    </Fade>
                </Modal>
            }
        </div>
    )
}

export default AppBarComponent;
