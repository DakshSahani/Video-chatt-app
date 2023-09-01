import {createContext, useMemo, useContext} from 'react'
import { io } from 'socket.io-client';

const socketIoContext = createContext(null);
const useSocket = ()=>{
    return useContext(socketIoContext);
}
//FIXME:
// eslint-disable-next-line react/prop-types
function SocketIoProvider({children}){
    const socket = useMemo(()=>
        io('http://localhost:8000')
    ,[])
 
    return <socketIoContext.Provider value={socket}> 
        {children}
    </socketIoContext.Provider>
}

export default useSocket
export {SocketIoProvider}