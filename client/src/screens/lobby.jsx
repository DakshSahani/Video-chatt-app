import { useCallback, useEffect, useState } from "react";
import useSocket from '../context/useSocket.jsx';
import Header from './Header.jsx'
import {useNavigate} from 'react-router-dom'

function Lobby(){
    const [email,setEmail] = useState('');
    const [roomId,setRoomId] = useState('');
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const socket = useSocket();

    const handleSubmit = (e)=>{
        e.preventDefault();
        socket.emit('join-room',{email,roomId})
        // navigate('/room');
        setEmail("");
        setRoomId("");
        
    }   //TODO: useCallback(()=>{},[email,roomId,socket])

    const handleRoomJoin = useCallback((roomData)=>{
        console.log(`user : ${roomData.email} joined the room : ${roomData.roomId}`);
        navigate(`/room/${roomData.roomId}`);
    },[navigate])

    useEffect(()=>{
        socket.on('room-joined',handleRoomJoin)
        return ()=>{
            socket.off('room-joined',handleRoomJoin)
        }
    },[socket,handleRoomJoin])
    

    return <>
        <Header />
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email ID</label>
            <input
                className="border-black border-2" 
                type="email"
                id="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
             />
             <br />
             <label htmlFor="room">Room ID</label>
             <input 
                className="border-black border-2" 
                type="text"
                id="room"
                value={roomId}
                onChange={(e)=>{setRoomId(e.target.value)}}
             />
             <br />
             <button onClick={handleSubmit}>join</button>
        </form>
    </>
}

export default Lobby;