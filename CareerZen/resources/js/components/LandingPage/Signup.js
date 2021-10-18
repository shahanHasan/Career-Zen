import React, { useState } from "react";
import { Element } from "react-scroll";
import {
    Container,
    Row,
    Col,
    Spinner,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import { HashLink } from "react-router-hash-link";

const Signup = props => {
    // Modal on successful registration
    const { className } = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [isLoading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const [newUser, setNewUser] = useState({
        // firstName: "",
        name: "",
        email: "",
        password: ""
    });

    const HandleFormSubmit = e => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = newUser;
            console.log(data);

            axios.post("register", newUser).then(response => {
                setLoading(false);
                if (response.data.status === 200) {
                    console.log(response);
                    // localStorage.setItem("token", response.data.token);
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.user)
                    );
                    // console.log(response.data.user.id);
                    setMsg(response.data.message);

                    setNewUser({
                        name: "",
                        email: "",
                        password: ""
                    });
                    toggle();
                    setTimeout(() => {
                        setMsg("");
                    }, 2000);
                }

                if (response.data.status === "failed") {
                    setMsg(response.data.errors);
                    console.log(msg);

                    setTimeout(() => {
                        setMsg("");
                    }, 2000);
                }
            });
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    // // Check if login/Register token is there
    // const token = localStorage.getItem("token");
    // // if no token back to landing page
    // if (token) {
    //     return <Redirect to="/dashboard" />;
    // } else {return something}
    return (
        <React.Fragment>
            <Container className="themed-container" fluid="md">
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Element id="signup" className="signup">
                            <form>
                                <h3>Sign Up</h3>

                                <div className="form-group">
                                    <label>Name </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter Name"
                                        value={newUser.name}
                                        onChange={e => {
                                            setNewUser({
                                                ...newUser,
                                                [e.target.name]: e.target.value
                                            });
                                        }}
                                    />
                                    {msg.name && (
                                        <span className="text-danger">
                                            {msg.name}
                                        </span>
                                    )}
                                </div>
                                {/* <p className="text-danger">{msg.name}</p> */}

                                {/* <div className="form-group">
                                    <label>Last name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        placeholder="Last name"
                                        value={newUser.lastName}
                                        onChange={e => {
                                            setNewUser({
                                                ...newUser,
                                                [e.target.name]: e.target.value
                                            });
                                        }}
                                    />
                                </div> */}

                                <div className="form-group">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        value={newUser.email}
                                        onChange={e => {
                                            setNewUser({
                                                ...newUser,
                                                [e.target.name]: e.target.value
                                            });
                                        }}
                                    />
                                    {msg.email && (
                                        <span className="text-danger text-center">
                                            {msg.email}
                                        </span>
                                    )}
                                </div>
                                {/* <p className="text-danger">{msg.email}</p> */}

                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        value={newUser.password}
                                        onChange={e => {
                                            setNewUser({
                                                ...newUser,
                                                [e.target.name]: e.target.value
                                            });
                                        }}
                                    />
                                    {msg.password && (
                                        <span className="text-danger">
                                            {msg.password}
                                        </span>
                                    )}
                                </div>
                                {/* <p className="text-danger">{msg}</p> */}

                                {/* <p className="text-danger">{msg.password}</p> */}

                                {/* <Spinner color="primary" /> */}
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
                                        "Sign Up"
                                    )}
                                </button>
                                <Modal
                                    isOpen={modal}
                                    toggle={toggle}
                                    className={className}
                                >
                                    <ModalHeader toggle={toggle}>
                                        Registration
                                    </ModalHeader>
                                    <ModalBody>
                                        Registration Successful. Please log in.
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            color="secondary"
                                            onClick={toggle}
                                        >
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </Modal>
                                <p className="forgot-password text-center">
                                    Already registered{" "}
                                    <HashLink to="/#login" smooth={true}>
                                        Login ?
                                    </HashLink>
                                </p>
                            </form>
                        </Element>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default Signup;
