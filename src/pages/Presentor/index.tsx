// Top level imports
import { ReactElement, useState, useRef, ChangeEvent } from "react";

// import sweetalert component(s)
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// MUI
import { Box, Button, Typography, Grid } from "@mui/material";
// Icons
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import FormRenderer from "../../components/organisms/FormRenderer";

// Component definition
export default function Presentor(): ReactElement {
    // state definitions
    const [formUI, setFormUI] = useState<Array<any>>([]);

    // Refs
    const fileRef = useRef<any>(null);

    // Sweet Alert initialization
    const MySwal = withReactContent(Swal);
    /* const sweetOptions = {
        showCancelButton: true,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: 'Save',
        confirmButtonColor: '#1976d2'
    }; */

    /** Handler functions - starts */
    const onFileUploadClicked = () => {
        fileRef.current.click();
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0);
        
        if (['application/json', 'text/plain'].includes(file?.type as string)) {
            readFileContents(file);
        } else {
            MySwal.fire({text: 'Invalid file type'});
        }
    }

    const readFileContents = (file: any) => {
        const fileReader = new FileReader();

        fileReader.onload = (loadEvt) => {
            const result = loadEvt?.target?.result as string;
            // has non empty content
            if (result.length > 0) {
                try {
                    const formDataFromFile = JSON.parse(result);
                    // Check for the cellular structure
                    if (Array.isArray(formDataFromFile) && Array.isArray(formDataFromFile[0])) {
                        setFormUI(formDataFromFile);
                    } else {
                        MySwal.fire({ text: 'Invalid data format' });
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }

        fileReader.readAsText(file);
    }

    /** Handler functions - ends */

    // Main JSX
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4" my={1} py={1}>Presenter</Typography>
                <Box sx={{  pt: 2}}>
                    <Button
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        onClick={onFileUploadClicked}
                    >
                        Upload
                    </Button>

                    <input
                        type="file"
                        hidden
                        ref={fileRef}
                        onChange={handleFileChange}
                        accept=".txt, .json"
                    />
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
                {!formUI.length && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Typography>Upload json file to generate the UI</Typography>
                    </Box>
                )}

                {formUI.length > 0 && (
                    <FormRenderer
                        formElements={formUI}
                    />
                )}
            </Grid>
        </>
    );
};
