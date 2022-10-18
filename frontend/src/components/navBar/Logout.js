//author Levi, last revision: Oct-1, 17:30

import React from "react";
import './logout.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUniqueID } from "../../redux/idSlice/idSlice";

const Logout = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const setIDtoMe = () => {           //set ID in store to self, in order to return to own profile page
        dispatch(setUniqueID('me'))
    }
    const setIDtoEmpty = () => {        //set ID to undefined, before logging out
        dispatch(setUniqueID(undefined))
    }
    const cleanStorage = () => {        //delete token from localstorage, in order to effectively log out
        localStorage.removeItem("motion-auth")
    }

    return (
        <div className="logoutcontainer">
            <button className="profile" onClick={() => 
                {setIDtoMe(); props.passRendering(); navigate('../profile/')}}>Profile</button>
            <button className="logout" onClick={() => 
                {setIDtoEmpty(); cleanStorage(); props.passRendering(); navigate('../access/')}}>Logout</button>
        </div>
    )
}

export default Logout;