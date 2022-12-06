// Top level imports
import { ReactElement } from "react";

// MUI
import { Paper, Box, Button, Stack } from "@mui/material";

// Atoms / Molecules / Organisms
import DropContext from "../../molecules/DropContext";
import HtmlFieldRenderer from "../../molecules/HtmlFieldRenderer";

// Utils
// import { INPUT } from "../../../utils/Constants";

// Props type definition
interface IProps {
    formElements: Array<any>;
    onDrop: (dropPayload: any) => void;
    removeElement: (field: any) => void;
    editElement: (field: any) => void;
    resetForm: () => void;
};

// Component definition
export default function FormContainer({
    formElements,
    onDrop,
    removeElement,
    editElement,
    resetForm
}: IProps): ReactElement {

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
                            removeElement={removeElement}
                            editElement={editElement}
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
