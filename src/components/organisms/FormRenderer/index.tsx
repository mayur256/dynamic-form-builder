// Top level imports
import { ReactElement } from "react";

// MUI
import { Grid, } from "@mui/material";

// Atoms / Molecules / Organisms
import HtmlFieldRenderer from "../../molecules/HtmlFieldRenderer";

// Utils
import { MAX_GRID_COLS } from "../../../utils/Constants";

// Props type definitions
interface IProps {
    formElements: Array<any>
};

// Component definition
export default function FormRenderer({ formElements }: IProps): ReactElement {
    return (
        <>
            {formElements.map((row: Array<any>, rowIndex: number) => {
                return (
                    <Grid
                        container
                        key={`row-${rowIndex}`}
                    >
                        {row.map((col: any, colIndex: number) => {
                            return (
                                <Grid
                                    item
                                    md={MAX_GRID_COLS / row.length}
                                    key={`cell-${rowIndex}-${colIndex}`}
                                >
                                    {col?.element && (
                                        <HtmlFieldRenderer
                                            field={col?.element}
                                        />
                                    )}
                                </Grid>
                            )
                        })}
                    </Grid>
                )
            })}
        </>
    );
}