import * as React from "react";
import {render} from "react-dom";
import { BrowserRouter, HashRouter } from 'react-router-dom';
import {AppContainer} from "react-hot-loader";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Theme from "./misc/Theme";

import {
    deepPurple800,
    grey600,
    pinkA100, pinkA200, pinkA400,
    fullWhite,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

import App from "./components/App";

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
