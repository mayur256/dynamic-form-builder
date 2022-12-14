// Top level imports
import { ReactElement } from "react";

// React - Router
import { useNavigate } from "react-router-dom";

// MUI
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

// Component definition
export default function Navbar(): ReactElement {
    // Hooks
    const navigate = useNavigate();

    const goTo = (path: string) => {
        navigate('/' + path);
    }
    // Main JSX
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Dynamic Form Builder
                    </Typography>

                    <Button color="inherit" sx={{ textAlign: 'right' }} onClick={() => goTo('')}>Home</Button>
                    <Button color="inherit" sx={{ textAlign: 'right' }} onClick={() => goTo('configurator')}>Configurator</Button>
                </Toolbar>
            </AppBar >
        </Box>
    );
}
