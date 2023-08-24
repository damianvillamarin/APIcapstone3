import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'

const { promises } = require('dns');

const userSchema = new Schema({
    username: 
    { type :String,
      unique:true
    },
    email: 
    { type :String, 
      unique:true
    },
    password: 
    { type :String,
      required: true
    },
    roles:[{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
    
},{
    timestamps: true,
    versionKey:  false
});

userSchema.static({
  encryptPassword: function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  },
  validPassword: function(password,receivedPassword) {
    return bcrypt.compareSync(password, receivedPassword);
  }
})




//userSchema.statics.comparePassword = async (password, receivedPassword) =>{
 // return await bcryptjs.compare(password, receivedPassword)
//}

export default model('User', userSchema);