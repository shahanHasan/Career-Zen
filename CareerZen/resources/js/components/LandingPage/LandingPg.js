import React from "react";
import About from "./About";
import LoginForm from "./LoginForm";
import FeatureDesc from "./FeatureDesc";

function LandingPg() {
    return (
        <div>
            <LoginForm />
            <About />

            <FeatureDesc />
        </div>
    );
}

export default LandingPg;
