const mongoose = require('../mongoose');

async function ConnectDB (){
  try{

    await mongoose.connect(process.env.MONGO_URL)
    console.log("connection established successfully")

  }catch(err){

    console.log(err)
    process.exit(1)

  }

}


module.exports = ConnectDB