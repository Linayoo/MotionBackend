//author Levi, last revision: Sep-22, 00:45

import React from "react";
import NavBar from "../../components/navBar/NavBar";
import ProfilePage from "../../components/profilePage/ProfilePage";

const Profile = () => {

    return (
        <div className="background">
            <NavBar/>
            <ProfilePage />       
        </div>
    )

}

export default Profile;