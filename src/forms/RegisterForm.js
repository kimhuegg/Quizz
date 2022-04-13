import React, { useEffect, useState } from 'react'

import { Alert, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import NearMeIcon from '@mui/icons-material/NearMe';
import CircularProgress from '@mui/material/CircularProgress';


import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { register } from '../redux/actions/userAction'

const RegisterSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        // .matches(
        //     "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd@$!%*#?&]{6,}",
        //     "Must Contain 6 Characters, One Lowercase"
        // )
        .required('Required Must Contain 6 Characters, One Lowercase'),
    email: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    confirmPassword: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .when('password', (password, field) =>
            password ? field.required().oneOf([Yup.ref('password')]) : field
        )
        .required('Required'),
});

function RegisterForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(false)
    }, [user])

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: (values) => {
            setLoad(true)
            const dataRegister = {
                "username": values.username,
                "password": values.password,
                "email": values.email
            }
            // console.log(dataRegister)
            dispatch(register(dataRegister))
            navigate('/register?success=true')

        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                {formik.errors.username ? <div><Alert severity="warning">{formik.errors.username}</Alert></div> : <></>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={formik.values.username}
                    onChange={formik.handleChange}
                />
                {formik.errors.email ? <div><Alert severity="warning">{formik.errors.email}</Alert></div> : <></>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    autoComplete="current-email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                {formik.errors.password ? <div><Alert severity="warning">{formik.errors.password}</Alert></div> : <></>}

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
                {formik.errors.confirmPassword ? <div><Alert severity="warning">{formik.errors.confirmPassword}</Alert></div> : <></>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                />

                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" required />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                />
                {!load ? <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Register &nbsp; <NearMeIcon />
                </Button> : <CircularProgress />}
            </form>
        </>
    )
}

export default RegisterForm