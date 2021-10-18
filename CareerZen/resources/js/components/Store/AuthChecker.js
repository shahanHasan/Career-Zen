import React from "react";
import useGlobalState from "./useGlobalState";
import AuthContext from "./AuthContext";

const AuthChecker = ({ children }) => {
    const store = useGlobalState();
    
    return (
        <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
    );
};

export default AuthChecker;
