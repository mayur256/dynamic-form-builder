// Top level imports
import { ReactElement } from "react";
// nanoid
import { nanoid } from "nanoid";
// MUI
import { Box, Stack, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

// Atoms / Molecules / /Organisms
import DragContext from "../../molecules/DragContext";

// Utils
import { BUTTON, FILE, INPUT, SELECT, TEXT } from "../../../utils/Constants";

// Styled component
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
        { type: INPUT, label: 'Input - Text', subtype: TEXT, name: 'input-text', id: 'input-text', uid: nanoid() },
        { type: INPUT, label: 'Input - File', subtype: FILE, name: 'input-file', id: 'input-file', uid: nanoid() },
        { type: BUTTON, label: 'Button', subtype: BUTTON, id: 'button', name: '', uid: nanoid() },
        { type: SELECT, label: 'Select', subtype: '', name: 'select-states', id: 'select-states', uid: nanoid() },
    ];

    // Main JSX
    return (
        <Stack
            sx={{ border: '1px solid #ddd' }}
        >
            <Item
                sx={{
                    backgroundColor: '#000',
                    color: '#fff'
                }}
            >
                Controls
            </Item>
            {elements.map((el) => (
                <DragContext
                    key={el.id}
                    dragSourceId="controls"
                    item={el}
                >
                    <Item>
                        <Typography>{el.label}</Typography>
                    </Item>
                </DragContext>
            ))}
        </Stack>
    )
};
