import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Container, Typography } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import Navbar from '../../components/Navbar';
import QuestionItem from '../../components/QuestionItem';
import AlertStart from '../../components/AlertStart';

function QuestionScreen() {
    const navigate = useNavigate()
    const [number, setNumber] = useState(1)
    const answer = useRef([])
    const questions = useSelector(state => state.question)
    const [value, setValue] = useState('')

    useEffect(() => {
        // console.log(answer.current[number-1].correctanswer)
        setValue(answer.current[number - 1]?.correctanswer)

    }, [number])

    const listQuestions = questions && questions.listQuestions ? questions.listQuestions.results : null;

    const totalResults = questions && questions.listQuestions ? questions.listQuestions.results.length : null;

    const questionItem = listQuestions ? listQuestions[number - 1] : null;

    // alert when number question is 1 and user want to back

    const [alertStartQuestion, setAlertStartQuestion] = useState(false)

    const handleClickOpenAlertStart = () => {
        setAlertStartQuestion(true);
    };

    const handleCloseAlertStart = () => {
        setAlertStartQuestion(false);
    };

    const handleBackToDashboard = () => {
        // setAlertStartQuestion(false);
        navigate('/')
    }
    //alert when user answer all question and continous click next orr user want ro submit answer
    const [alertSubmit, setAlertSubmit] = useState(false)

    const handleClickOpenAlertSubmit = () => {
        setAlertSubmit(true);
    };

    const handleCloseAlertSubmit = () => {
        setAlertSubmit(false);
    };

    const handleSubmitAnswer = () => {
        console.log(answer.current)
        // setAlertSubmit(false);
        navigate('/results', { state: { listAnswer: answer.current } })
    }


    //handle when user click to choose answer cau t10 phai tra loi thi ms push
    const handleAnswer = (e) => {
       
        answer.current.push ( {
            id: questionItem.id,
            correctanswer: e.target.value
        })
        setValue(e.target.value)

    }
    // handle button service in display
    const handleBack = () => {
        console.log(answer.current)

        if (number == 1) {
            handleClickOpenAlertStart()
        } else {
            setNumber(state => state - 1)
        }
    }

    const handleSkip = () => {
        console.log(answer.current)
        if (number > totalResults - 1) {
            handleClickOpenAlertSubmit()

        } else {
            setNumber(state => state + 1)
        }

    }

    const handleNext = () => {
        console.log(answer.current)

        if (number > totalResults - 1) {
            handleClickOpenAlertSubmit()
        } else {
            setNumber(state => state + 1)
        }
    }

    return (
        <div className='blackground'>

            <Container component="main" sx={{ bgcolor: 'transparent' }}>
                <Navbar />
                {
                    listQuestions ? (
                        <Card sx={{ p: 5, minWidth: 300, mt: 13, border: '3px dashed grey', borderRadius: 5 }}>
                            <CardContent>
                                <Typography variant="h5" component="div" xs={{ fontWeight: 'bold' }}>
                                    Question {number}/{totalResults} : {questionItem ? questionItem.question : "NOT FOUND !"}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    select whatever you want
                                </Typography>
                                <QuestionItem questionItem={questionItem} value={value} handleAnswer={handleAnswer} />
                            </CardContent>
                            <CardActions>
                                <Button onClick={handleBack} size="small" variant='outlined'>Back</Button>
                            </CardActions>
                            <CardActions>
                                <Button onClick={handleSkip} size="small" variant='outlined'>Skip</Button>
                            </CardActions>
                            <CardActions>
                                <Button onClick={handleNext} size="small" variant="contained" color="success">Next</Button>
                            </CardActions>
                        </Card>) : ''
                }

            </Container>
            {/* alert point */}
            <AlertStart
                handleAppear={alertStartQuestion}
                onClose={handleCloseAlertStart}
                handleDoNext={handleBackToDashboard}
                title="Do you want to restart all question ?"
                contentText=" If you go back, all process will be destroyed ..."
            />
            <AlertStart
                handleAppear={alertSubmit}
                onClose={handleCloseAlertSubmit}
                handleDoNext={handleSubmitAnswer}
                title="Do you want to submit ?"
                contentText="you will see your result "
            />
        </div>
    )
}

export default QuestionScreen