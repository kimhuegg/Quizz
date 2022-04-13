import React, { useEffect, useState } from 'react'

import { Alert, TextField, Button, FormControlLabel, Checkbox, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { login } from '../redux/actions/userAction'
import { useDispatch, useSelector, } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});


function LoginForm() {
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const user = useSelector(state => state.user)

    useEffect(() => {
        setLoad(false)
    }, [user])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            setLoad(true)
            dispatch(login(values))
        },
    });
    return (
        <>
            {formik.errors.username || formik.errors.password ? <div><Alert severity="warning">Invalid username or password !!!</Alert></div> : <></>}
            <form onSubmit={formik.handleSubmit}>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Email Address"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={formik.values.username}
                    onChange={formik.handleChange}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"  />}
                    label="Remember me"
                />
                <Box>
                    {!load ? <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Log In
                    </Button> : <CircularProgress />}
                </Box>
            </form>
        </>
    )
}

export default LoginForm