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
    onDrop: (item: any) => void
}

// Component definition
const DropContext = ({
    accept,
    children,
    onDrop,
    ...rest
}: IProps): ReactElement => {
    // drop hook
    const [, drop] = useDrop(() => ({
        accept,
        drop: onDrop
    }));

    // Main JSX
    return (
        <Box
            ref={drop}
            {...rest}
        >
            {children}
        </Box>
    )
};

export default DropContext;
