import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Navbars } from '../../components/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Table } from '../../components/Table';
import { useAuth } from '../../context/AuthContext';

export const Owner_Dashboard = () => {
    const [auth, setAuth,] = useAuth();
    const [storeData, setStoreData] = useState({});
    const nav = [
        { link: "/OwnerRoute/update-pass", text: "Update Password" },
        { link: "/logout", text: "Logout" },
    ];
    const [stores, setStores] = useState(() => {
        const savedStores = sessionStorage.getItem("stores");
        return savedStores ? JSON.parse(savedStores) : [];
    });
    useEffect(() => {
    const fetchStoresAndDetails = async () => {
        try {
            if (!auth?.user?.id) return;

            // 1. Fetch stores
            const resStores = await axios.get("/api/v1/store/store-list", { params: { storeOwnerId: auth.user.id } });
            if (!(resStores && resStores.data.success)) {
                toast.error(resStores.data.message);
                return;
            }
            const stores = resStores.data.data;
            setStores(stores);
            sessionStorage.setItem("stores", JSON.stringify(stores));

            // 2. Fetch details for each store
            const tempStoreData = {};
            for (const store of stores) {
                const resDetails = await axios.get("/api/v1/store/store-rate", { params: { storeID: store.store_id } });
                if (resDetails && resDetails.data.success) {
                    tempStoreData[store.store_id] = resDetails.data.data;
                } else {
                    tempStoreData[store.store_id] = []; // empty if no data
                }
            }

            setStoreData(tempStoreData); // update state with all store details
            sessionStorage.setItem("storeData", JSON.stringify(tempStoreData));

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    fetchStoresAndDetails();
}, []);
    return (
        <div>
            <Header />
            <h2 className='d-flex justify-content-center'> This is Owner dashboard
                {/**
            average rating
            list of store,  user with rating
            logout passs update*/}</h2>
            <Navbars points={nav} />
            <div className="my-4">
                {stores.map(store => (
                    <div key={store.store_id} style={{ marginBottom: "2rem" }}>
                        <h3 className="mb-2 d-flex justify-content-center">{store.store_name} - {store.address}</h3>
                        <Table data={storeData[store.store_id] || []} />
                    </div>
                ))}
            </div>

        </div>
    )
}
