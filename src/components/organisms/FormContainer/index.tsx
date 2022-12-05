// Top level imports
import { ReactElement } from "react";

// MUI
import { Paper, Box } from "@mui/material";

// Atoms / Molecules / Organisms
import DropContext from "../../molecules/DropContext";

// Component definition
export default function FormContainer(): ReactElement {

    /** Handler functions - starts */
    
    const onDrop = (item: any): void => {
        console.log(item);
    }
    
    /** Handler functions - starts */

    // Main JSX
    return (
        <DropContext
            accept="controls"
            onDrop={onDrop}
        >
            <Box
                sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    padding: 1,
                }}
            >
                Form Container
            </Box>
            <Paper
                sx={{
                    padding: 1,
                    minHeight: '50vh',
                    border: '1px solid #ddd'
                }}
            >
            </Paper>
        </DropContext>
    )
};
