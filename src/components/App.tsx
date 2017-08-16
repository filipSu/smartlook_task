import * as React from "react";
import { Switch, Route, Link } from 'react-router-dom';
import Posts from "./Posts";
import Post from "./Post";

require("!style-loader!css-loader!sass-loader!../scss/App.scss");

export interface AppProps {
}

export default class App extends React.Component<AppProps, undefined> {
    render() {
        return (
            <div className="app container">
                <main className="row content-wrapper">
                    <section className="col-xs-12 center row top-xs">
                        <div className="col-xs-10 center content">
                            <switch>
                                <Route exact path="/" component={Posts} />
                                <Route path="/post" component={Post} />
                            </switch>
                        </div>
                    </section>
                </main>
            </div>
        );
    }
}
