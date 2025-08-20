import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Navbars } from '../../components/Navbar';
import { StoreCard } from '../../components/StoreCard';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export const User_Dashboard = () => {

    const [stores, setStores] = useState([])
    const [userID, setUserID] = useState([])
    const [auth, setAuth,] = useAuth();
    const nav = [
        { link: "/UserRoute/update-pass", text: "Update Password" },
        { link: "/logout", text: "Logout" },
    ];
    useEffect(() => {
        const fetchOwners = async () => {
            try {

                if (!auth?.user?.id) return;
                console.log(auth.user.id)
                const res = await axios.get("/api/v1/rate/store-list/rate", { params: { userID: auth.user.id } });
                /*  const res = await axios.get(`/api/v1/rate/store-list/rate/${userID }`); */
                console.log("print", res.data.data)
                if (res && res.data.success) {
                    setStores(res.data.data);
                    toast.success(res.data && res.data.message);
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
    }, [auth?.user?.id])
    /* useEffect(() => {
        console.log("Stores updated", stores);
    }, [stores]); */
    return (
        <div>
            <Header />
            <h2 className='d-flex justify-content-center'> This is User dashboard</h2>
            <Navbars points={nav} />
            <StoreCard shops={stores} userId={auth?.user?.id} />
        </div>
    )
}
