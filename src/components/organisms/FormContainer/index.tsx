// Top level imports
import { ReactElement, useState } from "react";

// MUI
import { Paper, Box, Button, Stack } from "@mui/material";

// Atoms / Molecules / Organisms
import DropContext from "../../molecules/DropContext";
import HtmlFieldRenderer from "../../molecules/HtmlFieldRenderer";

// Utils
import { INPUT } from "../../../utils/Constants";

// Component definition
export default function FormContainer(): ReactElement {

    // State definition
    const [formElements, setFormElements] = useState([]);

    /** Handler functions - starts */
    
    const onDrop = (dropPayload: any): void => {
        const item = dropPayload.item;
        
        if (item.type === INPUT) {

        }

        setFormElements((prevState: any) => {
            if (prevState.some((el: any) => el.uid === item.uid)) {
                return prevState;
            };

            return [...prevState, item];
        });
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
                    position: 'relative',
                    padding: 1,
                    minHeight: '50vh',
                    border: '1px solid #ddd'
                }}
            >
                {formElements.map((item: any): ReactElement => {
                    return (
                        <HtmlFieldRenderer
                            key={item.uid}
                            field={item}
                        />
                    )
                })}

                <Box sx={{ position: 'absolute', bottom: 10, right: 10 }}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained">Save</Button>
                        <Button variant="contained" color="error">Reset</Button>
                    </Stack>
                </Box>
            </Paper>
        </DropContext>
    )
};
