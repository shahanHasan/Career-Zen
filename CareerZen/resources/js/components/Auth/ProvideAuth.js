import React, { useContext, createContext, useState } from "react";
import auth from "auth"

const authContext = createContext();

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
    return useContext(authContext);
}

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = cb => {
        return auth.signin(() => {
            setUser("user");
            cb();
        });
    };

    const signout = cb => {
        return auth.signout(() => {
            setUser(null);
            cb();
        });
    };

    return {
        user,
        signin,
        signout
    };
}
