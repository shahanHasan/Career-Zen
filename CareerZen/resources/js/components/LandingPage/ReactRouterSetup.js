import React from "react";
// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Redirect } from "react-router";
// These are all components.
// Router -> Routes to different page
// Route -> Every single routes
// Switch -> The first route that matchs

// pages
import LandingPage from "./LandingPg";
// navbar
// import Navbar from "./Navbar";
// import AuthNav from "../ContentPages/AuthNav";
// import ConditionalNav from "./ConditionalNav";
import Navtoggle from "./Navtoggle";

import Signup from "./Signup";
import Error from "./Error";
// Auth Pages
import Dashboard from "../ContentPages/Dashboard";
import Wikipedia from "../ContentPages/Wikipedia";
import GoogleBooks from "../ContentPages/GoogleBooks";
import TaskManager from "../ContentPages/TaskManager";
import Game from "../ContentPages/Game";
import Youtube from "../ContentPages/Youtube";

// Auth Imports
import ProtectedRoute from "../Auth/ProtectedRoute";
import AuthChecker from "../Store/AuthChecker";
// import Context from "../Store/Context";

const ReactRouterSetup = () => {
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    // });
    // const token = localStorage.getItem("token");
    return (
        <React.Fragment>
            <AuthChecker>
                <Router>
                    {/* {token ? <AuthNav /> : <Navbar />} */}
                    {/* <ConditionalNav /> */}
                    <Navtoggle />
                    <Switch>
                        <Route exact path="/">
                            <LandingPage />
                        </Route>
                        <Route exact path="/signup">
                            <Signup />
                        </Route>

                        {/* <AuthChecker.Provider value={store}> */}
                        <ProtectedRoute exact path="/dashboard">
                            <Dashboard />
                        </ProtectedRoute>

                        <ProtectedRoute exact path="/tasks">
                            <TaskManager />
                        </ProtectedRoute>

                        <ProtectedRoute exact path="/wikipedia">
                            <Wikipedia />
                        </ProtectedRoute>

                        <ProtectedRoute exact path="/books">
                            <GoogleBooks />
                        </ProtectedRoute>

                        <ProtectedRoute exact path="/youtube">
                            <Youtube />
                        </ProtectedRoute>

                        <ProtectedRoute exact path="/game">
                            <Game />
                        </ProtectedRoute>

                        {/* </AuthChecker.provider> */}
                        <Route exact path="*">
                            <Error />
                        </Route>
                    </Switch>
                </Router>
            </AuthChecker>
        </React.Fragment>
    );
};

export default ReactRouterSetup;
