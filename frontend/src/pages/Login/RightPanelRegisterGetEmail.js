import React, {useState} from "react";
import avatarIcon from "../../assets/svgs/avatar.svg";
import {useNavigate} from "react-router-dom";
import myAxios from "../../axios"

function RightPanelRegisterGetEmail(){
    const navigate=useNavigate()
    const [emailInput,setEmail]=useState()

    const updateEmailState=(event)=>{
        setEmail(event.target.value)
    }
    const [errorCodeDisplay,setErrorCode]=useState("")
    const getCode=(email)=>{
        myAxios.post("/auth/registration/",{email:email}).then(response=>{
            navigate("/access/signup/authcode")
        }).catch((error)=>{
                console.log(error)
                setErrorCode("Error occurred")
                try{
                    setErrorCode(error.response.data.email[0])
                }catch (error){
                    alert("get code failed and error unknown")
                }
            }
        )
    }

    const swtichToForm=()=>{
        navigate("/access/signup/form")
    }

    return (
        <div className="login">
            <div className="login-header">Sign UP</div>
            <div className="input-container">
                <img src={avatarIcon}/>
                <input type="text" placeholder="Email" onChange={updateEmailState}></input>
            </div>


            <div className="login-button" onClick={()=>getCode(emailInput)}>Get Code</div>
            {errorCodeDisplay?<div className="errorCodeText">{errorCodeDisplay}</div>:<div></div>}

            <ul className="dots">
                <li className="dots__item active" ></li>
                <li className="dots__item" ></li>
                <li className="dots__item" onClick={swtichToForm}></li>
            </ul>

        </div>
    )
}

export default RightPanelRegisterGetEmail