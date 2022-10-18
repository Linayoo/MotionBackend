import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import myAxios from "../../axios"

function RightPanelRegisterForm(){
    const navigate=useNavigate()

    const [emailInput,setEmailInput]=useState("")
    const [passwordInput,setPassInput]=useState("")
    const [code,setCode]=useState("")
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [userNameInput,setUserName]=useState("")

    const updateEmailInput=(event)=>{
        setEmailInput(event.target.value)
    }

    const updatePasswordInput=(event)=>{
        setPassInput(event.target.value)
    }
    const updateCodeInput=(event)=>{
        setCode(event.target.value)
    }
    const updateFirstName=(event)=>{
        setFirstName(event.target.value)
    }
    const updateLastName=(event)=>{
        setLastName(event.target.value)
    }
    const updateUserNameInput=(event)=>{
        setUserName(event.target.value)
    }

    const userRegister=(emailInput,code,passwordInput,firstName,lastName,userNameInput)=>{
        myAxios.patch("/auth/registration/validation/",{
            email:emailInput,
            username:userNameInput,
            code:code,
            password:passwordInput,
            password_repeat:passwordInput,
            first_name:firstName,
            last_name:lastName
        }).then(response=>{
            console.log(response)
            navigate("/access/")
        }).catch((error)=>{
            navigate("/access/")
            alert("register failed")
            console.log(error)
        })
    }

    return (
        <div className="login">
            <div className="login-header">Verification</div>
            <div className="input-container register-form" >

                <input type="text" placeholder="Verification Code" onChange={updateCodeInput}></input>
                <input type="text" placeholder="Email" onChange={updateEmailInput}></input>
                <input type="text" placeholder="Username" onChange={updateUserNameInput}></input>
                <input type="text" placeholder="First Name" onChange={updateFirstName}></input>
                <input type="text" placeholder="Last Name" onChange={updateLastName}></input>
                <input type="password" placeholder="Password" onChange={updatePasswordInput}></input>
                <input type="password" placeholder="Repeat Password"></input>
            </div>

            <div className="login-button" onClick={()=>userRegister(emailInput,code,passwordInput,firstName,lastName,userNameInput)}>COMPLETE</div>


            <ul className="dots">
                <li className="dots__item"></li>
                <li className="dots__item"></li>
                <li className="dots__item active"></li>
            </ul>

        </div>
    )
}

export default RightPanelRegisterForm