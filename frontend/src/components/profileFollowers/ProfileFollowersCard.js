import React, { useEffect, useState } from "react";
import './profilefollowerscard.css'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileFollowersCard = () => {
    const token = useSelector(state=>state.user.token)
    const [userObj, setUserObj] = useState([]);
    const [tags, setTags] = useState([])

    const method = "GET"
    const headers = new Headers({
        "Authorization": `Bearer ${token}`,
        'content-type': 'application/json'
    })

    const config = {
        method: method,
        headers: headers
    }


    useEffect((state) => {
        fetch("https://motion.propulsion-home.ch/backend/api/users/me/", config)
            .then(response => response.json())
            .then((data) => { setUserObj(data); setTags(data.things_user_likes) })
            .catch()
    }, [])

    return (
        <div className="PFEcontainer">
            <div className="PFEcover">
                <img src={require('../../assets/images/other/coverimg.jpg')} />
            </div>
            <div className="PFEprofilecard"> {/*start of the profilecard component*/}
                <div className="PFEprofileCardLeft"> {/*left side of profilecard, inculding profile pic, name, location and edit button */}
                    <img src={userObj.avatar} />
                    <div className="PFEname">{userObj.first_name} {userObj.last_name}</div>
                    <div className="PFElocation">{userObj.location}</div>
                    <button className="PFEfollow">FOLLOW</button>
                    <button className="PFEadd">ADD FRIEND</button>
                </div>
                <div className="PFEprofileCardRight"> {/*right side of profilecard including about section, interests, contact infos*/}
                    <div className="PFEabout">
                        <div className="PFEdescription">
                            <div className="PFEdescriptonbox">
                                <h1>About</h1>
                                <p>{userObj.about_me}</p>
                            </div>
                        </div>
                        <div className="PFEinterests">
                            <h1>Things I Like</h1>
                            <div className="asd">
                                {tags.map((element) => <p key={element}>{element}</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="PFEnavigation"> {/*section to navigate between posts, likes, friends, etc... */}
                        <Link to="/profile/posts">
                            <p>{userObj.amount_of_posts}</p>
                            <h1>Posts</h1>
                        </Link>
                        <Link to="/profile/likes">
                            <p>{userObj.amount_of_likes}</p>
                            <h1>Likes</h1>
                        </Link>
                        <Link to="/profile/friends">
                            <p>{userObj.amount_of_friends}</p>
                            <h1>Friends</h1>
                        </Link>
                        <div>
                            <p>{userObj.amount_of_followers}</p>
                            <h1>Followers</h1>
                        </div>
                        <Link to="/profile/following">
                            <p>{userObj.amount_following}</p>
                            <h1>Following</h1>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProfileFollowersCard;