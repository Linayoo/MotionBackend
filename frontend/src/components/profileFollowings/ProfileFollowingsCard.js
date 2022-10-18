import React, { useEffect, useState } from "react";
import './profilefollowingscard.css'
import { Link } from "react-router-dom";
import FriendCard from "../friendsCards/FriendCard";

const ProfileFollowingsCard = () => {

    let localToken = JSON.parse(localStorage.getItem("motion-auth")) //retrieving token from localstorage

    const [following, setFollowing] = useState([])
    const [userObj, setUserObj] = useState([]);
    const [tags, setTags] = useState([]);

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
            .catch(error => console.log(error))
    }, [])

    useEffect((state) => {
        fetch("https://motion.propulsion-home.ch/backend/api/social/followers/following/", config)
            .then(response => response.json())
            .then((data) => { setFollowing(data.results) })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className="PFIcontainer">
            <div className="PFIcover">
                <img src={require('../../assets/images/other/coverimg.jpg')} />
            </div>
            <div className="PFIprofilecard"> {/*start of the profilecard component*/}
                <div className="PFIprofileCardLeft"> {/*left side of profilecard, inculding profile pic, name, location and edit button */}
                    <img src={userObj.avatar} />
                    <div className="PFIname">{userObj.first_name} {userObj.last_name}</div>
                    <div className="PFIlocation">{userObj.location}</div>
                    <button className="PFIfollow">FOLLOW</button>
                    <button className="PFIadd">ADD FRIEND</button>
                </div>
                <div className="PFIprofileCardRight"> {/*right side of profilecard including about section, interests, contact infos*/}
                    <div className="PFIabout">
                        <div className="PFIdescription">
                            <div className="PFIdescriptonbox">
                                <h1>About</h1>
                                <p>{userObj.about_me}</p>
                            </div>
                        </div>
                        <div className="PFIinterests">
                            <h1>Things I Like</h1>
                            <div className="asd">
                                {tags.map((element) => <p key={element}>{element}</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="PFInavigation"> {/*section to navigate between posts, likes, friends, etc... */}
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
                        <Link to="/profile/followers">
                            <p>{userObj.amount_of_followers}</p>
                            <h1>Followers</h1>
                        </Link>
                        <div>
                            <p>{userObj.amount_following}</p>
                            <h1>Following</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="PFIcontent">
                {following.map(friend => <FriendCard key={friend.username} friend={friend} />)}  
            </div>
        </div>
    )

}

export default ProfileFollowingsCard

/*

{friends !== undefined ? friends.map(friend => {
                    return <FriendCard key={friend.username} friend={friend}> </FriendCard>
                }) : <div />}

*/                