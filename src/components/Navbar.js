import React from 'react'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userAction'

function Navbar() {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.user)

    const handleLogOut = () => {
        dispatch(logout())
    }
    return (
        <AppBar className='app-bar' sx={{ bgcolor: 'white', zIndex: '10000' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <Typography className='logo'
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex', color: 'rgba(41,42,58,.66)', fontWeight: 'bold', fontFamily: 'sans-serif' } }}
                    >
                        QUIZZ
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src={userInfo.user.avatar} />
                        </IconButton>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex', color: 'rgba(41,42,58,.66)', fontWeight: 'bold', fontFamily: 'sans-serif' } }}
                        >
                            {userInfo.user.username}
                        </Typography>
                        <Button
                            type="button"
                            variant="contained"
                            sx={{ color: 'white', display: 'block', fontWeight: 'bold' }}
                            onClick={handleLogOut}
                        >
                            Log out
                        </Button>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Navbar