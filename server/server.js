const bodyParser = require('body-parser');
const express = require('express');
const {Server} = require('socket.io');

const io = new Server(8000,{
    cors:true
})

const emailToRoomMap = new Map();
const roomToEmailMap = new Map();

io.on('connection',(socket)=>{
    let rooms = [];
    console.log('Socket connected : ',socket.id)
    socket.on('join-room',(data)=>{
        emailToRoomMap.set(data.email,data.roomId);
        roomToEmailMap.set(data.roomId,data.email);

        console.log(`${data.email} join the room : ${data.roomId}`);
        socket.join(data.roomId)
        io.to(socket.id).emit('room-joined',data)
        socket.rooms.forEach((room)=>{
            if(room!==socket.id)
                rooms.push(room);
        })
    })
    socket.on('ready',()=>{
        console.log('ready',rooms)
        socket.to(rooms).emit('remoteUser-ready')
    })
    socket.on('offer',(offer)=>{
        console.log('offer')
        socket.to(rooms).emit('receive-offer',offer);
    })
    socket.on('answer',(answer)=>{
        console.log('answer')
        socket.to(rooms).emit('receive-answer',answer);
    })
    socket.on('ice-candidate',(candidates)=>{
        console.log('ice-candidate ',socket.id)
        socket.to(rooms).emit('receive-ice',candidates);
    })
    

})
