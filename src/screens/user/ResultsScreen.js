import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button
} from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

import Navbar from '../../components/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { userSubmitAnswer } from '../../redux/actions/questionAction'

// const url = 'https://fwa-ec-quiz.herokuapp.com'

function ResultsScreen() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { listAnswer } = location.state
  const [isSubmit, setIsSubmit] = useState(false)
  const question = useSelector(state => state.question)
  const rs = question.score ? question.score : null

  useEffect(() => {
    // console.log(listAnswer)
    dispatch(userSubmitAnswer(listAnswer))
  }, [])

  useEffect(() => {
    if (question.score) {
      setIsSubmit(true)
    }
  }, [question])

  const terminateThisQuestion = () => {
    navigate('/')
  }

  return (
    <div className='blackground'>
      <Container component="main" sx={{ bgcolor: 'transparent' }}>
        <Navbar />
        <Card sx={{ p: 5, minWidth: 300, mt: 13, border: '3px dashed grey', borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Results
            </Typography>
            <br />
            {
              isSubmit ? <TableContainer sx={{ justifyContent: 'center', display: 'flex' }}>
                <Table sx={{ maxWidth: 500 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Question</TableCell>
                      <TableCell align="right">Answer</TableCell>
                      <TableCell align="right">Result</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      rs.map((item, index) => (

                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">{index + 1}</TableCell>
                          <TableCell align="right">{item.correctanswer}</TableCell>
                          <TableCell align="right">{item.result.toString()}</TableCell>
                        </TableRow>

                      ))
                    }
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell align="right">Score</TableCell>
                      <TableCell align="right">{rs.filter(item => item.result == true).length}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer> : <CircularProgress />}
            <br />
            {
              isSubmit ? <Button onClick={terminateThisQuestion} variant="contained" color="success" >Close this class</Button> : ''
            }

          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

export default ResultsScreen