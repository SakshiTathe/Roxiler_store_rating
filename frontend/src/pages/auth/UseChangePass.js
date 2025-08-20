import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const PassChanges = ({ redirectPath }) => {
    const [email, setEmail] = useState("");
    const [newPassword, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(redirectPath);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(email, newPassword)
            const res = await axios.put("/api/v1/auth/update-password", {
                email,
                newPassword,
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate(redirectPath);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    return (
        <Layout title="Password change">
            <div className="d-flex justify-content-center">
                <div className="form-container p-4 border rounded shadow" style={{ maxWidth: "600px", width: "100%" }}>
                    <div className="form-container ">
                        <form onSubmit={handleSubmit}>
                            <h4 className="title">PASSWORD CHANGE</h4>
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
                                    value={newPassword}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control p-3"
                                    id="expassword"
                                    placeholder="Enter Your Password"
                                    required
                                />
                            </div>
                            <div className="row ">
                                <button type="submit" className="btn btn-primary col mx-4">
                                    Change password
                                </button>
                                <button onClick={handleCancel} type="button" className="btn btn-primary col mx-4">
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

export default PassChanges;