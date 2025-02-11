const mongoose = require('mongoose');

const connectMongo = async () => {
    try{
       const conn = await mongoose.connect(process.env.MONGO_URI,{
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useFindAndModify: false
       });
       console.debug(`MongoDb Connected: ${conn.connection.host}`);
    }catch(err){
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectMongo ;