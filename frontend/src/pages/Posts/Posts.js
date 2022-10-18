// 19.09.2022 23:00 Yue: Setting up the page to clear error message for rendering react app

import React, {useEffect, useState} from "react";
import NavBar from "../../components/navBar/NavBar";
import "./posts.styles.css"
import PostCard from "../../components/postCard/PostCard";
import {useDispatch, useSelector} from "react-redux";
import send_svg from "../../assets/svgs/send_button.svg"
import NewPostModal from "../../components/sendPostModal/sendPostModal";
import {changeModalVisibility} from "../../redux/postModalSlice/postModalSlice";
import {changeLastEditedPostText} from "../../redux/userSlice/userSlice";

function Posts(){
    const dispatch= useDispatch()

    const [posts, setPosts]=useState([])
    const [newPostImage,setNewPostImage]=useState()
    const [panelState,setPanelState]=useState("Mine")
    const lastEditedPostText=useSelector(state=>state.user.lastEditedPostText)
    const authState = useSelector(state => state.user.token)
    const myAvatarUrl=useSelector(state=>state.user.avatarURL)

    const method = "GET"
    const headers = new Headers({
        "Authorization": `Bearer ${authState}`,
        'content-type': 'application/json'
    })
    const config = {
        method: method,
        headers: headers
    }

    const fetchPosts= ()=>{
        let postURLEnding="me/"
        if(panelState!=="Mine"){
            if(panelState==="Follow"){
                postURLEnding="following/"
            }else {
                postURLEnding="friends/"
            }
        }
        console.log("token used on post page "+ authState)
        fetch("https://motion.propulsion-home.ch/backend/api/social/posts/"+postURLEnding,config)
            .then(response=>response.json())
            .then(data=> {
                console.log("about to fetch post")
                if (data.results){
                    setPosts(data.results)
                }
            })
            .catch((error)=>console.log(error))
    }

    useEffect((state)=>{
        fetchPosts()
    },[authState,panelState])

    const switchPanel=(panelName)=>{
        setPanelState(panelName)
    }

    const fileSelectionHandler=(event)=>{
        setNewPostImage(event.target.files[0])
    }
    const sendPostHandler=(event)=>{
        event.preventDefault();
        const fd= new FormData()
        fd.append("images",newPostImage)
        fd.append("content", "a post with pic");
        const headers = new Headers({
            "Authorization": `Bearer ${authState}`,
        })
        const config={
            method: "POST",
            headers: headers,
            body:fd
        }
        fetch("https://motion.propulsion-home.ch/backend/api/social/posts/",config)
            .then(response=>response.json())
            .then(data=> {

                fetchPosts()
                changeModalStatus()
                // set the last edited post text back to empty
                changeLastEditedPostText("")
            })
            .catch((error)=>console.log(error))

    }

    const changeModalStatus = () => {
        console.log("open or closing modal")
        dispatch(changeModalVisibility())
    }
    const updateLastEditedText=(event) =>{
        dispatch(changeLastEditedPostText(event.target.value))
    }


    return(
        <div className="posts-page">
            <NavBar></NavBar>
            <div className="posts-content">
                <div className="panel">

                        <p className="control search-bar has-icons-left">
                            <input className="input input-search-box" type="text" placeholder="Search"/>
                            <span className="icon is-left ">
                                <i className="fas fa-search" aria-hidden="true"></i>
                            </span>
                        </p>

                        <p className="panel-tabs">
                            <a className={panelState==="Mine"?"is-active":""} onClick={()=>switchPanel("Mine")}>Mine</a>
                            <a className={panelState==="Friends"?"is-active":""} onClick={()=>switchPanel("Friends")}>Friends </a>
                            <a className={panelState==="Follow"?"is-active":""} onClick={()=>switchPanel("Follow")}>Follow</a>
                        </p>

                </div>

                <div className="postCards">
                    <div className="card postCard">
                        <div className="send_new_post_card card-content">
                            <figure className="image is-48x48">
                                <img className="avatar is-rounded" src={myAvatarUrl} alt="user avatar image"/>
                            </figure>
                            <input type="text" placeholder="What is on your mind today?" onChange={updateLastEditedText} className="new_post_text_outside"/>

                            <img className="send_post_button"  onClick={changeModalStatus} src={send_svg}/>
                            <NewPostModal text={lastEditedPostText} fileSelectionHandler={fileSelectionHandler} sendPostHandler={sendPostHandler}></NewPostModal>
                        </div>
                    </div>
                    {posts.map(post=>{
                        return <PostCard post={post} id={post.id}></PostCard>
                    })}
                </div>
            </div>

        </div>
    )
}

export default Posts
