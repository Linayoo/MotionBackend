//author Levi, last revision: Sep-22, 16:00

import React from "react";
import NavBar from "../../components/navBar/NavBar";
import ProfileLikesCard from "../../components/profileLikes/ProfileLikesCard";

const ProfileLikes = () => {

    return (
        <div className="background">
            <NavBar/>
            <ProfileLikesCard />    
        </div>
    )

}

export default ProfileLikes;