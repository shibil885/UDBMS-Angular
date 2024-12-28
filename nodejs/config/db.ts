const mongoose  = require('mongoose')

require('dotenv').config()

const connectingDb = async () => {
    mongoose.connect(process.env.MONGODB)
        .then(() => {
            console.log('Mongodb connected');
        })
        .catch((error) => {
            console.log('sothing wrong happened');
            console.log(error);
        })
}


module.exports = connectingDb