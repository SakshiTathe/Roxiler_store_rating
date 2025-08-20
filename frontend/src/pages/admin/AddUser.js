import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

const AddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState(undefined);
    const navigate = useNavigate();

    const options = [
        "admin",
        "store_owner",
        "normal_user",
    ];
    const onOptionChangeHandler = (event) => {
        setRole(event.target.value);
        console.log(
            "User Selected Value - ",
            event.target.value
        );
    };
    const handleCancel = () => {
        navigate("/AdminRoute/admin");
    };
    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/user/users", {
                name,
                email,
                password,
                address,
                role,
            });
            console.log(res);
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/AdminRoute/admin")
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) toast.error(error.response.data.message);
            else toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <Layout title="Add user">
            <div className="d-flex justify-content-center">
                <div className="form-container p-4 border rounded shadow" style={{ maxWidth: "600px", width: "100%" }}>
                    <div className="form-container ">
                        <form onSubmit={handleSubmit}>
                            <h4 className="title">REGISTER FORM</h4>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control p-3"
                                    id="exname"
                                    placeholder="Enter Your Name"
                                    required
                                    autoFocus
                                />
                            </div>
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
                                    id="exPassword1"
                                    placeholder="Enter Your Password"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="form-control p-3"
                                    id="exaddress"
                                    placeholder="Enter Your Address"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exrole">Choose an option:</label>
                                <select onChange={onOptionChangeHandler}
                                    id="exrole" value={role || ""} required>
                                    <option value="" disabled>
                                        Select role
                                    </option>
                                    {options.map((option, index) => {
                                        return (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        );
                                    })}
                                </select>
                                <h3>You selected: {role} </h3>
                            </div>
                            <div className="row ">
                                <button type="submit" className="btn btn-primary col mx-5">
                                    ADD
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

export default AddUser;