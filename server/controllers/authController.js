const User = require('../model/userModel');
const util = require('util')
const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')

module.exports.signup = catchAsync(async (req,res)=>{
    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    });

    const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRE
    })

    res.cookie('token', token, {
        httpOnly : true,
        expires:new Date(Date.now()+ 24*60*60*1000),
        secure:process.env.NODE_ENV === 'production' 
    })
    res.status(201).json({
        status:'success',
        data:{
            user:{name:newUser.name,email:newUser.email}
        }
        // token:token,
    })
})


module.exports.login = catchAsync(async (req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password)return next(new appError('User eamil or password not provide',400));

    const user = await User.findOne({email}).select('password')
    if(!user)return next(new appError('User with this email does not exits',401));

    const isMatch = await user.checkPassword(password,user.password);
    if(!user || !isMatch){
        return next(new appError("password does not match",401));
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
    res.cookie('token', token, {
        httpOnly : true,
        expires:new Date(Date.now()+ 24*60*60*1000),
        secure:process.env.NODE_ENV === 'production' 
    })
    res.status(201).json({
        status:'success',
        data:{
            user:{email:user.email}
        }
        // token:token,
    })
});


module.exports.isLogin = async (req, res, next)=>{
    //Checking that token exists
    let token = req.cookies.token;
    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    //     token = req.headers.authorization.split(' ')[1];
    // }

    //Verifying Token
    if(!token) return next(new appError('User not logged in',401 ));
    let decoded
    try{
        decoded = await util.promisify(jwt.verify)(token,process.env.JWT_SECRET)
    }catch(err){
        return next(err)
    }
    //Checking that user still exists.
    const freshUser = await User.findById(decoded.id);
    if(!freshUser)
        return next(new appError('User belonging to token no longer exits',401));

    res.status(200).send({
        status:'success',
        message:'User is authentic'
    })
}
