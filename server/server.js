const {Server} = require('socket.io');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})    //It must before the app
const app = require('./app.js')

const dbUrl = process.env.DATABASE_URL.replace('<password>',process.env.PASSWORD);

mongoose.connect(dbUrl)
.then(()=>{
    console.log('MongoDB connected')
})
.catch((err)=>{
    console.log(err)
})

const server = app.listen(process.env.PORT,()=>{
    console.log('Listening on port ',process.env.PORT)
})
module.exports = server;


const io = require('./socket.js')