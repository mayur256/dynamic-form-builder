// Top level imports
import { ReactElement } from "react";

// MUI
import { Box } from "@mui/material";

// Utils
import { BUTTON, INPUT, SELECT } from "../../../utils/Constants";

// Props type definition
interface IProps {
    field: any
}
// Component definition
export default function HtmlFieldRenderer({ field }: IProps): ReactElement {

    /** Handler functions - starts */

    // returns a specific html element based on the field type
    const renderField = (field: any): ReactElement => {
        const fieldRenderer: {[key: string]: (field: any) => ReactElement} = {
            [INPUT]: (field: any): ReactElement => {
                return (
                    <input
                        type={field.subtype}
                        name={field.name}
                        id={field.id}
                    />
                )
            },

            [BUTTON]: (field: any): ReactElement => {
                return (
                    <button
                        type={field.subtype}
                        name={field.name}
                        id={field.id}
                    >
                        {field.label}
                    </button>
                )
            },

            [SELECT]: (field: any): ReactElement => {
                return (
                    <select
                        name={field.name}
                        id={field.id}
                    >
                        <option>1</option>
                        <option>2</option>
                    </select>
                )
            },
        };

        return fieldRenderer[field.type]?.(field);
    }

    /** Handler functions - ends */

    // Main JSX
    return (
        <Box
            sx={{
                padding: 1
            }}
        >
            {renderField(field)}
        </Box>
    );
};
