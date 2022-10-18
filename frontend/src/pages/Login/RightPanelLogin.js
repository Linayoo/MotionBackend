import React from "react";
import myAxios from "../../axios"
import avatarIcon from "../../assets/svgs/avatar.svg"
import passwordIcon from "../../assets/svgs/password.svg"
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/userSlice/userSlice";

function RightPanelLogin(){
    const navigate = useNavigate();
    const dispatch=useDispatch()

    const [emailInput,setEmailInput]=useState("lilian.yue.li@gmail.com")
    const [passwordInput,setPassInput]=useState("123")

    const userLogIn=(email,password)=>{
        // save the used email password in the object

        myAxios.post("/auth/token/",{email:email,password:password}).then(response=>{

            navigate("/profile")
            const user = {email:email,token:response.data.access};
            dispatch(setUser(user))
            console.log("----the token----")
            console.log(response.data.access)
            // save the credential in local storage
            localStorage.setItem("motion-auth", JSON.stringify(user))
        }).catch(()=>alert("login failed"))
    }

    const updateEmailInput=(event)=>{
        setEmailInput(event.target.value)
    }

    const updatePasswordInput=(event)=>{
        setPassInput(event.target.value)
    }

    return(
        <div className="right">
            <div className="right-content">
                <div className="register-corner">
                    <div>Don't have an account?</div>
                    <div className="signup-button-container">
                        <Link to="/access/signup">
                            <div className="signup-button">SIGN UP</div>
                        </Link>

                    </div>

                </div>

                <div className="login">
                    <div className="login-header">Sign In</div>
                    <div className="input-container">
                        <img src={avatarIcon}/>
                        <input type="text" placeholder="Email" onChange={updateEmailInput}></input>
                    </div>
                    <div className="input-container" >
                        <img src={passwordIcon}/>
                        <input type="password" placeholder="Password" onChange={updatePasswordInput}></input>
                    </div>

                    <div className="login-button" onClick={()=>userLogIn(emailInput,passwordInput)}>SIGN IN</div>
                </div>
            </div>
        </div>
    )

}

export default RightPanelLogin