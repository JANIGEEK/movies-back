const mongoose = require('mongoose')

const connnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo Connected: ${conn.connection.host}`)   
    }catch(error){
        console.error(error)
        process.exit(1)
    }
}

module.exports = connnectDB