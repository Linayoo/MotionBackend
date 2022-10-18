import React, { useEffect, useState } from "react";
import './profilefriendcard.css'
import { Link } from "react-router-dom";
import FriendCard from "../friendsCards/FriendCard";

const ProfileFriendCard = () => {

    let localToken = JSON.parse(localStorage.getItem("motion-auth")) //retrieving token from localstorage

    const [friends, setFriends] = useState([])
    const [userObj, setUserObj] = useState([]);
    const [tags, setTags] = useState([])

    const method = "GET"
    const headers = new Headers({
        "Authorization": `Bearer ${localToken.token}`,
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

    useEffect((state) => {
        fetch("https://motion.propulsion-home.ch/backend/api/social/friends/", config)
            .then(response => response.json())
            .then((data) => { setFriends(data.results); console.log(data) })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className="PFcontainer">
            <div className="PFcover">
                <img src={require('../../assets/images/other/coverimg.jpg')} />
            </div>
            <div className="PFprofilecard"> {/*start of the profilecard component*/}
                <div className="PFprofileCardLeft"> {/*left side of profilecard, inculding profile pic, name, location and edit button */}
                    <img src={userObj.avatar} />
                    <div className="PFname">{userObj.first_name} {userObj.last_name}</div>
                    <div className="PFlocation">{userObj.location}</div>
                    <button className="PFfollow">FOLLOW</button>
                    <button className="PFadd">ADD FRIEND</button>
                </div>
                <div className="PFprofileCardRight"> {/*right side of profilecard including about section, interests, contact infos*/}
                    <div className="PFabout">
                        <div className="PFdescription">
                            <div className="PFdescriptonbox">
                                <h1>About</h1>
                                <p>{userObj.about_me}</p>
                            </div>
                        </div>
                        <div className="PFinterests">
                            <h1>Things I Like</h1>
                            <div className="asd">
                                {tags.map((element) => <p key={element}>{element}</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="PFnavigation"> {/*section to navigate between posts, likes, friends, etc... */}
                        <Link to="/profile/posts">
                            <p>{userObj.amount_of_posts}</p>
                            <h1>Posts</h1>
                        </Link>
                        <Link to="/profile/likes">
                            <p>{userObj.amount_of_likes}</p>
                            <h1>Likes</h1>
                        </Link>
                        <div>
                            <p>{userObj.amount_of_friends}</p>
                            <h1>Friends</h1>
                        </div>
                        <Link to="/profile/followers">
                            <p>{userObj.amount_of_followers}</p>
                            <h1>Followers</h1>
                        </Link>
                        <Link to="/profile/following">
                            <p>{userObj.amount_following}</p>
                            <h1>Following</h1>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="PFcontent">
                {friends.map(friend => <FriendCard key={friend.username} friend={friend} />)}  
            </div>
        </div>
    )
}

export default ProfileFriendCard;