import * as React from "react";
import {CssBaseline} from "@mui/material";
import {ThemeProvider, createTheme } from "@mui/material/styles";
import Dashboard from "./Layout/Dashboard"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./views/Home"
import Users from "./views/Users";
import SalesDetails from "./views/SalesDetails";

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
    return (
        <div>
          <Router>
            <Dashboard>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/sales/:id" element={<SalesDetails/>}/>
              </Routes>
            </Dashboard>
          </Router>
        </div>
    );
}

export default function ToggleColorMode() {
    const [mode, setMode] = React.useState("light");
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
        }),
        []
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <MyApp />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
