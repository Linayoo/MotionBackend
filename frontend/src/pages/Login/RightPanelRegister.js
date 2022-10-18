import React from "react";
import {Link, Outlet} from "react-router-dom";
function RightPanelRegister(){

    return(
        <div className="right">
            <div className="right-content">
                <div className="register-corner">
                    <div>Already have an account?</div>
                    <div className="signup-button-container">
                        <Link to="/access">
                            <div className="signup-button">SIGN IN</div>
                        </Link>

                    </div>

                </div>

                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default RightPanelRegister