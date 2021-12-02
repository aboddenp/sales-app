import * as React from "react";
import {CssBaseline} from "@mui/material";
import {ThemeProvider, createTheme } from "@mui/material/styles";
import Dashboard from "./Layout/Dashboard"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./views/Home"
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import SalesDetails from "./views/SalesDetails";
import Api from "./utils/api"

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {

    const [users,setUsers] = React.useState([])
    const [summary,setSummary] = React.useState()

    React.useEffect(()=>{
        const api = new Api();
        api.getUsers().then((response)=>{
            setUsers(response.data)
        })
    },[])

    React.useEffect(()=>{
        const api = new Api();
        api.getSummary().then((response)=>{
            setSummary(response.data)
        })
    },[users])

    return (
        <div>
          <Router>
            <Dashboard>
              <Routes>
                <Route path="/" element={<Home users={users} summary={summary}/>}/>
                <Route path="/users" element={<Users users={users}/>}/>
                <Route path="users/:id/sales/" element={<SalesDetails />}/>
                <Route path="*" element={<NotFound/>}/>
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
