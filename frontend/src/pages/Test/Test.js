import React from "react";
import axios from "axios"

const Test = () => {
    axios.post("https://team4motion.propulsion-learn.ch/backend/token/",{email:"tabyagraf_dev@outlook.com",password:"a1b2c3d4e5f6"})
        .then(response=>{
        console.log("----the token for team 4 api----")
        console.log(response.data.access)
    }).catch(()=>alert("login failed"))


   return (
        <div>
            test our login
        </div>
    )

}

export default Test;