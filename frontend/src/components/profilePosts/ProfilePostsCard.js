//author Levi, last revision: Oct-1, 16:30

import React, { useEffect, useState } from "react";
import './profilepostscard.css'
import { Link, useParams, useNavigate } from "react-router-dom";
import PostCard from "../postCard/PostCard";
import { setUniqueID } from "../../redux/idSlice/idSlice";
import { useDispatch, useSelector } from "react-redux";

const ProfilePostsCard = () => {

    let localToken = JSON.parse(localStorage.getItem("motion-auth")) //retrieving token from localstorage
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [posts, setPosts] = useState([])
    const [userObj, setUserObj] = useState([])
    const [tags, setTags] = useState([])
    const [loggedIn, setLoggedIn] = useState()
    //const self = useSelector((state) => state.routeID.uniqueID)
    const initialID = useParams().userID

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
        if (initialID === undefined || initialID === 'me') {
            fetch("https://motion.propulsion-home.ch/backend/api/users/me/", config)
                .then(response => response.json())
                .then((data) => { setUserObj(data); setTags(data.things_user_likes) })
                .catch();
            fetch("https://motion.propulsion-home.ch/backend/api/social/posts/me/", config)
                .then(response => response.json())
                .then(data => { setPosts(data.results); setLoggedIn(data.results[0]['is_from_logged_in_user']) })
                .catch((error) => console.log(error))
        } else {
            fetch(`https://motion.propulsion-home.ch/backend/api/users/${initialID}/`, config)
                .then(response => response.json())
                .then((data) => { setUserObj(data); setTags(data.things_user_likes) })
                .catch();
            fetch(`https://motion.propulsion-home.ch/backend/api/social/posts/user/${initialID}/`, config)
                .then(response => response.json())
                .then(data => { setPosts(data.results); setLoggedIn(data.results[0]['is_from_logged_in_user']) })
                .catch((error) => console.log(error))
        }
    }, [initialID])

    return (
        <div className="PPCcontainer">
            <div className="PPCcover">
                <img src={require('../../assets/images/other/coverimg.jpg')} />
            </div>
            <div className="PPCprofilecard"> {/*start of the profilecard component*/}
                <div className="PPCprofileCardLeft"> {/*left side of profilecard, inculding profile pic, name, location and edit button */}
                    <img src={userObj.avatar} />
                    <div className="PPCname">{userObj.first_name} {userObj.last_name}</div>
                    <div className="PPClocation">{userObj.location}</div>
                    {loggedIn ? <></> : <button className="PPCfollow">FOLLOW</button>}
                    {loggedIn ? <></> : <button className="PPCadd">ADD FRIEND</button>}

                </div>
                <div className="PPCprofileCardRight"> {/*right side of profilecard including about section, interests, contact infos*/}
                    <div className="PPCabout">
                        <div className="PPCdescription">
                            <div className="PPCdescriptonbox">
                                <h1>About</h1>
                                <p>{userObj.about_me}</p>
                            </div>
                        </div>
                        <div className="PPCinterests">
                            <h1>Things I Like</h1>
                            <div className="asd">
                                {tags.map((element) => <p key={element}>{element}</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="PPCnavigation"> {/*section to navigate between posts, likes, friends, etc... */}
                        <div>
                            <p>{userObj.amount_of_posts}</p>
                            <h1>Posts</h1>
                        </div>
                        <Link to="/profile/likes">
                            <p>{userObj.amount_of_likes}</p>
                            <h1>Likes</h1>
                        </Link>
                        <Link to="/profile/friends">
                            <p>{userObj.amount_of_friends}</p>
                            <h1>Friends</h1>
                        </Link>
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
            <div className="PPCcontent">
                {posts.map(post => <PostCard post={post} />)}
            </div>
        </div>
    )
}

export default ProfilePostsCard;