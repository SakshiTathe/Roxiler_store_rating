import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { Admin_Dashboard } from './pages/admin/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Signup';
import { Owner_Dashboard } from './pages/owner/Dashboard';
import { User_Dashboard } from './pages/user/Profile';
import AdminRouteAuth from './routes/AdminRoutes';
import OwnerRouteAuth from './routes/OwnerRoutes';
import UserRouteAuth from './routes/UserRoutes';
import Logout from './pages/auth/Logout';
import AddUser from './pages/admin/AddUser';
import AddStore from './pages/admin/AddStore';
import PassChanges from './pages/auth/UseChangePass';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/*" element={<NotFound/>}/>

        <Route path="/AdminRoute" element={<AdminRouteAuth/>}>
          <Route path="admin" element={<Admin_Dashboard/>} />
          <Route path="add_user" element={<AddUser/>} />
          <Route path="add_store" element={<AddStore/>} />
        </Route>
        <Route path="/OwnerRoute" element={<OwnerRouteAuth/>}>
          <Route path="owner" element={<Owner_Dashboard/>} />
          <Route path="update-pass" element={<PassChanges redirectPath="/OwnerRoute/owner"/>} />
        </Route>
        <Route path="/UserRoute" element={<UserRouteAuth/>}>
          <Route path="user" element={<User_Dashboard/>} />
          <Route path="update-pass" element={<PassChanges redirectPath="/UserRoute/user"/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;