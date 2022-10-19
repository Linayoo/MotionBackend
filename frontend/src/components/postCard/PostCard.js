import React, {useEffect, useState} from "react";
import "./PostCard.style.css"
import {makeConfig} from "../../axios"
import {useSelector} from "react-redux";
function PostCard(props){
    const token = useSelector(state => state.user.token)
    // this is different from the heart liked or not status, it is only within this component, and only for loading status
    const [heartLoadingStatus,setHeartLoadingStatus]=useState(false)
    let heartColorClass=props.post.logged_in_user_liked?"isLiked":""
    if (heartLoadingStatus){
        heartColorClass="heartIsLoading"
    }
    // const retrieveSinglePost=(id)=>{
    //     fetch("https://motion.propulsion-home.ch/backend/api/social/posts/"+id+"/",makeConfig("GET",token))
    //         .then(response=>response.json())
    //         .then(data=>{
    //             setLikedStatus(data.logged_in_user_liked)
    //         }).catch(error=>console.log("api call for update like status changed"))
    // }
    const toggleLikeAPost = (id) =>{
        setHeartLoadingStatus(true)
        fetch("https://motion.propulsion-home.ch/backend/api/social/posts/toggle-like/"+id+"/",makeConfig("POST",token))
            .then(response=>response.json())
            .then(data=>{
                console.log("like sent")
                console.log("about to fetch post again")
                props.newFetch().then(()=>setHeartLoadingStatus(false))
            })
            .catch(error=>alert("send request failed"))
    }

    return(
        <div className="card postCard">
            <div className="card-header">
                <div className="card-header-title">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                {props.post.user.avatar === null ? <div className="avatar-image">{props.post.user.first_name[0]}</div> : <img className="is-rounded" src={props.post.user.avatar} />}
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="is-6">{props.post.user.first_name} {props.post.user.last_name}</p>
                            <p className="is-size-7" >Just now</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="card-content">

                <div className="content">
                    {props.post.content}
                </div>
            </div>
            {props.post.images.length>0?
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img className="post-images" src={props.post.images[0].image} alt="post images"/>
                    </figure>
                </div>:<div/>}
            <div className="card-footer">
                <div className="icons">
                    <span className="icon-text" onClick={()=>toggleLikeAPost(props.id)}>
                      <span className="icon">
                          <i className={`fas fa-heart ${heartColorClass}`}></i>
                      </span>
                      <span>Like</span>
                    </span>
                    <span className="icon-text">
                      <span className="icon">
                        <i className="fa-solid fa-share" ></i>
                      </span>
                      <span>Share</span>
                    </span>


                </div>

            </div>
        </div>
    )

}


export default PostCard