import React from "react";
import {Link} from "react-router-dom";


function RightPanelRegisterAuthCode(){


    return (
        <div className="login">
            <div className="login-header">Congratulations</div>
            <span className="icon">
                <i className="fa fa-regular fa-circle-check"></i>
            </span>

            <div>
                <p>We have sent a confirmation code to your Email</p>
            </div>
            <Link to={"/access/signup/form"}>
                <div className="login-button">Next Step</div>
            </Link>

            <ul className="dots">
                <li className="dots__item"></li>
                <li className="dots__item active"></li>
                <li className="dots__item"></li>
            </ul>

        </div>
    )
}

export default RightPanelRegisterAuthCode