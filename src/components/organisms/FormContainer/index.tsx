// Top level imports
import { ReactElement, useState } from "react";

// MUI
import { Paper, Box, Button, Stack, Typography } from "@mui/material";

// import sweetalert component(s)
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Atoms / Molecules / Organisms
import DropContext from "../../molecules/DropContext";
import HtmlFieldRenderer from "../../molecules/HtmlFieldRenderer";

// Utils
// import { INPUT } from "../../../utils/Constants";

// Component definition
export default function FormContainer(): ReactElement {

    // State definition
    const [formElements, setFormElements] = useState([]);

    // Sweet Alert initialization
    const MySwal = withReactContent(Swal);

    /** Handler functions - starts */
    
    // an element is dropped into the form container
    // handles the drop event
    const onDrop = (dropPayload: any): void => {
        const item = dropPayload.item;
        const labelText = "Label";
        const defaultStyle = {
            backgroundColor: 'white',
            height: 30,
            width: 150
        }

        const properties = [
            { name: 'Label Text', value: labelText },
            { name: 'Height', value: defaultStyle.height },
            { name: 'Width', value: defaultStyle.width },
            { name: 'Background Color', value: defaultStyle.backgroundColor },
        ];

        MySwal.fire({
            title: 'Default Properties',
            html: (
                <Stack direction="column" spacing={1}>
                    {properties.map((prop) => {
                        return (
                            <Stack direction="row" spacing={2}>
                                <Typography sx={{ fontWeight: 600 }}>{prop.name}: </Typography>
                                <Typography>{prop.value}</Typography>
                            </Stack>
                        )
                    })}
                </Stack>
            ),
            showCancelButton: true,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: 'Save',
            confirmButtonColor: '#1976d2'
        }).then(result => {
            if (result.isConfirmed) {
                setFormElements((prevState: any) => {
                    if (prevState.some((el: any) => el.uid === item.uid)) {
                        return prevState;
                    };

                    return [...prevState, { ...item, labelText, style: defaultStyle }];
                });
            }
        });
    }

    // Reset the form container
    const resetForm = () => {
        setFormElements([]);
    }

    // Removes an element added to form container
    const onRemoveElement = (toBeRemoved: any) => {
        setFormElements((prevState: any) => {
            return prevState.filter((el: any) => el.uid !== toBeRemoved.uid);
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
                    minHeight: '50vh',
                    border: '1px solid #ddd'
                }}
            >
                {formElements.map((item: any): ReactElement => {
                    return (
                        <HtmlFieldRenderer
                            key={item.uid}
                            field={item}
                            removeElement={onRemoveElement}
                        />
                    )
                })}

                {formElements.length > 0 && (
                    <Box sx={{ position: 'absolute', bottom: 10, right: 10 }}>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained">Save</Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={resetForm}
                            >
                                Reset
                            </Button>
                        </Stack>
                    </Box>
                )}
            </Paper>
        </DropContext>
    )
};
