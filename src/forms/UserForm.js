import React, { useEffect, useState } from 'react'

import { Alert, FormControl, TextField, InputLabel, Button, FormControlLabel, Checkbox, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import NearMeIcon from '@mui/icons-material/NearMe';
import CircularProgress from '@mui/material/CircularProgress';


import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { register } from '../redux/actions/userAction'
import { createUser } from '../redux/actions/adminAction'

const validateUser = Yup.object().shape({
    username: Yup.string().required("This field is required"),
    // password: Yup.string().required("This field is required"),
    email: Yup.string().required("This field is required"),
    role: Yup.string().required("This field is required"),
});

function UserForm({ dataModal, onClose, option }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const user = useSelector(state => state.user)
    const [loaded, setLoaded] = useState(false)

    const initialValues = dataModal
        ? dataModal : {
            username: "",
            password: "",
            email: "",
            role: "",

        };

    // console.log(initialValues)
    const formik = useFormik({
        initialValues,
        validationSchema: validateUser,
        onSubmit: (values) => {
            console.log('submmit')
            // console.log(values)
            if (option == 'create') {
                const userInfo = {
                    username: values.username,
                    password: values.password,
                    email: values.email,
                    role: values.role
                }
                dispatch(createUser(userInfo))
            }
            // if (option == 'update') {
            //     console.log('update')
            //     const avatarInfo = {
            //         "avatar": values.avatar
            //     }
            //     console.log(avatarInfo)

            // }
            setLoaded(true)
            onClose()

        },
    });

    const changeAvatar = (e) => {
        e.preventDefault()
        var fileInputs = document.getElementById('myFile')
        console.log(fileInputs.value)

    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                {formik.errors.username ? <div><Alert severity="warning">{formik.errors.username}</Alert></div> : <></>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    autoFocus
                    value={formik.values.username}
                    onChange={formik.handleChange}
                />
                {formik.errors.password ? <div><Alert severity="warning">{formik.errors.password}</Alert></div> : <></>}
                {
                    option == 'update' ? '' : <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="password"
                        type="text"
                        id="password"
                        autoComplete="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />

                }
                {formik.errors.email ? <div><Alert severity="warning">{formik.errors.email}</Alert></div> : <></>}

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="email"
                    type="email"
                    id="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        id="role"
                        name="role"
                        labelId="demo-simple-select-label"
                        autoComplete="role"
                        value={formik.values.role ? formik.values.role : ""}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                </FormControl>

                {/* {formik.errors.password ? <div><Alert severity="warning">{formik.errors.password}</Alert></div> : <></>} */}

                
                {!loaded ? <Button type="create" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    {option}
                </Button> : <CircularProgress />}
            </form>

            {/* fix later */}
            {
                    option == 'create' ? '' :
                        <>
                            <form onSubmit={changeAvatar}>
                                <input type="file" id="myFile" name="filename" />
                                <input type="submit" />
                            </form>
                        </>
                }
        </>
    )
}

export default UserForm