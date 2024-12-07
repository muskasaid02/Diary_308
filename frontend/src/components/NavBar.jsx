import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout.js';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const NavBar = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const handleClick = () => logout();

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2', paddingY: 1 }}>
            <Container maxWidth="lg">
                <Toolbar sx={{ minHeight: '20% !important', display: 'flex', justifyContent: 'space-between' }}>
                    
                    {/* Left-aligned Home link with translateX to adjust horizontal position */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', transform: 'translateX(-270%)translateY(-20%)' }}>
                        <Typography variant="h6" component="div">
                            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                                Home
                            </Link>
                        </Typography>
                    </Box>

                    {/* Centered Title with optional translateY to move it vertically */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', transform: 'translateY(-20%)' }}>
                        <Typography variant="h6" component="div">
                            The Diary App
                        </Typography>
                    </Box>

                    {/* Right-aligned Login/Signup or Logout with translateX to adjust position */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', transform: 'translateX(130%)translateY(-20%)' }}>
                        {user ? (
                            <>
                                <Typography variant="body1" sx={{ marginRight: 2 }}>
                                    {user.email}
                                </Typography>
                                <Button color="inherit" onClick={handleClick}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button color="inherit" component={Link} to="/api/login">
                                    Login
                                </Button>
                                <Button color="inherit" component={Link} to="/api/signup">
                                    Signup
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
