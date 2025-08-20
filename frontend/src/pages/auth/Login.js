import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth, loading] = useAuth();

    const navigate = useNavigate();
    const savedPath = localStorage.getItem("redirectPath");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login", {
                email,
                password,
            });

            if (res && res.data.success) {
                const userData = res.data.data;   // your user object (id, name, role, etc.)
                const token = res.data.data.token;
                toast.success(res.data && res.data.message);
                setAuth({
                    user: userData,
                    token: token,
                    /* ...auth,
                    user: res.data.user,
                    token: res.data.token, */
                });
                const roleRoutes = {
                    admin: "/AdminRoute/admin",
                    store_owner: "/OwnerRoute/owner",
                    normal_user: "/UserRoute/user",
                };
                const role = res.data.data.role;
                localStorage.setItem("auth", JSON.stringify({
                    user: userData,
                    token: token,
                }));
                console.log(auth)
                navigate(savedPath || roleRoutes[userData.role] || "/");
                /* localStorage.removeItem("redirectPath"); */
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };
    const handleCancel = () => {
        navigate("/");
    };
    return (
        <Layout title="Login">
            <div className="d-flex justify-content-center">
                <div className="form-container p-4 border rounded shadow" style={{ maxWidth: "600px", width: "100%" }}>
                    <div className="form-container ">
                        <form onSubmit={handleSubmit}>
                            <h4 className="title">LOGIN FORM</h4>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control p-3"
                                    id="exEmail"
                                    placeholder="Enter Your Email "
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control p-3"
                                    id="expassword"
                                    placeholder="Enter Your Password"
                                    required
                                />
                            </div>
                            <div className="row ">
                                <button type="submit" className="btn btn-primary col mx-5">
                                    LOGIN
                                </button>
                                <button onClick={handleCancel} type="button" className="btn btn-primary col mx-5">
                                    CANCEL
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default Login;