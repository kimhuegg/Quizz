import React from 'react'
import { Link } from 'react-router-dom'
import {  Avatar, Typography, Grid } from '@mui/material';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';

function RegisterSuccess() {
    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: green[500] }}>
                <CheckIcon />
            </Avatar>
            <br />
            <Typography component="h1" variant="h5">
                Have already registered successfully ! You should Log In right now
            </Typography>
            <br />
            <Grid container>
                <Grid item xs={12}>
                    <Link to="/login" variant="body2">
                        {"Back to Log in"}
                    </Link>
                </Grid>
            </Grid>
        </>
    )
}



export default RegisterSuccess