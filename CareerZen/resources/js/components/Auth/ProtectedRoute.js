import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Spinner } from "reactstrap";
// import { Redirect } from "react-router";
import UseAuth from "../Store/UseAuth";

const ProtectedRoute = ({ children, ...rest }) => {
    const { state, isLoading } = UseAuth();
    // const history = useHistory();
    return isLoading ? (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}
        >
            <Spinner style={{ width: "5rem", height: "5rem" }} type="grow" />
        </div>
    ) : (
        <Route
            {...rest}
            render={props => {
                return state.id ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }}
                    />
                );
            }}
        />
    );
};

export default ProtectedRoute;
