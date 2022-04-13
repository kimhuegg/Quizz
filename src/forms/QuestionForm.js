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
import { adminCreateQuestion, adminUpdateQuestion } from '../redux/actions/questionAction'

const validateQuestion = Yup.object().shape({
    question: Yup.string().required("This field is required"),
    answer1: Yup.string().required("This field is required"),
    answer2: Yup.string().required("This field is required"),
    answer3: Yup.string().required("This field is required"),
    answer4: Yup.string().required("This field is required"),
    correctanswer: Yup.string().required("This field is required"),
});

function QuestionForm({ dataModal, onClose , option}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const user = useSelector(state => state.user)
    const [loaded, setLoaded] = useState(false)

    const initialValues = dataModal
        ? dataModal : {
            question: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            correctanswer: "",
        };

    // console.log(initialValues)
    const formik = useFormik({
        initialValues,
        validationSchema: validateQuestion,
        onSubmit: (values) => {
            console.log('submmit')
            // console.log(values)
            if(option == 'create'){
                dispatch(adminCreateQuestion(values))

            }
            if(option == 'update'){
                dispatch(adminUpdateQuestion(values))

            }
            setLoaded(true)
            onClose()

        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                {/* {formik.errors.username ? <div><Alert severity="warning">{formik.errors.username}</Alert></div> : <></>} */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="question"
                    label="Question"
                    name="question"
                    autoComplete="question"
                    autoFocus
                    value={formik.values.question}
                    onChange={formik.handleChange}
                />
                {/* {formik.errors.email ? <div><Alert severity="warning">{formik.errors.email}</Alert></div> : <></>} */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="answer1"
                    label="Answer1"
                    type="text"
                    id="answer1"
                    autoComplete="answer1"
                    value={formik.values.answer1}
                    onChange={formik.handleChange}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="answer2"
                    label="Answer2"
                    type="text"
                    id="answer2"
                    autoComplete="answer2"
                    value={formik.values.answer2}
                    onChange={formik.handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="answer3"
                    label="Answer3"
                    type="text"
                    id="answer3"
                    autoComplete="answer3"
                    value={formik.values.answer3}
                    onChange={formik.handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="answer4"
                    label="Answer4"
                    type="text"
                    id="answer4"
                    autoComplete="answer4"
                    value={formik.values.answer4}
                    onChange={formik.handleChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Correct Answer</InputLabel>
                    <Select
                        id="correctanswer"
                        name="correctanswer"
                        labelId="demo-simple-select-label"
                        autoComplete="correctanswer"
                        value={formik.values.correctanswer}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value={formik.values.answer1}>{formik.values.answer1}</MenuItem>
                        <MenuItem value={formik.values.answer2}>{formik.values.answer2}</MenuItem>
                        <MenuItem value={formik.values.answer3}>{formik.values.answer3}</MenuItem>
                        <MenuItem value={formik.values.answer4}>{formik.values.answer4}</MenuItem>

                    </Select>
                </FormControl>

                {/* {formik.errors.password ? <div><Alert severity="warning">{formik.errors.password}</Alert></div> : <></>} */}


                {!loaded ? <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    {option}
                </Button> : <CircularProgress />}
            </form>
        </>
    )
}

export default QuestionForm