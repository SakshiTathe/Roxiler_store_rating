import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Navbars } from '../../components/Navbar'
import axios from 'axios'
import toast from "react-hot-toast";
import { Table } from '../../components/Table';

export const Admin_Dashboard = () => {
  const [info, setInfo] = useState({})
  const [users, setUsers] = useState([])
  const [admin, setAdmin] = useState([])
  const [storeuser, setStoreUser] = useState([])
  const [stores, setStores] = useState([])

  const Arrtags = ["Total Users", "Total Owners", "Total Admins", "Normal Users", "Total Stores", "Users Rated"]
  const goto = ["alluser", "owner", "admin", "normal", "store", "rate"]

  const titles = ["Normal Users", "Admins", "Store Owners name", "Stores Names"]
  const contents = [users, admin, storeuser, stores]
  const nav = [
    { link: "/AdminRoute/add_user", text: "Add user" },
    { link: "/AdminRoute/add_store", text: "Add store" },
    { link: "/logout", text: "Logout" },
  ];
  useEffect(() => {
    const fetchOwners = async () => {
      try {
        console.log("come here")
        const res = await axios.get("/api/v1/user/getstat");
        const res2 = await axios.get("/api/v1/user/dashboard/normal_users");
        const res3 = await axios.get("/api/v1/user/dashboard/admin_users");
        const res4 = await axios.get("/api/v1/user/dashboard/store_users");
        const res5 = await axios.get("/api/v1/user/dashboard/stores");
        if (res && res.data.success) {
          setInfo(res.data.data)
          setUsers(res2.data.data)
          setAdmin(res3.data.data)
          setStoreUser(res4.data.data)
          setStores(res5.data.data)
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
    <div>
      {/**
              list of store,user admin, owner, filter Name, Email, Address, and Role
              store ,user logout.*/}
      <Header />
      <h2 className='d-flex justify-content-center'>Admin is here</h2>
      <Navbars points={nav} />
      <div>
        <div className="d-flex flex-wrap justify-content-center gap-4 my-4">
          {Arrtags.map((keys, i) => (
            <div key={i} className="stat-box text-center p-1 rounded shadow-sm" style={{ minWidth: "180px", border: "solid 3px black" }}>
              <h5 className="mb-1">{keys}</h5>
              <p className="h4 mb-0">{info[goto[i]]}</p>
            </div>
          )
          )}
        </div>

        <h2 className='d-flex justify-content-center'>Tables</h2>
        {/*<p>{JSON.stringify(users)}</p>*/}
        {/* <ul>
          {users.map(user => (
            <li key={user.user_id}>
              {user.name} - {user.email} - {user.address}
            </li>
          ))}
        </ul> */}
        <div className="my-4">
          {titles.map((title, i) => (
            <div key={i} className="mb-4">
              <h5 className="mb-2 d-flex justify-content-center">{title}</h5>
              {contents[i] && contents[i].length > 0 ? (
                  <Table data={contents[i]} />
              ) : (
                  <p className="text-center text-muted">No records found</p>
              )}
            </div>
          ))}
        </div>

        {/* <h5>Users</h5>
        <Table data={users} />
        <h5>admins</h5>
        <Table data={admin} />
        <h5>Store</h5>
        <Table data={storeuser} />
        <h5>StoreShop</h5>
        <Table data={stores} /> */}
      </div>
    </div>
  )
}
