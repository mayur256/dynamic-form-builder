// top level imports
import { lazy } from "react";

// MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Atoms
import Navbar from "./components/organisms/Navbar";
import MainSection from "./layout/MainSection";

// Pages
// const Configurator = lazy(() => import('./pages/Configurator'));
const Presenter = lazy(() => import('./pages/Presentor'));

const appTheme = createTheme();

// component definition
function App() {
    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />

            <Navbar />

            <MainSection>
                <Presenter />
            </MainSection>
        </ThemeProvider>
  );
};

export default App;
