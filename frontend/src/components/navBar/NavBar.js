//author Levi, last revision: Oct-1, 17:00

import React, { useEffect, useState } from "react";
import './navbar.css';
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAvatar } from "../../redux/userSlice/userSlice";
import { setUniqueID } from "../../redux/idSlice/idSlice";



const NavBar = () => {

    let localToken = JSON.parse(localStorage.getItem("motion-auth")) //retrieving token from localstorage
    let tempFriendRequest = useSelector(state => state.user.friendRequestSentTemp)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [rendering, setRendering] = useState(false) // to check if the logout component should be rendered
    const [dropdownMenu, setDropMenu] = useState("")
    const [friendRequests, setFriendRequest] = useState([])
    const currentUserEmail = useSelector(state => state.user.email)
    const currentAvatar = useSelector(state => state.user.avatarURL)

    const headers = new Headers({
        "Authorization": `Bearer ${localToken.token}`,
        'content-type': 'application/json'
    })
    const config = {
        method: "GET",
        headers: headers
    }
    const getFriendRequest = () => {
        fetch("https://motion.propulsion-home.ch/backend/api/social/friends/requests/", config)
            .then(response => response.json())
            .then(data => { if (data.results) { setFriendRequest(data.results) } })
            .catch(error => alert("send request failed"))
    }
    const fetchUserInfo = () => {
        if (currentAvatar === "") {
            fetch("https://motion.propulsion-home.ch/backend/api/users/me/", config)
                .then(response => response.json())
                .then(data => { if (data.avatar != null) { dispatch(setAvatar(data.avatar)) } })
                .catch(error => alert("send request failed"))
        }
    }
    const toggleDropMenu = () => {
        if (dropdownMenu === "is-active") {
            setDropMenu("")
        } else {
            setDropMenu("is-active")
        }
    }
    const setIDtoMe = () => {
        dispatch(setUniqueID('me'))
    }

    useEffect(() => {
        fetchUserInfo();
    }, [])

    useEffect(() => {
        getFriendRequest()
    }, [localToken.token, tempFriendRequest])

    return (
        <>
            <div className="navContainer">
                <div className="home" onClick={() => console.log('Redirect to home page')}>
                    <img className="homelogo" src={require('../../assets/images/logo.png')} />
                    <div>Motion</div>
                </div>
                <div className="posts" onClick={() => navigate("/")} >
                    <img className="postslogo" src={require('../../assets/svgs/posts_logo.svg').default} />
                    <div className="poststext">Posts</div>
                </div>
                <div className="findFriends" onClick={() => navigate("/friends/")}>
                    <img className="friendslogo" src={require('../../assets/svgs/icon-friends.svg').default} />
                    <div className="friendstext">Find Friends</div>
                </div>

                <div className={`dropdown notifications ${dropdownMenu}`}>
                    <div className="dropdown-trigger" onClick={toggleDropMenu}>
                        <div className="notifications" aria-haspopup="true" aria-controls="dropdown-menu3">
                            <img className="bell" src={require('../../assets/svgs/notification_bell.svg').default} />
                            <div className="notiNumber">3</div>
                        </div>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                        <div className="dropdown-content">
                            <div className="dropdown-item">
                                Received Requests
                            </div>
                            {friendRequests.map(request => {

                                if (request.requester.email !== currentUserEmail) {
                                    return <div className="notification-requests dropdown-item">
                                        <p>{request.receiver.username}</p>
                                        <i className="fa-regular fa-clock"></i>
                                    </div>
                                }
                            })}

                            <div className="dropdown-item">
                                Sent Requests
                            </div>
                            {friendRequests.map(request => {
                                if (request.requester.email === currentUserEmail) {
                                    return <div className="notification-requests dropdown-item">
                                        <p>{request.receiver.username}</p>
                                        <i className="fa-regular fa-clock"></i>
                                    </div>
                                }
                            })}

                        </div>
                    </div>
                </div>
                <figure className="image is-48x48" onClick={() => {setIDtoMe(); navigate('../profile/')}}>
                    <img className="avatar is-rounded" src="https://motion.propulsion-home.ch/media-files/antonio-napodano-mjVN3RJVKd0-unsplash.jpg" />
                </figure>
                <div className="editbutton">
                    <button className="edit" onClick={() => setRendering(!rendering)}></button> {/*sets the state to render logout*/}
                </div>
            </div>
            {rendering ? <Logout passRendering={setRendering} /> : ''} {/*rendering of the logout component based on state*/}
        </>
    )
}


export default NavBar;