//author Levi, last revision: Sep-22, 16:00

import React from "react";
import NavBar from "../../components/navBar/NavBar";
import ProfileFollowersCard from "../../components/profileFollowers/ProfileFollowersCard";

const ProfileFollowers = () => {

    return (
        <div className="background">
            <NavBar/>
            <ProfileFollowersCard />    
        </div>
    )

}

export default ProfileFollowers;