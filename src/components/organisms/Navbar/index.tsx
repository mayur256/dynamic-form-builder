// Top level imports
import { ReactElement } from "react";

// MUI
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

// Component definition
export default function Navbar(): ReactElement {
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
                        News
                    </Typography>

                    <Button color="inherit" sx={{ textAlign: 'right' }}>Login</Button>
                </Toolbar>
            </AppBar >
        </Box>
    );
}