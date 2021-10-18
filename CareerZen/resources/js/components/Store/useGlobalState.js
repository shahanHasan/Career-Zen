import { useState, useEffect } from "react";

const useGlobalState = () => {
    const [state, setstate] = useState({
        id: null,
        token: ""
    });

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const token = localStorage.getItem("token");
                if (typeof window !== undefined) {
                    const config = {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    };
                    const response = await axios.get("user", config);
                    setstate({
                        id: response.data.id,
                        token: token
                    });
                    console.log(state.id);
                    setLoading(false);
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // useEffect(() => {
    //     setstate({
    //         isLoggedIn: false,
    //         token: ""
    //     });
    // }, []);

    const actions = action => {
        const { type, payload } = action;
        switch (type) {
            case "login":
                return setstate(payload);
            case "logout":
                return setstate(payload);
            default:
                return state;
        }
    };

    return { state, actions, isLoading };
};

export default useGlobalState;
