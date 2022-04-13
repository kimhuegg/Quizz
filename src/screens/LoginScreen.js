import React, { useEffect, useState } from 'react'
import { Alert, CssBaseline, Container, TextField, Avatar, Button, FormControlLabel, Checkbox, Typography, Grid, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';

import Copyright from '../components/Copyright';
import LoginForm from '../forms/LoginForm';

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [load, setLoad] = useState(false)
  const { userInfo, error } = useSelector(state => state.user)

  useEffect(() => {
    setLoad(false)
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo, error])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <br />
        {error ? <Alert severity="error">This account is unauthorized!</Alert> : ''}

        <Box sx={{ mt: 1 }}>
          <LoginForm />

          <Grid container>
            <Grid item xs={12}>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>

  );
}


