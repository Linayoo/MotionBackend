import './App.css';
import {Routes, Route, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import Posts from "./pages/Posts/Posts"
// import Login components
import LoginRoot from "./pages/Login/LoginRoot"
import RightPanelLogin from "./pages/Login/RightPanelLogin";
import RightPanelRegister from "./pages/Login/RightPanelRegister";
import RightPanelRegisterGetEmail from "./pages/Login/RightPanelRegisterGetEmail";
import RightPanelRegisterCongrats from "./pages/Login/RightPanelRegisterCongrats";
import RightPanelRegisterForm from "./pages/Login/RightPanelRegisterForm";
// import Profile components
import Profile from "./pages/Profile/Profile"
import ProfileEdit from './pages/Profile/ProfileEdit';
import ProfileFriends from './pages/Profile/ProfileFriends';
import ProfilePosts from './pages/Profile/ProfilePosts';
import ProfileLikes from './pages/Profile/ProfileLikes';
import ProfileFollowers from './pages/Profile/ProfileFollowers';
import ProfileFollowings from './pages/Profile/ProfilesFollowing';
import Friends from "./pages/Freinds/Friends";

import {setUser} from "./redux/userSlice/userSlice";
import {useDispatch} from "react-redux";

function App() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    // reload the key from local storage if exist
    useEffect((state)=>{
        const userFromLs = localStorage.getItem("motion-auth")
        if (userFromLs) {
            const user = JSON.parse(userFromLs)
            if(user.email && user.token){
                dispatch(setUser(user))
                // try use the token to see if this token is still valied

                const headers = new Headers({
                    "Authorization": `Bearer ${user.token}`,
                    'content-type': 'application/json'
                })
                const config = {
                    method: "GET",
                    headers: headers
                }
                // testing if this token works
                fetch("https://motion.propulsion-home.ch/backend/api/users/me/",config)
                    .then(response=>response.json())
                    .then(data=> {
                        console.log("token valid")
                    })
                    .catch((error)=>navigate("/access"))
                return
            }
        }
        // if this function has not stoped by the return by now, navigate to access
        navigate("/access")
    },[])
    return (
        <div>
            <Routes>
                {/*the home page is the posts page*/}
                <Route path={"/"} element={<Posts/>}></Route>
                <Route path={"/friends"} element={<Friends/>}></Route>
                <Route path={"/access"} element={<LoginRoot/>}>
                    <Route path={""} element={<RightPanelLogin/>}></Route>
                    <Route path={"signup"} element={<RightPanelRegister/>}>
                        <Route path={""} element={<RightPanelRegisterGetEmail/>}></Route>
                        <Route path={"authcode"} element={<RightPanelRegisterCongrats/>}></Route>
                        <Route path={"form"} element={<RightPanelRegisterForm/>}></Route>
                    </Route>
                </Route>
                <Route path={"/profile"} element={<Profile/>}></Route>
                <Route path={"/profile/:userID"} element={<Profile/>}></Route>
                <Route path={"/profile/edit"} element={<ProfileEdit/>}></Route>
                <Route path={"/profile/friends"} element={<ProfileFriends/>}></Route>
                <Route path={"/profile/posts"} element={<ProfilePosts/>}></Route>
                <Route path={"/profile/:userID/posts"} element={<ProfilePosts/>}></Route>
                <Route path={"/profile/likes"} element={<ProfileLikes/>}></Route>
                <Route path={"/profile/followers"} element={<ProfileFollowers/>}></Route>
                <Route path={"/profile/following"} element={<ProfileFollowings/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
