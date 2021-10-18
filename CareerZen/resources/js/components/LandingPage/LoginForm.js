import React, { useState, useEffect } from "react";
import { Element } from "react-scroll";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Row, Col, Spinner } from "reactstrap";
import axios from "axios";
import "../../../css/login.css";
// import auth from "../Auth/Auth";
// import Context from "../Store/Context";
import UseAuth from "../Store/UseAuth";

const LoginForm = () => {
    // Context for global store
    const { state, actions } = UseAuth();

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    let history = useHistory();
    let location = useLocation();
    // let auth = useAuth();
    let { from } = location.state || { from: { pathname: "/dashboard" } };

    // state with functional component.
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [msg, setMsg] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isRedirect, setRedirect] = useState(false);

    const [errorMessage, setErrorMessage] = useState({
        errMsgEmail: "",
        errMsgPwd: "",
        errMsg: ""
    });

    const [isChecked, setChecked] = useState(false);

    const handleCheckBox = e => {
        // e.preventDefault(); Not in case of checkbox
        e.persist();
        setChecked(e.target.checked);
        console.log(isChecked);
    };

    const HandleFormSubmit = async e => {
        e.preventDefault();
        console.log(state);
        setIsLoading(true);

        try {
            const response = await axios.post("login", user, {
                cancelToken: source.token
            });

            setIsLoading(false);
            if (
                response.data.status === 200 &&
                response.data.success === true
            ) {
                console.log(response);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                // console.log(response.data.user.id);
                actions({
                    type: "login",
                    payload: {
                        id: response.data.user.id
                    }
                });
                console.log(state);
                setUser({
                    email: "",
                    password: ""
                });

                setMsg(response.data.message);
                setTimeout(() => {
                    setMsg("");
                }, 2000);

                setRedirect(true);
            }
            if (
                response.data.status === "failed" &&
                response.data.success === undefined
            ) {
                setIsLoading(false);
                setErrorMessage({
                    errMsgEmail: response.data.validation_error.email,
                    errMsgPwd: response.data.validation_error.password
                });

                console.log(errorMessage);
                setTimeout(() => {
                    setErrorMessage({
                        errMsgEmail: "",
                        errMsgPwd: ""
                    });
                }, 2000);
            }

            if (
                response.data.status === "failed" &&
                response.data.success === false
            ) {
                setIsLoading(false);
                setErrorMessage({
                    errMsg: response.data.message
                });

                setTimeout(() => {
                    setErrorMessage({
                        errMsg: ""
                    });
                }, 2000);
            }
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isRedirect) {
            history.replace(from);
        }
        return () => {
            source.cancel("Operation canceled by the user.");
        };
    }, [isRedirect]);

    return (
        <React.Fragment>
            <Container className="themed-container" fluid="md">
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Element id="login" className="login-form">
                            <form>
                                <h3>Sign In</h3>

                                <div className="form-group">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        value={user.email}
                                        onChange={e => {
                                            setUser({
                                                ...user,
                                                email: e.target.value
                                            });
                                        }}
                                    />
                                    {msg && (
                                        <span className="text-danger">
                                            {msg}
                                        </span>
                                    )}
                                    {errorMessage.errMsgEmail && (
                                        <span className="text-danger">
                                            {errorMessage.errMsgEmail}
                                        </span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        value={user.password}
                                        onChange={e => {
                                            setUser({
                                                ...user,
                                                [e.target.name]: e.target.value
                                            });
                                        }}
                                    />
                                    {errorMessage.errMsgPwd && (
                                        <span className="text-danger">
                                            {errorMessage.errMsgPwd}
                                        </span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            name="isChecked"
                                            className="custom-control-input"
                                            id="customCheck1"
                                            checked={isChecked}
                                            onChange={e => handleCheckBox(e)}
                                        />
                                        <label
                                            className="custom-control-label"
                                            // onClick={e => handleChange(e)}
                                            htmlFor="customCheck1"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>

                                {errorMessage.errMsg && (
                                    <span className="text-danger">
                                        {errorMessage.errMsg}
                                    </span>
                                )}
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    onClick={e => {
                                        HandleFormSubmit(e);
                                    }}
                                >
                                    {isLoading ? (
                                        <Spinner color="secondary" />
                                    ) : (
                                        "Sign in"
                                    )}
                                </button>
                                <p className="forgot-password text-center">
                                    Forgot <a href="#">password?</a>
                                </p>
                            </form>
                        </Element>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default LoginForm;
