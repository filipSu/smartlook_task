import * as React from "react";
import { Switch, Route, Link } from 'react-router-dom';
import PostsList from "./PostsList";
import PostDetail from "./PostDetail";

require("!style-loader!css-loader!sass-loader!../scss/App.scss");

export interface IAppState {
}
export interface IAppProps {
}

export default class App extends React.Component<IAppProps, IAppState> {
    render() {
        return (
            <div className="app container">
                <main className="row content-wrapper">
                    <section className="col-xs-12 center row middle-xs">
                        <div className="col-xs-10 center content">
                            <switch>
                                <Route exact path="/" component={PostsList} />
                                <Route path="/post/:id" component={PostDetail} />
                            </switch>
                        </div>
                    </section>
                </main>
            </div>
        );
    }
}
