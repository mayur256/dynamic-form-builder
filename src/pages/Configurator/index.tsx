// top level imports
import { ReactElement } from "react";

// MUI
import { Grid } from "@mui/material";

// Component definition
export default function Configurator(): ReactElement {
    return (
        <Grid
            container
            spacing={1}
            padding={1}
            sx={{ border: '1px solid #ddd' }}
            mt={1}
        >
            <Grid item md={3}>Elements</Grid>
            <Grid item md={6}>Screen</Grid>
            <Grid item md={3}>Properties</Grid>
        </Grid>
    );
};
