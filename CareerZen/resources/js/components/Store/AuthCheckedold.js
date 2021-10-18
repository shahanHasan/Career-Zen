import React, { Component } from "react";
import useGlobalState from "./useGlobalState";

const AuthChecker = ComposedComponent =>
    class AuthChecker extends Component {
        constructor(props) {
            super(props);
            this.state = {
                token: "",
                isLoggedIn: false
            };
        }
        componentDidMount() {
            const auth = useGlobalState();
            if (token) {
                console.log("token received!");
                this.setState({
                    isLoggedIn: true,
                    token: token
                });
            }
        }

        render() {
            return <ComposedComponent {...this.props} {...this.state} />;
        }
    };
