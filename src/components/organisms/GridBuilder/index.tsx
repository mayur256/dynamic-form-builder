// Top level imports
import { ReactElement } from "react";

// MUI
import { Grid } from "@mui/material";
import DropContext from "../../molecules/DropContext";
import HtmlFieldRenderer from "../../molecules/HtmlFieldRenderer";

// Atoms / Molecules / Organisms
import DragContext from "../../molecules/DragContext";

// Utils
import { FORM_ELEMENTS } from "../../../utils/Constants";

// props type definition
interface IProps {
    // rows: number;
    // cols: number;
    removeElement: (field: any) => void;
    editElement: (field: any) => void;
    onDrop: (dropPayload: any) => void;
    gridCells: Array<any>;
}
// Component definition
export default function GridBuilder({
    // rows,
    // cols,
    removeElement,
    editElement,
    onDrop,
    gridCells = []
}: IProps): ReactElement {

    const MAX_GRID_COLS = 12;

    // Main Renderer
    return (
        <>
            {gridCells.map((row: Array<any>, rowIndex: number) => {
                return (
                    <Grid
                        container
                        key={`row-${rowIndex}`}
                        sx={{
                            border: '1px solid gray',
                        }}
                    >
                        {row.map((col: any, colIndex: number) => {
                            return (
                                <Grid
                                    item
                                    md={MAX_GRID_COLS / row.length}
                                    key={`cell-${rowIndex}-${colIndex}`}
                                    sx={{
                                        borderLeft: col === 0 ? 'none' : '1px solid gray',
                                        borderRight: col === row.length - 1 ? 'none' : '1px solid gray',
                                        position: 'relative',
                                        minHeight: '50px',
                                        backgroundColor: !col?.element ? '#abebab' : '#fff',
                                    }}
                                >
                                    <DropContext
                                        accept={['controls', 'form-elements']}
                                        onDrop={onDrop}
                                        targetInfo={{
                                            id: col.cellId,
                                            rowIndex,
                                            colIndex
                                        }}
                                    >
                                        {col?.element ? (
                                            <DragContext
                                                dragSourceId={FORM_ELEMENTS}
                                                item={{ ...col?.element, rowIndex, colIndex }}
                                            >
                                                <HtmlFieldRenderer
                                                    field={ col?.element }
                                                    removeElement={() => removeElement({
                                                        id: col.cellId,
                                                        rowIndex,
                                                        colIndex
                                                    })}
                                                    editElement={(el) => editElement({ ...el, rowIndex, colIndex })}
                                                    editable
                                                />
                                            </DragContext>
                                        ) : '' }
                                    </DropContext>
                                </Grid>
                            )
                        })}
                    </Grid>
                )
            })}
        </>
    );
};
