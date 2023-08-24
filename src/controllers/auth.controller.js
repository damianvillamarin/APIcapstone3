import User from '../models/User'
import  jwt  from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

//register
export const singup = async (req,res) =>{
  const {username, email, password, roles} = req.body;
 
  const newUser = new User({
    username,
    email,
    password : await User.encryptPassword(password)
  })

  if (roles){
    const founRoles =  await Role.find({name: {$in: roles}})
    newUser.roles = founRoles.map(role => role._id )
  } else {
    const role =  await Role.findOne({name: "user"})
    newUser.roles = [role._id]
  }

  const savedUser = await newUser.save();
  const token = jwt.sign({ id: savedUser._id},config.SECRET,{
    expiresIn : 86400  //24 Hours
  })
  res.json({token})
  console.log(newUser)
}
//login
export const singin = async (req,res) =>{
  const userFound = await User.findOne({email: req.body.email}).populate("roles");
  if ( !userFound ) return res.status(400).json({message:"User not Found"})
  
  const matchPassword = await User.validPassword(req.body.password, userFound.password)
  if ( !matchPassword ) return res.status(401).json({token: null , message:"Invalid Password, not Found"})

  const token = jwt.sign({ id: userFound._id},config.SECRET,{
    expiresIn : 86400  //24 Hours
  })
  console.log(userFound)
  res.json({token})
  
}