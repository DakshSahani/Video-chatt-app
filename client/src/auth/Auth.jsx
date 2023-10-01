import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Loading = ()=>{
    return <div className="h-screen w-full bg-slate-900">
        <h1 className="text-white font-semibold font-xl">Loading...</h1>
    </div>
}

const Auth = ({children})=>{
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    axios.get('/user/isLogin',{withCredentials:true})
    .then(()=>{
        setLoading(false)
    }).catch(err=>{
        navigate('/login')
    })

    return loading?<Loading />:children
}

export default Auth;