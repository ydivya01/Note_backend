const mongoose = require('mongoose')
const dotenv = require('dotenv')
const connectDB = async ()=>{
    try{
mongoose.set('strictQuery',false);
const conn = await mongoose.connect("mongodb+srv://divyadvnsh:WBf7eEyDoS1fuhz1@cluster0.iuwfo8w.mongodb.net/Notes")
console.log(`Database connected ${conn.connection.host}`)
    }catch(error){
        console.log(error)
        process.exit(1)

    }
}

module.exports = connectDB