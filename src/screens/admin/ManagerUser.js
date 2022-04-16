import React, { useEffect, useState } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import {
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,

} from '@mui/material';

import Copyright from '../../components/Copyright';
import DrawerComponent from '../../components/admin/DrawerComponent';
import Navbar from '../../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getListUser } from '../../redux/actions/adminAction';
import UserForm from '../../forms/UserForm';
import UserTable from '../../components/admin/UserTable';

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

function ManagerUser() {
    const dispatch = useDispatch()
    const { listUser } = useSelector(state => state.admin)
    const [open, setOpen] = useState(false);
    const [dataModal, setDataModal] = useState({})
    const [title, setTitle] = useState('')

    const handleClose = () => {
        setDataModal({})
        setOpen(false);
    };
    const updateUser = (e) => {
        setDataModal({
            ...listUser.results[e.target.value]
        })

        setTitle("update")
        setOpen(true)

    }
    const createUser = () => {
        setDataModal({})
        setTitle("create")
        setOpen(true)
    }



    return (
        // <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar />
            <DrawerComponent />

            <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', }}>
                <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
                    <Button sx={{ mt: 9 }} onClick={createUser}>Create User</Button>
                    <UserTable itemsPerPage={5} items={listUser.results} onEdit={updateUser} />
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
                    <h2 id="parent-modal-title">{title} User</h2>
                    <UserForm dataModal={dataModal} onClose={handleClose} option={title} />
                </Box>
            </Modal>

        </Box>
        // </ThemeProvider>
    );
}

export default ManagerUser;
