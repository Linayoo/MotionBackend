//author Levi, last revision: Sep-22, 00:45

import React from "react";
import NavBar from "../../components/navBar/NavBar";
import ProfileFriendCard from "../../components/profileFriends/profileFriendCard";

const ProfileFriends = () => {

    return (
        <div className="background">
            <NavBar/>
            <ProfileFriendCard />    
        </div>
    )

}

export default ProfileFriends;