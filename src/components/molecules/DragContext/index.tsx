// Top Level imports
import { ReactElement, ReactNode } from "react";

// React DnD
import { useDrag } from "react-dnd";

// MUI
import { Box } from "@mui/material";

// Prop type definition
interface IProps {
    dragSourceId: string;
    item: any;
    children: ReactNode
};

// Component definition
const DragContext = ({
    dragSourceId,
    item,
    children,
}: IProps): ReactElement => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: dragSourceId,
        item: () => {
            return { item, dragSourceId }
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const setCursor = () => {
        let cursor = 'pointer'
        if (isDragging) {
            cursor = 'grab';
        }
        return cursor;
    }

    return (
        <Box
            ref={drag}
            sx={{
                cursor: setCursor(),
                height: '100%'
            }}
        >
            {children}
        </Box>
    )
};

export default DragContext;
