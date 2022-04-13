import React, { useEffect } from 'react'

import { Alert, CssBaseline, Container, TextField, Avatar,Typography, Grid, Box } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment'
import { green, pink } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

import Copyright from '../components/Copyright';
import RegisterForm from '../forms/RegisterForm';
import RegisterSuccess from '../components/RegisterSuccess';

function RegisterScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { userInfo, error, registerInfo } = useSelector(state => state.user)

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {registerInfo ? <RegisterSuccess /> : (<>
                        <Avatar sx={{ m: 1, bgcolor: green[500] }}>
                            <AssignmentIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <br />
                        {error ? <Alert severity="error">This account is unauthorized!</Alert> : ''}

                        <Box sx={{ mt: 1 }}>
                            <RegisterForm />
                            <Grid container>
                                <Grid item xs={12}>
                                    <Link to="/login" variant="body2">
                                        {"Already have an account? Log in"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </>)}
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>

    )
}

export default RegisterScreen