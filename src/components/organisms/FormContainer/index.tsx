// Top level imports
import { ReactElement } from "react";

// MUI
import { Paper } from "@mui/material";

// Component definition
export default function FormContainer(): ReactElement {
    return (
        <Paper
            sx={{ 
                padding: 1,
                minHeight: '50vh',
                border: '1px solid #ddd'
            }}
        >
        </Paper>
    )
};
