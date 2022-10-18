//author Levi, last revision: Oct-1, 16:30

import React, { useEffect, useState } from "react";
import './profilepage.css';
import { Link, useParams, useNavigate } from "react-router-dom";
import { setUniqueID } from "../../redux/idSlice/idSlice";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {

    let localToken = JSON.parse(localStorage.getItem("motion-auth")) //retrieving token from localstorage
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userObj, setUserObj] = useState([]) // state with an object of the user
    const [tags, setTags] = useState([])       // state with an array the users interests
    const self = useSelector((state) => state.routeID.uniqueID)
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
    const setIDtoMe = () => {
        dispatch(setUniqueID('me'))
    }
    const setIDtoUser = (id) => {
        dispatch(setUniqueID(id))
    }


    useEffect((state) => {

        setIDtoUser(initialID);

        if (self === undefined || self === 'me') {
            setIDtoMe();
            fetch(`https://motion.propulsion-home.ch/backend/api/users/me/`, config)
                .then(response => response.json())
                .then((data) => { setUserObj(data); setTags(data.things_user_likes) }) // setting state of the user and user's interests array
                .catch()
        } else {
            fetch(`https://motion.propulsion-home.ch/backend/api/users/${self}/`, config)
                .then(response => response.json())
                .then((data) => { setUserObj(data); setTags(data.things_user_likes) }) // setting state of the user and user's interests array
                .catch()
        }
    }, [self])

    return (
        <div className="PPcontainer"> {/*start of the component, begins with the coverpage*/}
            <div className="PPcover">
                //TODO: the img is hard coded, it should be the banner in api
                <img src={require("../../assets/images/other/coverimg.jpg")} />
                {/*<img src={require('./assets/coverimg.jpg')} />*/}
            </div>
            <div className="PPprofilecard"> {/*start of the profilecard component*/}
                <div className="PPprofileCardLeft"> {/*left side of profilecard, inculding profile pic, name, location and edit button */}
                    <img onClick={() => { setIDtoMe(); navigate('../profile/') }} src={userObj.avatar} />
                    <div className="PPname">{userObj.first_name} {userObj.last_name}</div>
                    <div className="PPlocation">{userObj.location}</div>
                    {self ? <></> : <Link to="/profile/edit"><button className="PPeditprofile">EDIT PROFILE</button></Link>}
                </div>
                <div className="PPprofileCardRight"> {/*right side of profilecard including about section, interests, contact infos*/}
                    <div className="PPabout">
                        <div className="PPdescription">
                            <div className="PPdescriptonbox">
                                <h1>About</h1>
                                <p>{userObj.about_me}</p>
                            </div>
                            <div className="PPcontact">
                                <div className="PPemail">
                                    <h2>Email</h2>
                                    <h3>{userObj.email}</h3>
                                </div>
                                <div className="PPphone">
                                    <h2>Phone</h2>
                                    <h3>{userObj.job}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="PPinterests">
                            <h1>Things I Like</h1>
                            <div className="asd">
                                {tags.map((element) => <p key={element}>{element}</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="PPnavigation"> {/*section to navigate between posts, likes, friends, etc... */}
                        <div className="toSelect" onClick={() => {navigate(`../profile/${self}/posts`)}}>
                            <p>{userObj.amount_of_posts}</p>
                            <h1>Posts</h1>
                        </div>
                        <div className="toSelect" to="/profile/likes">
                            <p>{userObj.amount_of_likes}</p>
                            <h1>Likes</h1>
                        </div>
                        <div className="toSelect" to='/profile/friends'>
                            <p>{userObj.amount_of_friends}</p>
                            <h1>Friends</h1>
                        </div>
                        <div className="toSelect" to="/profile/followers">
                            <p>{userObj.amount_of_followers}</p>
                            <h1>Followers</h1>
                        </div>
                        <div className="toSelect" to="/profile/following">
                            <p>{userObj.amount_following}</p>
                            <h1>Following</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage