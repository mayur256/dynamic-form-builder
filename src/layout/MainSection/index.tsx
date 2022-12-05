// Top level imports
import { ReactElement, ReactNode, Suspense } from "react";

// MUI
import { CircularProgress, Container } from "@mui/material";

// Props type definition
interface IProps {
    children: ReactNode
};

// Component definition
export default function MainSection({ children }: IProps): ReactElement {
    return (
        <Container maxWidth="xl">
            <Suspense fallback={<CircularProgress />}>
                {children}
            </Suspense>
        </Container>
    );
};
