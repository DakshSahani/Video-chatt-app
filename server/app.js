const express = require('express');
const app = express();

const path = require('path')
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const usersRouter = require('./routes/usersRoutes')
const appError = require('./utils/appError');
const errorController = require('./controllers/errorController.js')

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

//middlewares
app.use(express.json());
(process.env.NODE_ENV === 'development') && app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(cookieParser())

app.use(express.static(path.join(__dirname , "../client/build")))

//Routes

app.use('/user',usersRouter)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '../client/build', '/index.html'))
})

app.all('*',(req,res,next)=>{
    next(new appError(
    `This route is not defined`,
    404));
})
    
app.use(errorController);

module.exports = app;
