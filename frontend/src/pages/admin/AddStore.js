import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

const AddStore = () => {
    const [store_name, setName] = useState("");
    const [store_address, setAddress] = useState("");
    const [owner_id, setId] = useState(undefined);

    const [owner, setOwners] = useState(() => {
        try {
            const savedOwners = sessionStorage.getItem("owners");
            return savedOwners ? JSON.parse(savedOwners) : [];
        } catch (e) {
            console.error("Error parsing owners from sessionStorage:", e);
            return [];
        }
    });

    const navigate = useNavigate();
    const handleOwner = (event) => {
        setId(event.target.value);
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
            const res = await axios.post("/api/v1/user/stores", {
                store_name,
                store_address,
                owner_id,
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
    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const res = await axios.get("/api/v1/user/getowners");
                if (res && res.data.success) {
                    sessionStorage.setItem("owners", JSON.stringify(res.data.data));
                    setOwners(res.data.data); // array of owners from API
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error(
                    error.response?.data?.message || "Something went wrong"
                );
            }
        };
        fetchOwners();
    }, [])

    return (
        <Layout title="Add store">
            <div className="d-flex justify-content-center">
                <div className="form-container p-4 border rounded shadow" style={{ maxWidth: "600px", width: "100%" }}>
                    <div className="form-container ">
                        <form onSubmit={handleSubmit}>
                            <h4 className="title">REGISTER FORM</h4>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={store_name}
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
                                    type="text"
                                    value={store_address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="form-control p-3"
                                    id="exaddress"
                                    placeholder="Enter Your Address"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exowner">Choose an store Owner:</label>
                                <select onChange={handleOwner}
                                    id="exowner" value={owner_id || ""} required>
                                    <option value="" disabled>
                                        Select Owner
                                    </option>
                                    {owner.map((o) => {
                                        return (
                                            <option key={o.user_id} value={o.user_id}>
                                                {o.name}
                                            </option>
                                        );
                                    })}
                                </select>
                                <h3>You selected: {owner_id} </h3>
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

export default AddStore;