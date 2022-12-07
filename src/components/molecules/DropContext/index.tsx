// Top level imports
import { ReactElement, ReactNode } from "react";

// React DnD
import { useDrop } from "react-dnd";

// MUI
import { Box } from "@mui/material";

// Props type definition
interface IProps {
    accept: string | string[];
    children: ReactNode;
    onDrop: (item: any, targetInfo?: any) => void;
    targetInfo?: any
}

// Component definition
const DropContext = ({
    accept,
    children,
    onDrop,
    targetInfo = {},
    ...rest
}: IProps): ReactElement => {
    // drop hook
    const [, drop] = useDrop(() => ({
        accept,
        drop: (dropPayload) => {
            onDrop(dropPayload, targetInfo);
        }
    }));

    // Main JSX
    return (
        <Box
            ref={drop}
            {...rest}
            sx={{ width: '100%', height: '100%' }}
        >
            {children}
        </Box>
    )
};

export default DropContext;
