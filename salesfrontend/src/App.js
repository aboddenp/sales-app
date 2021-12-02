import * as React from "react";
import {CssBaseline} from "@mui/material";
import {ThemeProvider, createTheme } from "@mui/material/styles";
import Dashboard from "./Layout/Dashboard"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./views/Home"
import Users from "./views/Users";
import SalesDetails from "./views/SalesDetails";
import Api from "./utils/api"

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {

    const [users,setUsers] = React.useState([])
    const [topUsers,setTopUsers] = React.useState([])
    React.useEffect(()=>{
        const api = new Api();
        api.getUsers().then((response)=>{
            setUsers(response.data)
        })
    },[])

    React.useEffect(()=>{
        setTopUsers(users.slice(0,4))
    },[users])


    return (
        <div>
          <Router>
            <Dashboard>
              <Routes>
                <Route path="/" element={<Home topUsers={topUsers}/>}/>
                <Route path="/users" element={<Users users={users}/>}/>
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
