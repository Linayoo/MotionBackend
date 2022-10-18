// 19.09.2022 23:00 Yue: Setting up the page to clear error message for rendering react app
//
import React from "react";
import "./login.styles.css"
import motionLogo from "../../assets/images/logo_white.png"
import appleAppLogo from "../../assets/svgs/apple.svg"
import googleAppLogo from "../../assets/svgs/google.svg"

import twitterIcon from "../../assets/svgs/twitter_icon.svg"
import facebookIcon from "../../assets/svgs/facebook_icon.svg"
import instagramIcon from "../../assets/svgs/instagram_icon.svg"
import {Outlet} from "react-router-dom";


function LoginRoot(){

    return(

            <div className="body">
            <div className="content">
                <div className="left">
                    <div className="left-content-container">
                        <div id="motion-logo-container">
                            <img id="motion-logo" src={motionLogo} alt="motion logo"/>
                            <div id="motion-logo-text">Motion</div>
                        </div>
                        <div className="motion-marking-text">
                            <div>Connect with friends and the world</div>
                            <div>around you with Motion</div>
                        </div>

                        <div className="store-logo">
                            <div className="apple-logo">
                                <img src={appleAppLogo} alt="app store log"/>
                            </div>
                            <div className="google-logo">
                                <img src={googleAppLogo} alt="google app store logo"/>
                            </div>
                        </div>

                        <div className="social-media-logos">
                            <img id="twitter" src={twitterIcon}/>
                            <img id="facebook" src={facebookIcon}/>
                            <img id="ins" src={instagramIcon}/>

                        </div>
                        <div className="legal-text">
                            © Motion 2018. All rights reserved.
                        </div>


                    </div>
                </div>
                <Outlet />

            </div>
            </div>


    )
}

export default LoginRoot
