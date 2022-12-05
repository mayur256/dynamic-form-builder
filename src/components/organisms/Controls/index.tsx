// Top level imports
import { ReactElement } from "react";

// MUI
import { Box, Stack, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';


const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body1,
    padding: theme.spacing(1),
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
    borderRadius: 'none'
}));


// component definition
export default function Controls(): ReactElement {
    const elements = [
        { type: 'input', label: 'Input - Text', subtype: 'text', name: 'input-text', id: 'input-text' },
        { type: 'input', label: 'Input - File', subtype: 'file', name: 'input-file', id: 'input-file' },
        { type: 'button', label: 'Button', subtype: 'button', id: 'button', name: '' },
        { type: 'select', label: 'Select', subtype: '', name: 'select-states', id: 'select-states' },
    ];

    // Main JSX
    return (
        <Stack
            sx={{ border: '1px solid #ddd' }}
        >
            {elements.map((el) => (
                <Item key={el.id}>
                    <Typography>{el.label}</Typography>
                </Item>
            ))}
        </Stack>
    )
};
