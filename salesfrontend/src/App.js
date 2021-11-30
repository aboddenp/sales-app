import * as React from 'react';
import {AppBar,Toolbar,IconButton,Typography} from '@mui/material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <div>
          <AppBar enableColorOnDark>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:"center" }}>
              SALEMOST
            </Typography>
            <IconButton
              edge="end"
              sx={{fontSize:2}}
              color="inherit"
              onClick={colorMode.toggleColorMode}
              aria-label="dark-mode"
            >
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* TODO: add Drawer */}
        {/* TODO: add Main user list*/}
        {/* TODO: add Main List items */}
    </div>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
// function App() {
//   const colorMode = useContext(ColorModeContext);
//   const theme = useTheme();
//   return (
//     <div className="App">
//       <ToggleColorMode>
        // <AppBar enableColorOnDark>
        //   <Toolbar>
        //     <IconButton
        //       size="large"
        //       edge="start"
        //       color="inherit"
        //       aria-label="menu"
        //     >
        //       <MenuIcon/>
        //     </IconButton>
        //     <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:"center" }}>
        //       SALEMOST
        //     </Typography>
        //     <IconButton
        //       edge="end"
        //       sx={{fontSize:2}}
        //       color="inherit"
        //       onClick={colorMode.toggleColorMode}
        //       aria-label="dark-mode"
        //     >
        //       {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        //     </IconButton>
        //   </Toolbar>
        // </AppBar>
        // {/* TODO: add Drawer */}
        // {/* TODO: add Main user list*/}
        // {/* TODO: add Main List items */}
//       </ToggleColorMode>
//     </div>
//   );
// }
