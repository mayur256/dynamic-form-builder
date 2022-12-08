// Top level imports
import { ReactElement, ReactNode, Suspense } from "react";

// MUI
import { Box, CircularProgress, Container } from "@mui/material";

// Props type definition
interface IProps {
    children: ReactNode
};

// Component definition
export default function MainSection({ children }: IProps): ReactElement {
    return (
        <Container maxWidth="xl">
            <Suspense
                fallback={
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            minHeight: '80vh',
                            alignItems: 'center'
                        }}>
                        <CircularProgress />
                    </Box>
                }
            >
                {children}
            </Suspense>
        </Container>
    );
};
