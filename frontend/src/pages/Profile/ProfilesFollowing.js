//author Levi, last revision: Sep-22, 16:00

import React from "react";
import NavBar from "../../components/navBar/NavBar";
import ProfileFollowingsCard from "../../components/profileFollowings/ProfileFollowingsCard";

const ProfileFollowings = () => {

    return (
        <div className="background">
            <NavBar/>
            <ProfileFollowingsCard />    
        </div>
    )

}

export default ProfileFollowings;