import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

export default function OwnerRouteAuth() {
    const location=useLocation();
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(true);
    const [auth, setAuth,loadingAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            console.log("go here0");
            try {
                const res = await axios.get("/api/v1/auth/owner-auth", {
                    headers: { Authorization: `Bearer ${auth?.token}` }
                });
                setOk(res.data.ok);
            } catch (error) {
                setOk(false);
            } finally {
                setLoading(false);
            }
        };
        if (auth?.token){
            authCheck();
        }
        else if (!loadingAuth) {
            localStorage.setItem("redirectPath", location.pathname);
            
            setLoading(false);
            }
    }, [auth?.token,loadingAuth,location.pathname]);
    if (loadingAuth || loading){
        return <div>Loading...</div>;
    } 
    return ok ? <Outlet/> : <Navigate to="/login" />;
}
