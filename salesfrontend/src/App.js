import * as React from "react";
import {CssBaseline} from "@mui/material";
import {ThemeProvider, createTheme } from "@mui/material/styles";
import Dashboard from "./Layout/Dashboard"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./components/Home"
import UserList from "./components/UserList";

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
    return (
        <div>
          <Router>
            <Dashboard>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/userlist" element={<UserList/>}/>
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
