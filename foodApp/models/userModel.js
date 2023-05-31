const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const db_link='mongodb+srv://mndgmndg:mndgmndg@cluster0.ucsnz0u.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    // console.log(db)
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:3
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:3,
        validate: function(){
            return this.confirmPassword== this.password;
        }
    },

    role:{
        type:string,
        enum:['admin', 'user', 'restaurantOwner','deliveryBoy'],
        default:'user',
    },

    profileImage:{
        type:String,
        // default:'img/user/default.jpeg'
    }
})
//mongoose pre post hooks ...
userSchema.pre('save', function(){
    this.confirmPassword=undefined;
    console.log('Before saving in Database', this);
})

userSchema.pre('save', async function(){
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password, salt);
    // console.log("hashed String:" ,hashedString );
    this.password= hashedString;
})

userSchema.post('save', function(doc){
    console.log('After saving in DataBase', doc);
})


const userModel = mongoose.model('user',userSchema);

// (async function createUser(){
//     let user={
//         name:"Devanshi",
//         email:"abc@gmail.com",
//         password:"ala",
//         confirmPassword:"ala"
//     };

//     let data = await userModel.create(user);
//     console.log(data);
// })();

module.exports = userModel;