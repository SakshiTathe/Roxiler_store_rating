import React, { useEffect } from 'react'
import Layout from "../components/Layout"
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const Home = () => {
    const [auth, setAuth, loading] = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (auth?.user?.role) {
            switch (auth.user.role) {
                case 'admin':
                    navigate("/AdminRoute/admin");
                    break;
                case 'store_owner':
                    navigate("/OwnerRoute/owner");
                    break;
                case 'normal_user':
                    navigate("/UserRoute/user");
                    break;
                default:
                    console.warn("Unknown role:", auth.user.role);
            }
        }
    })

    return (
        <Layout>
            {!auth?.user ? (
                <div>
                    <p className='d-flex justify-content-center align-items-center'>Register button only for normal users</p>
                    <div className="d-flex justify-content-center align-items-center mt-5">
                        <div className="d-flex gap-3 flex-wrap">

                            <NavLink to="/register" className="btn btn-primary btn-lg">
                                Register
                            </NavLink>

                            <NavLink to="/login" className="btn btn-outline-primary btn-lg">
                                Login
                            </NavLink>
                        </div>
                    </div>
                </div>

            ) : null
            }
        </Layout>
    )
}

export default Home;