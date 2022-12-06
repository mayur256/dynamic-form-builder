// top level imports
import { ReactElement, SyntheticEvent } from "react";

// MUI
import { Box, Paper, Grid, TextField } from "@mui/material";

// Utils
import { SELECT } from "../../../utils/Constants";

// Props type definitions
interface IProps {
    element: any;
    onPropertyChange: (ev: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>, elementUid: string, isStyle?: boolean) => void
};

// Component definition
export default function PropertiesWindow({
    element,
    onPropertyChange
}: IProps): ReactElement {

    const properties = [
        { valueKey: 'id', label: 'Id' },
        { valueKey: 'name', label: 'Name' },
        { valueKey: 'labelText', label: 'Label Text' },
        { valueKey: 'color', label: 'Foreground Color', isStyle: true },
        { valueKey: 'backgroundColor', label: 'Background Color', isStyle: true },
        { valueKey: 'height', label: 'Height', isStyle: true },
        { valueKey: 'width', label: 'Width', isStyle: true },
    ].concat(element.type === SELECT ? [{ valueKey: 'options', label: 'Options (add comma separated values)' }] : []);

    // Main renderer
    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    padding: 1,
                }}
            >
                Properties Window {element?.label && `(${element.label})`}
            </Box>
            <Paper
                sx={{
                    minHeight: '50vh',
                    border: '1px solid #ddd',
                    backgroundColor: '#d6d3d661'
                }}
            >
                {element?.uid && properties.map(({valueKey, label, isStyle = false}: any) => {
                    return (
                        <Grid  container key={valueKey}>
                            <Grid item md={6} sx={{ border: '1px solid #c6bfbf' }} p={1}>{label}</Grid>
                            <Grid item md={6} sx={{ border: '1px solid #c6bfbf' }} p={1}>
                                <TextField
                                    hiddenLabel
                                    variant="outlined"
                                    size="small"
                                    name={valueKey}
                                    value={isStyle ? element?.style?.[valueKey] : element[valueKey]}
                                    onChange={(event) => {
                                        onPropertyChange(event, element?.uid, isStyle)
                                    }}
                                    sx={{ backgroundColor: 'white' }}
                                />
                            </Grid>
                        </Grid>
                    )
                })}
            </Paper>
        </>
    );
};
