// 19.09.2022 23:00 Yue: Setting up the page to clear error message for rendering react app

import React, {useEffect, useState} from "react";
import NavBar from "../../components/navBar/NavBar";
import "./friends.styles.css"
import FriendCard from "../../components/friendsCards/FriendCard";

import {useSelector} from "react-redux";


function Friends(){
    const [friends,setFriends]=useState([])


    const authState = useSelector(state => state.user.token)
    const method = "GET"
    const headers = new Headers({
        "Authorization": `Bearer ${authState}`,
        'content-type': 'application/json'
    })


    const config = {
        method: method,
        headers: headers
    }


    useEffect((state)=>{
        fetch("https://motion.propulsion-home.ch/backend/api/social/followers/following/",config)
            .then(response=>response.json())
            .then(data=> {
                console.log(data.results)
                setFriends(data.results)
            })
            .catch((error)=>console.log(error))
    },[authState])



    return(
        <div className="friendsPage">
            <NavBar></NavBar>
            <div className="friendCards">
                {friends!==undefined?friends.map(friend=>{
                    return <FriendCard key={friend.username} friend={friend}> </FriendCard>
                }):<div/>}
            </div>
        </div>

    )
}

export default Friends
