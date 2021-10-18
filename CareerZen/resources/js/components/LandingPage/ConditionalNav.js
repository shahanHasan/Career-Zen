import React, { useContext } from "react";
import Navbar from "./Navbar";
import AuthNav from "../ContentPages/AuthNav";
import Context from "../Store/Context";

const ConditionalNav = () => {
    const { state } = useContext(Context);
    console.log(state);
    return <React.Fragment>{state ? <AuthNav /> : <Navbar />}</React.Fragment>;
};

export default ConditionalNav;
