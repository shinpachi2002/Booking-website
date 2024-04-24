import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from "axios"
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';
const ProfilePage = () => {
    const { user, setUser, ready } = useContext(UserContext);
    const [redirect, setRedirect] = useState("");
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = "profile"
    }
    if (!ready) {
        return "loading..."
    }

    if (!user && ready && !redirect) {
        <Navigate to={"/login"}></Navigate>
    }

    async function logout() {
        try {
            await axios.post("/logout")
            setRedirect("/")
            setUser(null);
        } catch (error) {
            console.log(error)
        }
    }

  

    if (redirect) {
        return <Navigate to={redirect}></Navigate>
    }

    return (
        <div>
            <AccountNav></AccountNav>
            {
                subpage === "profile" && (
                    <div className='text-center mx-w-lg mx-auto'>Logged in as {user.name}
                        ({user.email})
                        <br></br>
                        <button onClick={logout} className='primary max-w-md mt-2 '>Logout</button>
                    </div>
                )
            }
        </div>
    )
}

export default ProfilePage
