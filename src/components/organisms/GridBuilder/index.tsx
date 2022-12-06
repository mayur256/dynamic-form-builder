// Top level imports
import { ReactElement } from "react";

// MUI
import { Grid } from "@mui/material";

// props type definition
interface IProps {
    rows: number;
    cols: number;
}
// Component definition
export default function GridBuilder({
    rows,
    cols
}: IProps): ReactElement {

    const MAX_GRID_COLS = 12;

    // Main Renderer
    return (
        <>
            {Array.from(Array(rows).keys()).map((row) => {
                return (
                    <Grid
                        container
                        key={row}
                        sx={{
                            border: '1px solid gray'
                        }}
                    >
                        {Array.from(Array(cols).keys()).map((col) => {
                            return (
                                <Grid
                                    item
                                    md={MAX_GRID_COLS / cols} key={`${row}-${col}`}
                                    sx={{
                                        borderLeft: col === 0 ? 'none' : '1px solid gray',
                                        borderRight: col === cols - 1 ? 'none' : '1px solid gray',
                                        padding: 2
                                    }}
                                    
                                >
                                    Cell {row} - {col}
                                </Grid>
                            )
                        })}
                    </Grid>
                )
            })}
        </>
    );
};
