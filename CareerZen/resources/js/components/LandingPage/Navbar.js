import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
    // NavbarText
} from "reactstrap";
import UseAuth from "../Store/UseAuth";

const NavBar = props => {
    const { state } = UseAuth();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    padding: 20,
                    fontSize: 20,
                    backgroundColor: "#fff",
                    zIndex: 1000
                }}
            >
                {JSON.stringify(state)}
            </div>

            <>
                <Navbar color="dark" dark fixed="top" expand="md">
                    <NavbarBrand href="/">Career Zen</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink
                                    to="/#about"
                                    tag={HashLink}
                                    smooth={true}
                                >
                                    About
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink
                                    to="/#login"
                                    tag={HashLink}
                                    smooth={true}
                                >
                                    Login
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    to="/#desc"
                                    tag={HashLink}
                                    smooth={true}
                                >
                                    Features and Description
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink
                                    to="/signup"
                                    tag={HashLink}
                                    smooth={true}
                                >
                                    Sign up
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </>
        </div>
    );
};

export default NavBar;
