// top level imports
import { lazy } from "react";

// React - Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Atoms
import Navbar from "./components/organisms/Navbar";
import MainSection from "./layout/MainSection";

// Pages
const Configurator = lazy(() => import('./pages/Configurator'));
const Presenter = lazy(() => import('./pages/Presentor'));

const appTheme = createTheme();

// component definition
function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={appTheme}>
                <CssBaseline />

                <Navbar />

                <MainSection>
                    <Routes>
                        <Route path="/" element={<Presenter />} />
                        <Route path="/configurator" element={<Configurator />} />
                    </Routes>
                </MainSection>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
