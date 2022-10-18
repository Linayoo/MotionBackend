import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {newFriendRequest} from "../../redux/userSlice/userSlice";

function FriendCard(props){
    const token=useSelector(state => state.user.token)
    const dispatch=useDispatch()
    const [friendRequestStatus,setFriendRequestStatus]=useState("ADD FRIEND")
    const headers = new Headers({
        "Authorization": `Bearer ${token}`,
        'content-type': 'application/json'
    })

    const config = {
        method: "POST",
        headers: headers
    }

    const sendFriendRequest=()=>{
        fetch("https://motion.propulsion-home.ch/backend/api/social/friends/request/"+props.friend.id+"/",config)
            .then(response=>response.json())
            .then(data=>{
                console.log(data)
                setFriendRequestStatus("SENT")
                dispatch(newFriendRequest(props.friend.id))
            })
            .catch(error=>alert("send request failed"))
    }
    return(
        <div className="card friendCard">
            <div className="card-content">
                <figure className="image is-48x48">
                    {props.friend.avatar===null?<div className="avatar-image">{props.friend.first_name[0]}</div>:<img className="is-rounded" src={props.friend.avatar}/>}
                </figure>

                <p className="user-name"> {props.friend.first_name} {props.friend.last_name}</p>
                <p className="user-location"> {props.friend.location!==""?props.friend.location:"Somewhere"}</p>


                <div className="buttons">
                    <button className="button is-small is-following" > FOLLOWING </button>
                    <button className="button is-small" onClick={sendFriendRequest}> {friendRequestStatus} </button>
                </div>

                <p className="user-bio"> {props.friend.about_me!==""?props.friend.about_me:"a user of motion"}</p>

                <div className="hobbies">
                    {props.friend.things_user_likes.map(hobby=>{
                        return <button className="is-small button has-background-info-light">{hobby}</button>
                    })}
                </div>


            </div>

        </div>
    )
}

export default FriendCard