import React, {useEffect, useState} from "react";
import "./PostCard.style.css"
import {newFriendRequest} from "../../redux/userSlice/userSlice";
import {makeConfig} from "../../axios"
import {useSelector} from "react-redux";
function PostCard(props){
    const token = useSelector(state => state.user.token)
    const [postLikedStatus,setPostLikedStatus]=useState(props.post.logged_in_user_liked)
    console.log("post id: "+props.id +" is liked: " + postLikedStatus)
    const toggleLikeAPost = (id) =>{
        fetch("https://motion.propulsion-home.ch/backend/api/social/posts/toggle-like/"+id+"/",makeConfig("POST",token))
            .then(response=>response.json())
            .then(data=>{
                console.log("like sent")
                setPostLikedStatus(!postLikedStatus)
                console.log(!postLikedStatus)
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
                                <img className="avatar is-rounded" src={props.post.user.avatar} alt="user avatar image"/>
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
            //TODO: change the color of the icons when rendering the post depending on whether it is liked or not
            <div className="card-footer">
                <div className="icons">
                    <span className="icon-text" onClick={()=>toggleLikeAPost(props.id)}>
                      <span className="icon">
                          <i className="fas fa-heart" style={{
                              color: postLikedStatus ? 'mediumpurple' : '',
                          }}></i>
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