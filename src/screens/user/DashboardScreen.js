import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import { userGetQuestions } from '../../redux/actions/questionAction'
import Navbar from '../../components/Navbar';

function DashboardScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.user)
    const questions = useSelector(state => state.question)

    const listQuestions = questions ? questions.listQuestions : null;

    useEffect(() => {
        dispatch(userGetQuestions())
    }, [])

    const handleQuestions = () => {
        if (listQuestions.totalResults > 0) {
            navigate('/question')
        }
    }

    return (
        <div className='blackground'>
            <Container component="main" sx={{ bgcolor: 'transparent' }}>
                <Navbar />
                {
                    listQuestions ?
                        (<>
                            <Card sx={{ p: 5, minWidth: 300, mt: 13, border: '3px dashed grey', borderRadius: 5 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Total {listQuestions.totalResults ? listQuestions.totalResults : 0} questions
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {"Selected whatever you want !"}
                                    </Typography>
                                    <Button onClick={handleQuestions} size="large" variant='outlined' color='success' sx={{ p: 5, borderRadius: '50%' }}>Start</Button>

                                </CardContent>
                            </Card>
                        </>

                        ) : <CircularProgress sx={{ p: 12 }} />
                }
            </Container>
        </div>
    )
}

export default DashboardScreen