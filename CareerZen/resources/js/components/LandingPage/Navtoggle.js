import React, { useEffect } from "react";
import Navbar from "./Navbar";
import AuthNav from "../ContentPages/AuthNav";
import UseAuth from "../Store/UseAuth";

const Navtoggle = () => {
    const { state } = UseAuth();
    useEffect(() => {
        console.log(state.id);
    }, [state]);
    return state.id ? <AuthNav /> : <Navbar />;
};

export default Navtoggle;
