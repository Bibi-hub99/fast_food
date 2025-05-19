const mongoose = require("../mongoose")


//const mongoose = require('mongoose');

//const uri = `mongodb+srv://${process.env.MONGO_USERNAME_ADMIN}:${process.env.MONGO_PASSWORD_ADMIN}@cluster.mongodb.net/food_shop`;
const uri = `mongodb+srv://${process.env.MONGO_USERNAME_ADMIN}:${process.env.MONGO_PASSWORD_ADMIN}@cluster0.mb1i07x.mongodb.net/food_shop?retryWrites=true&w=majority&appName=Cluster0`;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    console.log(mongoose.connection.name)
  } finally {
    // Ensures that the client will close when you finish/error
    //await mongoose.disconnect();
  }
}



function connectDB(){
    /*mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('connected to database')
    })
    .catch((err)=>{
        console.log(err)
        process.exit(1)
    })*/

    run().catch(console.dir);

}
console.log()

module.exports = connectDB