// top level imports
import { lazy } from "react";

// MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Atoms
import Navbar from "./components/organisms/Navbar";
import MainSection from "./layout/MainSection";

const Configurator = lazy(() => import('./pages/Configurator'));

const appTheme = createTheme();

// component definition
function App() {
    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />

            <Navbar />

            <MainSection>
                <Configurator />
            </MainSection>
        </ThemeProvider>
  );
};

export default App;
