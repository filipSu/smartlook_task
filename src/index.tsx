import * as React from "react";
import {render} from "react-dom";
import { BrowserRouter, HashRouter } from 'react-router-dom';
import {AppContainer} from "react-hot-loader";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Theme from "./misc/Theme";
import {fade} from 'material-ui/utils/colorManipulator';
import App from "./components/App";
/* MaterialUI requires tapEventPlugin injection*/
const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
/* set root element*/
const rootEl = document.getElementById("root");


render(
    <AppContainer>
        <HashRouter>
            <MuiThemeProvider muiTheme={Theme}>
                <App/>
            </MuiThemeProvider>
        </HashRouter>
    </AppContainer>,
    rootEl
);

// Hot Module Replacement API
declare let module: {hot: any};

if (module.hot) {
    module.hot.accept("./components/App", () => {
        const NewApp = require("./components/App").default;

        render(
            <AppContainer>
                <HashRouter>
                    <MuiThemeProvider muiTheme={Theme}>
                        <NewApp/>
                    </MuiThemeProvider>
                </HashRouter>
            </AppContainer>,
            rootEl
        );
    });
}
