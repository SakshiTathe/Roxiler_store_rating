import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({user: null,token: "",});
    const [loadingAuth, setLoading] = useState(true);

    useEffect(() => {
        axios.defaults.headers.common["Authorization"] = auth?.token
            ? `Bearer ${auth.token}`
            : "";
    }, [auth?.token]);

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                user: parseData.user,
                token: parseData.token,
            });
        }
        setLoading(false);
    }, []);
    return (
        <AuthContext.Provider value={[auth, setAuth,loadingAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };