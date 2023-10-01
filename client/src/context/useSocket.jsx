import {createContext, useMemo, useContext, useState} from 'react'
import { io } from 'socket.io-client';

const socketIoContext = createContext(null);

function SocketIoProvider({children}){
    const socket = useMemo(()=>
        io('/')
    ,[])
    const [user,setUser] = useState({
        name:"",
        email:""
    })
 
    return <socketIoContext.Provider value={{socket,user,setUser}}> 
        {children}
    </socketIoContext.Provider>
}

const useSocket = ()=>{
    const {socket} = useContext(socketIoContext);
    return socket;
}

const useUser = ()=>{
    const {user,setUser} = useContext(socketIoContext);
    return [user, setUser];
}

export {SocketIoProvider, useUser, useSocket}