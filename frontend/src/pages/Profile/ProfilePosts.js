//author Levi, last revision: Sep-22, 16:00

import React from "react";
import NavBar from "../../components/navBar/NavBar";
import ProfilePostsCard from "../../components/profilePosts/ProfilePostsCard";

const ProfilePosts = () => {

    return (
        <div className="background">
            <NavBar/>
            <ProfilePostsCard />    
        </div>
    )

}

export default ProfilePosts;