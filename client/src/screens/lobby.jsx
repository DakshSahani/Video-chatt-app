import { useCallback, useEffect, useState } from "react";
import {useSocket} from '../context/useSocket.jsx';
import {useNavigate} from 'react-router-dom'
import Button from "../utils/Button.jsx";
import Form from "../utils/Form.jsx";
import MainPageTemplate from "../utils/HomePageTemplate.jsx";
import Input from "../utils/Input.jsx";

function Lobby(){
    const [email,setEmail] = useState('');
    const [roomId,setRoomId] = useState('');
    const navigate = useNavigate();

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
        <MainPageTemplate>
        <Form onSubmit={handleSubmit} className = "text-center">
            <Input type="text" id="lobby-email" label="Name" state={{
                value:email,
                set:setEmail
            }}/>
            <Input type="text" id="lobby-room" label="Room Id" state={{
                value:roomId,
                set:setRoomId
            }}/>
            <Button primary onClick={handleSubmit}>join</Button>
        </Form>
    </MainPageTemplate>
    </>
}

export default Lobby;