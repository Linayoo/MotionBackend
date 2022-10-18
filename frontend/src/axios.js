import axios from "axios"
import {useSelector} from "react-redux";


const instance=axios.create({
    baseURL:"https://motion.propulsion-home.ch/backend/api"
})
instance.defaults.headers.post['Content-Type'] = 'application/json'


const makeConfig= (method,token)=>{
    const headers = new Headers({
        "Authorization": `Bearer ${token}`,
        'content-type': 'application/json'
    })
    const config = {
        method: method,
        headers: headers
    }
    return config
}

export default instance
export {makeConfig}

