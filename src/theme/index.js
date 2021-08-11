import * as React from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@material-ui/core/styles";

import GlobalStyle from "./globalStyles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#00B0AA",
    },
  },
});

const ThemeProvider = (props) => (
  <MUIThemeProvider theme={theme}>
    <GlobalStyle />
    {props.children}
  </MUIThemeProvider>
);

export default ThemeProvider;
