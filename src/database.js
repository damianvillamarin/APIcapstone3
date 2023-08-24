import mongoose from 'mongoose'

mongoose.connect("mongodb://127.0.0.1/bycicledb",{
    useNewUrlParser:true,
    useUnifiedTopology:true 
})

 .then(db => console.log("db is Conected"))
 .catch(error => console.log(error))
