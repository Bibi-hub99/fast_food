const mongoose = require("../mongoose")

function connectDB(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('connected to database')
    })
    .catch((err)=>{
        console.log(err)
        process.exit(1)
    })
}

module.exports = connectDB