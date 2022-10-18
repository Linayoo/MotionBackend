import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './profileeditcard.css';
import Tags from "./tags";
import ProfilePicEdit from "./profilePicEdit";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileEditCard = () => {

    let localToken = JSON.parse(localStorage.getItem("motion-auth")) //retrieving token from localstorage

    let newTag = '';
    const form = useRef(null)
    const navigate = useNavigate();
    const [renderingEdit, setRenderingEdit] = useState(false)
    const [userObj, setUserObj] = useState([]);
    const [tags, setTags] = useState([])
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [location, setLocation] = useState();
    const [email, setEmail] = useState();
    const [about, setAbout] = useState();
    const [userName, setUserName] = useState();
    const [phone, setPhone] = useState();

    const get = "GET"
    const patch = "PATCH";
    const header = new Headers({
        "Authorization": `Bearer ${localToken.token}`,
        'content-type': 'application/json'
    })
    const body = JSON.stringify({
        "email": `${email}`,
        "first_name": `${firstName}`,
        "last_name": `${lastName}`,
        "username": `${userName}`,
        "job": `${phone}`,
        "location": `${location}`,
        "about_me": `${about}`,
        "things_user_likes": JSON.parse(JSON.stringify(tags))
    })
    const getconfig = {
        method: get,
        headers: header
    }
    const patchconfig = {
        method: patch,
        headers: header,
        body: body
    }
    

    useEffect((state) => {
        fetch("https://motion.propulsion-home.ch/backend/api/users/me/", getconfig)
            .then(response => response.json())
            .then((data) => {
                setUserObj(data);
                setTags(data.things_user_likes);
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setLocation(data.location);
                setEmail(data.email);
                setAbout(data.about_me);
                setUserName(data.username);
                setPhone(data.job);

            })
            .catch()
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("https://motion.propulsion-home.ch/backend/api/users/me/", patchconfig)
            .then(response => response.json())
            .then((data) => { navigate("/profile/") })
            .catch(error => console.log(error))
    }

    const deleteTag = (event) => {
        let newArray = [...tags]
        newArray.splice(event.target.id, 1);
        setTags(newArray)
    }

    const handleInterestClick = (event) => {
        event.preventDefault();
        setTags([...tags, newTag]);
        newTag = '';
        form.current.reset();
    }

    return (
        <div className="PEcardcontainer">
            <div className="PEcover">
                <img src={require('../../assets/images/other/coverimg.jpg')} />
            </div>
            <div className="editCard">
                <div className="editCardLeft">
                    <img src={userObj.avatar} />
                    <button onClick={() => setRenderingEdit(!renderingEdit)} className='PEupdate'>UPDATE IMAGE</button>
                    {renderingEdit ? <ProfilePicEdit /> : ''}
                    <button className="PEdelete">DELETE ACCOUNT</button>
                    <button className="PEsave" form='userform' type="submit">SAVE</button>
                </div>
                <div className="editCardRight">
                    <form id='userform' onSubmit={handleSubmit}>
                        <div className="cardRightTop">
                            <div className="topLeft">
                                <label htmlFor="PEfirstname">First name</label>
                                <input value={firstName} onChange={(e) => { setFirstName(e.target.value) }} id='PEfirstname' className='PEfirstname' type='text'></input>
                                <label htmlFor="PEemail">Email</label>
                                <input value={email} onChange={(e) => { setEmail(e.target.value) }} id='PEemail' className='PEemail' type='text'></input>
                                <label htmlFor="PElocation">Location</label>
                                <input value={location} onChange={(e) => { setLocation(e.target.value) }} id='PElocation' className='PElocation' type='text'></input>
                                <label htmlFor="PEabout">About</label>
                                <textarea value={about} onChange={(e) => { setAbout(e.target.value) }} id='PEabout' className='PEabout' type='textarea' rows={3}></textarea>
                            </div>
                            <div className="topRight">
                                <label htmlFor="PElastname">Last name</label>
                                <input value={lastName} onChange={(e) => { setLastName(e.target.value) }} id='PElastname' className='PElastname' type='text'></input>
                                <label htmlFor="PEusername">Username</label>
                                <input value={userName} onChange={(e) => { setUserName(e.target.value) }} id='PEusername' className='PEusername' type='text'></input>
                                <label htmlFor="PEphone">Phone</label>
                                <input value={phone} onChange={(e) => { setPhone(e.target.value) }} id='PEphone' className='PEphone' type='number'></input>
                                <label htmlFor="PEpassword">Password</label>
                                <input value={''} id='PEpassword' className='PEpassword' type='password'></input>
                            </div>
                        </div>
                    </form>
                    <div className="cardRightBottom">
                        <h1>Things I like</h1>
                        <div className="tagsContainer">
                            {tags.map((element, index) => <Tags name={element} id={index} blabla={deleteTag} />)}
                        </div>
                        <div className="PEinterests">
                            <form ref={form} id='tagform' onSubmit={handleInterestClick}>
                                <input placeholder="Type something..." className="interestsList" onChange={(e) => { newTag = e.target.value }}></input>
                                <button className="PEaddbutton" form='tagform' type="submit">ADD</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileEditCard;