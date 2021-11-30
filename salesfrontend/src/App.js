import * as React from "react";
import {CssBaseline, Typography} from "@mui/material";
import {ThemeProvider, createTheme } from "@mui/material/styles";
import Dashboard from "./Layout/Dashboard"

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
    return (
        <div>
          <Dashboard>
            <Typography>
              Hello this is the main content
            </Typography>
          </Dashboard>
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
