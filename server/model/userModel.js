const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'User Name is missing'],
    },
    email:{
        type:String,
        require:[true,"user email is missing"],
        unique:[true,'User email must be unique'],
        validate:[validator.isEmail,'Enter a correct email'],
    },
    password:{
        type:String,
        require:[true,'User password is missing'],
        min:[8,'Password must have length of at least 8'],
        select : false
    },
})

userSchema.pre('save',async function (next){
    //run this function only if password is Modified
    if(!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password,12);
    this.confirmPassword = undefined
    next();
})

userSchema.methods.checkPassword = async function (pass1 , encrypPass){
    return await bcrypt.compare(pass1,encrypPass);
}

userSchema.methods.isPasswordChangedAfter = function (TimeStamp){
    //Return true if changed else false
    if(this.passwordChangedAt){
        const timeOfChange = parseInt(this.passwordChangedAt.getTime()/1000,10);
        return TimeStamp < timeOfChange;
    }
    return false;
}


const User = new mongoose.model('users',userSchema);

module.exports = User;