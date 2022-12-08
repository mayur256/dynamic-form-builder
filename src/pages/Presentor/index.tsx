// Top level imports
import { ReactElement } from "react";

// MUI
import { Box, Button, Typography, Grid } from "@mui/material";
// Icons
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

// Component definition
export default function Presentor(): ReactElement {
    // Main JSX
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4" my={1} py={1}>Presenter</Typography>
                <Box sx={{  pt: 2}}>
                    <Button
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload
                    </Button>
                </Box>
            </Box>

            <Grid
                container
                spacing={1}
                padding={1}
                sx={{
                    border: '1px solid #ddd',
                    minHeight: '60vh'
                }}
                mt={1}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Typography>Upload json file to generate the UI</Typography>
                </Box>
            </Grid>
        </>
    );
};
