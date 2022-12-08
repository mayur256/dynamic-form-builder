// Top level imports
import { ReactElement } from "react";

// MUI
import { Box, Stack } from "@mui/material";

// Icons
import {
    CloseTwoTone as CloseIcon,
    Edit as EditIcon
} from "@mui/icons-material";


// Utils
import { BUTTON, INPUT, SELECT } from "../../../utils/Constants";

// Props type definition
interface IProps {
    field: any;
    removeElement?: (field: any) => void;
    editElement?: (field: any) => void;
    editable?: boolean;
}
// Component definition
export default function HtmlFieldRenderer({
    field,
    removeElement,
    editElement,
    editable
}: IProps): ReactElement {

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
                        {field.labelText}
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
                            {Array.isArray(field.options) && field.options.map((opt: string, index: number) => (
                                <option value={opt} key={`${opt}-${index}`}>{opt}</option>
                            ))}
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
        <Box sx={{ padding: 1 }}>
            {renderField(field)}

            {editable && (
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                >
                    <CloseIcon
                        sx={{ cursor: 'pointer' }}
                        onClick={() => removeElement?.(field)}
                    />

                    <EditIcon
                        sx={{ cursor: 'pointer' }}
                        onClick={() => editElement?.(field)}
                    />
                </Stack>
            )}
        </Box>
    );
};
