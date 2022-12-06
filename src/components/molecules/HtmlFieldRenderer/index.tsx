// Top level imports
import { ReactElement } from "react";

// MUI
import { Box, Stack } from "@mui/material";

// Icons
import { CloseTwoTone as CloseIcon } from "@mui/icons-material";

// Utils
import { BUTTON, INPUT, SELECT } from "../../../utils/Constants";

// Props type definition
interface IProps {
    field: any,
    removeElement: (field: any) => void
}
// Component definition
export default function HtmlFieldRenderer({ field, removeElement }: IProps): ReactElement {

    /** Handler functions - starts */

    // returns a specific html element based on the field type
    const renderField = (field: any): ReactElement => {
        const fieldRenderer: {[key: string]: (field: any) => ReactElement} = {
            [INPUT]: (field: any): ReactElement => {
                return (
                    <Stack direction="row" spacing={2} sx={{ verticalAlign: 'center', width: 'inherit' }}>
                        {field.labelText && (
                            <label>{ field.labelText} :</label>
                        )}

                        <input
                            type={field.subtype}
                            name={field.name}
                            id={field.id}
                            style={field?.style ?? {}}
                        />
                    </Stack>
                )
            },

            [BUTTON]: (field: any): ReactElement => {
                return (
                    <button
                        type={field.subtype}
                        name={field.name}
                        id={field.id}
                        style={field?.style ?? {}}
                    >
                        {field.labelText ? field.labelText : 'Label'}
                    </button>
                )
            },

            [SELECT]: (field: any): ReactElement => {
                return (
                    <Stack direction="row" spacing={2} sx={{ verticalAlign: 'center', width: 'inherit' }}>
                        {field.labelText && (
                            <label>{field.labelText} :</label>
                        )}

                        <select
                            name={field.name}
                            id={field.id}
                            style={field?.style ?? {}}
                        >
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </Stack>
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
                position: 'relative',
                padding: 1,
                width: '100%',
                borderBottom: '2px solid #ddd'
            }}
        >
            {renderField(field)}

            <Box sx={{ position: 'absolute', top: 0, right: 0 }} title="Remove Element">
                <CloseIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={() => removeElement(field)}
                />
            </Box>
        </Box>
    );
};
