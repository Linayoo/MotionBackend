import React from "react";
import './profilepicedit.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilePicEdit = () => {

    const navigate = useNavigate();
    const token = useSelector(state=>state.user.token)
    const handleChange = (event) => {
        event.preventDefault();
        
        const image = event.target.files[0]
        const put = "PATCH";
        const putheader = new Headers({
            "Authorization": `Bearer ${token}`,
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        })
        const putbody = JSON.stringify({ 
            "avatar": `${image}`
        })
        const putconfig = {
            method: put,
            headers: putheader,
            body: putbody
        }
        fetch("https://motion.propulsion-home.ch/backend/api/users/me/", putconfig)
        .then(response => response.json())
        .then((data) => {navigate("/profile/")})
        .catch(error => console.log(error))

    }

    return (
        <form className="PPEcontainer">
            <input className="PPEupload" type="file" onChange={handleChange}/>
            <button className="PPEremove">Remove</button>
        </form>
    )

}

export default ProfilePicEdit;