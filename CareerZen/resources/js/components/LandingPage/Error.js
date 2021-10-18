import React from "react";
import "../../../css/Error.css";
import { Container } from "reactstrap";
import { HashLink } from "react-router-hash-link";

const Error = () => {
    return (
        <React.Fragment>
            <Container className="themed-container" fluid="md">
                <section className="Error-404 ">
                    <div className="text-center" id="bg-404">
                        <h1>404</h1>
                    </div>
                    <div className="Error-second">
                        <h3>Look like you're lost</h3>
                        <p>the page you are looking for is not available!</p>
                    </div>
                    <div className="ButtonType">
                        <HashLink to="/" className="Button">
                            Home
                        </HashLink>
                    </div>
                </section>
            </Container>
        </React.Fragment>
    );
};

export default Error;
