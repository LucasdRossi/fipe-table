import React, { Component } from "react";
import { Provider } from "mobx-react";
import store from "./store";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import routes from "./config/routes";
import ThemeProvider from "./theme";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ThemeProvider>
          <Provider {...store}>
            <BrowserRouter>
              <Switch>
                {routes.map((route) => (
                  <Route {...route} />
                ))}
              </Switch>
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
