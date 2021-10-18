import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SideBarData } from "./SideBarData";
import "../../../css/AuthNav.css";
import { IconContext } from "react-icons";
import UseAuth from "../Store/UseAuth";

function AuthNav() {
    const { state, actions } = UseAuth();

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const onLogoutHandler = e => {
        e.preventDefault();
        console.log("auth state");
        console.log(state);
        actions({
            type: "logout",
            payload: {
                isLoggedIn: false,
                token: null
            }
        });

        localStorage.clear();
        // setNavigate(true);
    };
    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <div className="auth-navbar">
                    <Link to="#" className="auth-menu-bars">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>
                <nav
                    className={
                        sidebar ? "auth-nav-menu active" : "auth-nav-menu"
                    }
                >
                    <ul className="auth-nav-menu-items" onClick={showSidebar}>
                        <li className="auth-navbar-toggle">
                            <Link to="#" className="auth-menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SideBarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    {item.title === "Logout" ? (
                                        <Link onClick={onLogoutHandler} to="">
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    ) : (
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default AuthNav;
