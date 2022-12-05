// top level imports
import { ReactElement } from "react";

// MUI
import { Grid } from "@mui/material";

// React-DnD
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// Atoms / Molecules / Organisms
import Controls from "../../components/organisms/Controls";
import FormContainer from "../../components/organisms/FormContainer";

// Component definition
export default function Configurator(): ReactElement {
    return (
        <DndProvider backend={HTML5Backend}>
            <Grid
                container
                spacing={1}
                padding={1}
                sx={{ border: '1px solid #ddd' }}
                mt={1}
            >
                <Grid item md={2}>
                    <Controls />
                </Grid>
                <Grid item md={7}>
                    <FormContainer />
                </Grid>
                <Grid item md={3}>Properties</Grid>
            </Grid>
        </DndProvider>
    );
};
