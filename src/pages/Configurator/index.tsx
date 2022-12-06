// top level imports
import { ReactElement, SyntheticEvent, useState, useEffect, useRef } from "react";

// MUI
import { Box, Grid, Typography, Stack, TextField } from "@mui/material";

// React-DnD
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// import sweetalert component(s)
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Atoms / Molecules / Organisms
import Controls from "../../components/organisms/Controls";
import FormContainer from "../../components/organisms/FormContainer";
import PropertiesWindow from "../../components/organisms/PropertiesWindow";
import { SELECT } from "../../utils/Constants";

// Component definition
export default function Configurator(): ReactElement {
    // state definitions
    const [formElements, setFormElements] = useState<Array<any>>([]);
    const [selectedEl, setSelectedEl] = useState<any>({});
    const [gridDim, setGridDim] = useState<any>({
        rows: 1,
        cols: 1
    });

    // Refs
    const gridDimRef = useRef<any>({
        gridRows: 1,
        gridCols: 1
    });


    // Sweet Alert initialization
    const MySwal = withReactContent(Swal);
    const sweetOptions = {
        showCancelButton: true,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: 'Save',
        confirmButtonColor: '#1976d2'
    };

    // Component mounted / updated
    useEffect(() => {
        askForGridDimensions();
    }, []);

    /** Handler functions - starts */

    // an element is dropped into the form container
    // handles the drop event
    const onDrop = (dropPayload: any): void => {
        const item = dropPayload.item;
        const labelText = "Label";
        const options = ['one', 'two'];
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
        ].concat(item.type === SELECT ? [{ name: 'Options', value: options.join(', ') }] : []);

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
            ...sweetOptions
        }).then(result => {
            if (result.isConfirmed) {
                setFormElements((prevState: any) => {
                    if (prevState.some((el: any) => el.uid === item.uid)) {
                        return prevState;
                    };

                    return [
                        ...prevState,
                        {
                            ...item,
                            labelText,
                            style: defaultStyle,
                            options: item.type === SELECT ? options : []
                        }
                    ];
                });
            }
        });
    }

    // Reset the form container
    const resetForm = () => {
        setFormElements([]);
        setSelectedEl({});
    }

    // Removes an element added to form container
    const onRemoveElement = (toBeRemoved: any) => {
        if (toBeRemoved.uid === selectedEl.uid) {
            setSelectedEl({});
        }

        setFormElements((prevState: any) => {
            return prevState.filter((el: any) => el.uid !== toBeRemoved.uid);
        });
    }

    // selects an element that is to be edited
    const onEditElement = (field: any): void => {
        setSelectedEl(field);
    }

    // handles property change of elements
    const propertyChangeHandler = (
        event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>,
        uid: string,
        isStyleProp: boolean = false
    ): void => {
        // event object
        const { name, value } = event.target as HTMLInputElement | HTMLTextAreaElement;
        let newSelectedEl: any = null;
        const tValue = name === 'options' ? value.split(',') : value;
        
        // new transformed form element
        const tEls: Array<any> = formElements.map((el: any) => {
            let finalEl = el;
            if (el.uid === uid) {
                if (isStyleProp) {
                    finalEl = {
                        ...el,
                        style: {
                            ...el.style,
                            [name]: ['height', 'width'].includes(name) ? +tValue : tValue
                        }
                    };
                } else {
                    finalEl = { ...el, [name]: tValue };
                }
            
                newSelectedEl = finalEl;
            }

            return finalEl;
        });

        newSelectedEl && setSelectedEl(newSelectedEl);
        setFormElements(tEls);
    }

    // asks the user for the grid dimensions
    const askForGridDimensions = (): void => {
        MySwal.fire({
            title: 'Enter Grid Dimensions',
            html: (
                <Stack direction="row" spacing={2} padding={1}>
                    {[
                        { key: 'gridRows', label: 'Grid Rows' },
                        { key: 'gridCols', label: 'Grid Columns' }
                    ].map(({ key, label }) => (
                        <TextField
                            key={key}
                            type="number"
                            label={label}
                            size="small"
                            id={key}
                            name={key}
                            defaultValue={gridDimRef.current[key]}
                            onChange={(event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                const { name, value } = event.target as HTMLInputElement | HTMLTextAreaElement;
                                gridDimRef.current[name] = value;
                            }}
                        />
                    ))}
                </Stack>
            ),
            ...sweetOptions
        }).then(result => {
            if (result.isConfirmed) {
                setGridDim({
                    rows: +gridDimRef.current.gridRows,
                    cols: +gridDimRef.current.gridCols,
                })
            }
        });
    }

    /** Handler functions - starts */
    
    // Main Renderer
    return (
        <DndProvider backend={HTML5Backend}>
            <Box>
                <Typography variant="h4" my={1} py={1}>Configurator</Typography>
            </Box>

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
                <Grid item md={6}>
                    <FormContainer
                        formElements={formElements}
                        onDrop={onDrop}
                        removeElement={onRemoveElement}
                        editElement={onEditElement}
                        resetForm={resetForm}
                        gridDim={{
                            rows: +gridDim.rows,
                            cols: +gridDim.cols,
                        }}
                    />
                </Grid>
                <Grid item md={4}>
                    <PropertiesWindow
                        element={selectedEl}
                        onPropertyChange={propertyChangeHandler}
                    />
                </Grid>
            </Grid>
        </DndProvider>
    );
};
