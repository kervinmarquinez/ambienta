require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Conexión a MongoDB exitosa"))
        .catch(err => console.log("Error de conexión a MongoDB:", err));   
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }

};

module.exports = connectDB;