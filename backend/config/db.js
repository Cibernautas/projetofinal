const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB conectado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao conectar no MongoDB:', error.message);
        process.exit(1); // Para o servidor se der erro
    }
};

module.exports = connectDB;
