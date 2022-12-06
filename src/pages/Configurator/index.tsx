// top level imports
import { ReactElement, SyntheticEvent, useState } from "react";

// MUI
import { Box, Grid, Typography, Stack } from "@mui/material";

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

// Component definition
export default function Configurator(): ReactElement {
    // state definitions
    const [formElements, setFormElements] = useState<Array<any>>([]);
    const [selectedEl, setSelectedEl] = useState<any>({});
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

    //
    const propertyChangeHandler = (
        event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>,
        uid: string,
        isStyleProp: boolean = false
    ): void => {
        // event object
        const { name, value } = event.target as HTMLInputElement | HTMLTextAreaElement;
        let newSelectedEl: any = null;

        // new transformed form element
        const tEls: Array<any> = formElements.map((el: any) => {
            let finalEl = el;
            if (el.uid === uid) {
                if (isStyleProp) {
                    finalEl = {
                        ...el,
                        style: {
                            ...el.style,
                            [name]: ['height', 'width'].includes(name) ? +value : value
                        }
                    };
                } else {
                    finalEl = { ...el, [name]: value };
                }
            
                newSelectedEl = finalEl;
            }

            return finalEl;
        });

        newSelectedEl && setSelectedEl(newSelectedEl);
        setFormElements(tEls);
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
