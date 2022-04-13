import React, { useEffect , useState} from 'react'
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

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                {/* <Toolbar /> */}
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <TableContainer sx={{ p: 5, minWidth: 300, mt: 13, border: '3px dashed grey', borderRadius: 5 }}>
                    <Button onClick={createUser}>Create User</Button>

                        
                        <Table sx={{ minWidth: 300, p: 5 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell align="left">Username</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="right">Verify</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                    {/* <TableCell align="right">Action</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {
                                    listUser.results.map((item, index) => (
                                        <TableRow
                                            key={index + 1}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {index + 1}</TableCell>
                                            <TableCell align="left">{item.username}</TableCell>

                                            <TableCell align="left">{item.email}</TableCell>
                                            <TableCell align="right">{String(item.isEmailVerified)}</TableCell>
                                            <TableCell align="right">
                                                <Button onClick={updateUser} value={index}>Edit</Button>
                                            </TableCell>
                                            {/* <TableCell align="right">
                                                <Button onClick={deleteUser} value={item.id}>Delete</Button>
                                            </TableCell> */}
                                        </TableRow>
                                    ))
                                }

                            </TableBody>
                        </Table>
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
                    <h2 id="parent-modal-title">{title} User</h2>
                    <UserForm dataModal={dataModal} onClose={handleClose} option={title} />
                </Box>
            </Modal>

        </Box>
        // </ThemeProvider>
    );
}

export default ManagerUser;
