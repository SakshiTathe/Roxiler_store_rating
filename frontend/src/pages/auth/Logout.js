import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Logout = () => {
    const [auth, setAuth,] = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        setAuth({ user: null, token: "" });
        localStorage.clear();
        toast.success("Logout Successfully");
        navigate("/login");
    }, [setAuth, navigate]);

    return null;
};

export default Logout;
