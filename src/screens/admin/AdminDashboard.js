import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import Copyright from '../../components/Copyright';
import DrawerComponent from '../../components/admin/DrawerComponent';
import Navbar from '../../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { adminGetQuestions, adminDeleteQuestion } from '../../redux/actions/questionAction';
import { getListUser } from '../../redux/actions/adminAction'

import CircularProgress from '@mui/material/CircularProgress';
import QuestionForm from '../../forms/QuestionForm';
import QuestionTable from '../../components/admin/QuestionTable';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function AdminDashboard() {
    const dispatch = useDispatch()
    const questions = useSelector(state => state.question)
    // const [isLoaded, setLoaded] = useState(false)
    const [open, setOpen] = useState(false);
    const [dataModal, setDataModal] = useState({})
    const listQuestions = questions ? questions.listQuestions : null;
    const [title, setTitle] = useState('')


    const createQuestion = () => {
        setDataModal({})
        setTitle('create')
        setOpen(true);
    };
    const handleClose = () => {
        setDataModal({})
        setOpen(false);
    };

    useEffect(() => {
        dispatch(adminGetQuestions())
    }, [dispatch])

    useEffect(() => {
        dispatch(getListUser())
    }, [dispatch])


    const deleteQuestion = (e) => {
        console.log(e.target.value)
        dispatch(adminDeleteQuestion(e.target.value))

    }

    const updateQuestion = (e) => {
        console.log(e.target.value)
        console.log(listQuestions.results[e.target.value])
        const item = listQuestions.results[e.target.value]
        // dispatch(adminUpdateQuestion(item))
        setDataModal(item)
        setTitle("update")
        setOpen(true)
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar />
            <DrawerComponent />

            <Box
                component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', }}>
                {/* <Toolbar /> */}
                <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
                    <Button sx={{ mt: 9 }} onClick={createQuestion}>Create Question</Button>
                    {
                        listQuestions ? (
                            <QuestionTable
                                itemsPerPage={5}
                                items={questions.listQuestions.results}
                                deleteQuestion={deleteQuestion}
                                updateQuestion={updateQuestion} />
                        ) : <CircularProgress sx={{ mt: 5}}/>
                    }
                    <Copyright sx={{ pt: 3 }} />
                </Container>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, maxWidth: 600 }}>
                    <h2 id="parent-modal-title">{title} question</h2>
                    <QuestionForm dataModal={dataModal} onClose={handleClose} option={title} />
                </Box>
            </Modal>
        </Box>
    )
}
export default AdminDashboard;

