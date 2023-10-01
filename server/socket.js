const { Server} = require("socket.io")
const expServer = require("./server")

const io = new Server(expServer,{
    cors:true
})

io.on('connection',(socket)=>{
    let room;
    console.log('Socket connected : ',socket.id)
    socket.on('join-room',(data)=>{
        console.log(`${data.email} join the room : ${data.roomId}`);
        socket.join(data.roomId)
        io.to(socket.id).emit('room-joined',data)
        room = data.roomId
    })
    socket.on('ready',()=>{
        console.log('ready',room)
        socket.to(room).emit('remoteUser-ready')
    })
    socket.on('offer',(offer)=>{
        console.log('offer')
        socket.to(room).emit('receive-offer',offer);
    })
    socket.on('answer',(answer)=>{
        console.log('answer')
        socket.to(room).emit('receive-answer',answer);
    })
    socket.on('ice-candidate',(candidates)=>{
        console.log('ice-candidate ',socket.id)
        socket.to(room).emit('receive-ice',candidates);
    })
    socket.on('close',()=>{
        console.log('close',socket.id)
        socket.to(room).emit('receive-close');
    })
})

module.exports = io;