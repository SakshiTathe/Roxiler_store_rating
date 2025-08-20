
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { RatingStars } from './RatingStars';

export const StoreCard = ({ shops, userId }) => {

    const [search, setSearch] = useState("");
    const [shop, setShop] = useState([])
    const [storeid, setStrId] = useState()
    const [userid, setUserId] = useState()
    const [newrate, setRate] = useState()
    const [auth, setAuth,] = useAuth();
    useEffect(() => {
        if (shops && shops.length > 0) {
            setShop(shops);
        }
    }, [shops]);

    const handleRating = async (storeId, userId) => {
        try {
            console.log("handle submit", storeId, userId, newrate)
            const res = await axios.post("/api/v1/rate/newrate",
                { storeid: storeId, userid: userId, rate: newrate });

            console.log("print", res.data.data)
            if (res && res.data.success) {
                setShop((prev) =>
                    prev.map((s) =>
                        s.store_id === storeId
                            ? { ...s, my_rating: newrate, overall_rating: res.data.newOverall || s.overall_rating } // set my_rating immediately
                            : s
                    )
                );

            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
    const handleUPRating = async (storeId, userId) => {
        try {
            console.log("come here")
            const res = await axios.put("/api/v1/rate/updaterate", { storeid: storeId, userid: userId, newrate: newrate },
            );
            console.log("print", res.data.data)
            if (res && res.data.success) {
                setShop((prev) =>
                    prev.map((s) =>
                        s.store_id === storeId
                            ? { ...s, my_rating: newrate, overall_rating: res.data.newOverall || s.overall_rating }
                            : s
                    )
                );
                toast.success("Rating updated")
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
    return (
        <>
            <div className='container mt-4'>
                <div className='row'>
                    <nav className="navbar navbar-light bg-light">
                        <div className="container-fluid">
                            <form className="d-flex">
                                <input className="form-control me-2"
                                    type="search" placeholder="Search by store name or address"
                                    value={search} aria-label="Search"
                                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </nav>
                    <h1>These are shops</h1>
                    {shop.filter((s) =>
                        search === "" ||
                        s.store_name.toLowerCase().includes(search) ||
                        s.address.toLowerCase().includes(search)
                    ).map((keys) => (
                        <div className="col-md-4 col-sm-6 mb-4" key={keys.store_id}>
                            <div className="card shadow-sm" style={{ width: 400 }}>
                                <div className="card-body">
                                    <h4 className="card-title">{keys.store_name}</h4>
                                    <ul className="list-group list-group-flush mb-3">
                                        <li className="list-group-item"><strong>{keys.address}</strong> 123 Main Street, Pune</li>
                                        <li className="list-group-item">
                                            <strong>Overall Rating:</strong>{keys.overall_rating ?? "0"} ⭐⭐⭐⭐☆
                                        </li>
                                        <li className="list-group-item">
                                            <strong>My Rating:</strong>{keys.my_rating ?? "Not rated"} ⭐⭐⭐☆☆
                                            <RatingStars initialRate={keys.my_rating || 0}
                                                onRate={(value) => {
                                                    setRate(value);
                                                    setStrId(keys.store_id);
                                                    setUserId(auth.user.id);
                                                }}
                                            />
                                        </li>
                                    </ul>
                                    <p>{keys.my_rating}</p>
                                    {keys.my_rating ? (
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => handleUPRating(keys.store_id, auth.user.id)}>
                                            Update Rating ({keys.my_rating})
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleRating(keys.store_id, auth.user.id)}>
                                            Add Rating
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}




