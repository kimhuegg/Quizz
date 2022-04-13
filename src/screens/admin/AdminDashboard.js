import React, { useEffect, useState } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,

} from '@mui/material';

import MUIDataTable from "mui-datatables";

import Copyright from '../../components/Copyright';
import DrawerComponent from '../../components/admin/DrawerComponent';
import Navbar from '../../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { adminGetQuestions, adminDeleteQuestion , adminUpdateQuestion} from '../../redux/actions/questionAction';
import { getListUser } from '../../redux/actions/adminAction'

import CircularProgress from '@mui/material/CircularProgress';
import QuestionForm from '../../forms/QuestionForm';

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
    }, [])

    useEffect(() => {
        dispatch(getListUser())
    }, [])


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
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                    <TableContainer sx={{ p: 5, minWidth: 300, mt: 13, border: '3px dashed grey', borderRadius: 5 }}>
                        <Button onClick={createQuestion}>Create Question</Button>

                        {
                            listQuestions ? (
                                <Table sx={{ minWidth: 300, p: 5 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>STT</TableCell>
                                            <TableCell align="left">Question</TableCell>
                                            <TableCell align="right">Answer</TableCell>
                                            <TableCell align="right">Answer</TableCell>
                                            <TableCell align="right">Answer</TableCell>
                                            <TableCell align="right">Answer</TableCell>
                                            <TableCell align="right">action</TableCell>
                                            <TableCell align="right">action</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {
                                            questions.listQuestions.results.map((item, index) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {index + 1}     </TableCell>
                                                    <TableCell align="left">{item.question}</TableCell>
                                                    <TableCell align="right">{item.answer1}</TableCell>
                                                    <TableCell align="right">{item.answer2}</TableCell>

                                                    <TableCell align="right">{item.answer3}</TableCell>
                                                    <TableCell align="right">{item.answer4}</TableCell>
                                                    <TableCell align="right">
                                                        <Button onClick={updateQuestion} value={index}>Edit</Button>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Button onClick={deleteQuestion} value={item.id}>Delete</Button>
                                                    </TableCell>

                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                                
                            ) : <CircularProgress />
                        }
                    </TableContainer>
                    <Copyright sx={{ pt: 4 }} />
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
    );
}
export default AdminDashboard;

