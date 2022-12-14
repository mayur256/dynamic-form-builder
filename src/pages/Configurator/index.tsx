// top level imports
import { ReactElement, SyntheticEvent, useState, useEffect, useRef } from "react";

// MUI
import {
    Box,
    Grid,
    Typography,
    Stack,
    TextField,
    Button,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
} from "@mui/material";

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

// Utils
import { FORM_ELEMENTS, SELECT } from "../../utils/Constants";

// Component definition
export default function Configurator(): ReactElement {
    // state definitions
    const [formElements] = useState<Array<any>>([]);
    const [selectedEl, setSelectedEl] = useState<any>({});
    const [gridCells, setGridCells] = useState<Array<any>>(() => {
        const jsonData = window.localStorage.getItem('formUI');
        if (jsonData) {
            return JSON.parse(jsonData);
        }
        return [];
    });

    // Refs
    const gridDimRef = useRef<any>({
        gridRows: 1,
        gridCols: 1
    });
    const operationRef = useRef('copy');


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
        // askForGridDimensions();
    }, []);

    /** Handler functions - starts */

    // an element is dropped into the form container
    // handles the drop event
    const onDrop = async (dropPayload: any, dropTargetInfo?: any) => {
        const item = dropPayload.item;
        const { dragSourceId } = dropPayload;
        // determines whether the dnd operation is within grid or not
        const isWithinGrid = dragSourceId === FORM_ELEMENTS;
        // Elements' properties initialization
        const labelText = "Label";
        const options = ['one', 'two'];
        const defaultStyle = {
            backgroundColor: 'white',
            height: 30,
            width: 150
        };

        const properties = [
            { name: 'Label Text', value: labelText },
            { name: 'Height', value: defaultStyle.height },
            { name: 'Width', value: defaultStyle.width },
            { name: 'Background Color', value: defaultStyle.backgroundColor },
        ].concat(item.type === SELECT ? [{ name: 'Options', value: options.join(', ') }] : []);


        if (isWithinGrid) {
            // ask user whether it wishes to copy or move the element to a cell in the grid
            await askForMoveOrCopy();
        }

        if (dropTargetInfo.hasOwnProperty('rowIndex') && dropTargetInfo.hasOwnProperty('colIndex')) {
            // indexes of cells where the element is dropped
            const { rowIndex, colIndex } = dropTargetInfo;

            const alreadyHasElement = gridCells[rowIndex][colIndex].element !== null;

            const sweetAlertContent = {
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
            };

            if (alreadyHasElement) {
                sweetAlertContent.title = 'Replace Element';
                sweetAlertContent.html = (
                    <Typography>
                        There's already an element in this cell. Do you want to replace the element in the cell?
                    </Typography>
                );
            }

            if (isWithinGrid && !alreadyHasElement) {
                setNewGridState({
                    item,
                    rowIndex,
                    colIndex,
                    labelText,
                    defaultStyle,
                    options,
                    operationRef,
                    isWithinGrid
                });
            } else {
                MySwal.fire({
                    ...sweetAlertContent,
                    ...sweetOptions
                }).then(result => {
                    if (result.isConfirmed) {
                        // set new state for the grid
                        setNewGridState({
                            item,
                            rowIndex,
                            colIndex,
                            labelText,
                            defaultStyle,
                            options,
                            operationRef,
                            isWithinGrid
                        });
                    }
                });
            }
        }
    }

    // Reset the form container
    const resetForm = () => {
        // setFormElements([]);
        setGridCells([]);
        setSelectedEl({});
    }

    // Removes an element added to form container
    const onRemoveElement = (toBeRemoved: any) => {
        if (toBeRemoved.hasOwnProperty('rowIndex') && toBeRemoved.hasOwnProperty('colIndex')) {
            const { rowIndex, colIndex} = toBeRemoved;
            setGridCells((prevState: Array<any>) => {
                const tGridCells = [...prevState];
                tGridCells[rowIndex][colIndex].element = null;
                return tGridCells;
            });

            if (selectedEl.rowIndex === rowIndex && selectedEl.colIndex === colIndex) {
                setSelectedEl({});
            }
        }
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
        
        if (selectedEl.hasOwnProperty('rowIndex') && selectedEl.hasOwnProperty('colIndex')) {
            const { rowIndex, colIndex } = selectedEl;
            setGridCells((prevState: Array<any>) => {
                const tGridCells = [...prevState];
                let targetEl = tGridCells[rowIndex][colIndex].element;

                if (isStyleProp) {
                    targetEl = {
                        ...targetEl,
                        style: {
                            ...targetEl.style,
                            [name]: ['height', 'width'].includes(name) ? +tValue : tValue
                        }
                    };
                } else {
                    targetEl = { ...targetEl, [name]: tValue };
                }

                newSelectedEl = { ...targetEl, rowIndex, colIndex };
                tGridCells[rowIndex][colIndex].element = targetEl;
                newSelectedEl && setSelectedEl(newSelectedEl);
                return tGridCells;
            });
        }

        // new transformed form element
        /* const tEls: Array<any> = formElements.map((el: any) => {
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
        }); */
        // setFormElements(tEls);
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
                const grids: Array<any> = [];
                const rows = +gridDimRef.current.gridRows;
                const cols = +gridDimRef.current.gridCols;

                // Compute the grid cells based on user input
                for (let x = 0; x < rows; x++) {
                    const colsArray = [];
                    for (let y = 0; y < cols; y++) {
                        colsArray.push({
                            rowIndex: x,
                            colIndex: y,
                            cellId: `cell-${x}-${y}`,
                            element: null
                        });
                    }
                    grids.push(colsArray);
                }

                setGridCells((prevState: Array<any>) => [...prevState, ...grids]);
            }
        });
    }

    // prompt the user for copy or move operation
    const askForMoveOrCopy = () => {
        return MySwal.fire({
            title: 'Move or Copy element',
            html: (
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue={operationRef.current}
                        onChange={e => {
                            operationRef.current = e.target.value;
                        }}
                    >
                        <FormControlLabel value="copy" control={<Radio />} label="Copy" />
                        <FormControlLabel value="move" control={<Radio />} label="Move" />
                    </RadioGroup>
                </FormControl>
            ),
        });
    }

    // sets new grid state and effectively positions the elements in the grid
    const setNewGridState = ({
        item,
        rowIndex,
        colIndex,
        labelText,
        defaultStyle,
        options,
        operationRef,
        isWithinGrid
    }: any) => {
        setGridCells((prevState: Array<any>) => {
            const tGridCells = [...prevState];
            tGridCells[rowIndex][colIndex].element = {
                ...item,
                labelText,
                style: defaultStyle,
                options: item.type === SELECT ? options : []
            };

            if (isWithinGrid && operationRef.current === "move") {
                // indexes of the cell from where the element is dragged
                const { rowIndex: dragRowIndex, colIndex: dragColIndex } = item;
                if (tGridCells[dragRowIndex][dragColIndex]?.hasOwnProperty('element')) {
                    tGridCells[dragRowIndex][dragColIndex].element = null;
                }
            }

            return tGridCells;
        });
    }

    // generates a json representation of the form container elements
    const generateJson = () => {
        let fileName = '';
        MySwal.fire({
            title: 'Screen Name',
            html: (
                <Grid spacing={2} container>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            name="filename"
                            size="small"
                            label="Please enter Screen Name"
                            defaultValue={fileName}
                            onChange={(e) => fileName = e.target.value}
                        />
                    </Grid>
                </Grid>
            ),
            ...sweetOptions
        }).then(result => {
            if (result.isConfirmed) {
                const data = JSON.stringify(gridCells);
                window.localStorage.setItem('formUI', data);
                downloadJsonData(data, fileName);
            }
        })

    }

    // downloads a file with json data
    const downloadJsonData = (jsonData: any, fileName: any) => {
        const blob = new Blob([jsonData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${fileName}.json`;
        link.href = url;
        link.click();
    };

    /** Handler functions - stops */
    
    // Main Renderer
    return (
        <DndProvider backend={HTML5Backend}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4" my={1} py={1}>Configurator</Typography>
                <Box>
                    <Stack direction="row" spacing={2} paddingTop={2}>
                        <Button variant="contained" onClick={askForGridDimensions}>Add Grid Cells</Button>
                        <Button variant="contained" disabled={gridCells.length === 0} onClick={generateJson}>Save</Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={resetForm}
                            disabled={gridCells.length === 0}
                        >
                            Reset
                        </Button>
                    </Stack>
                </Box>
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
                        gridCells={gridCells}
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
