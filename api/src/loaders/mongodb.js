const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((e) => { console.log(e?.message); process.exit(1); });
  mongoose.connection.on('connected', () => console.log('Connection to MongoDB is successful'));
  mongoose.connection.on('disconnected', () => process.exit(1));
  mongoose.connection.on('error', () => { console.error('MongoDB connection Error'); process.exit(1); });
};

module.exports = { connectDB };
