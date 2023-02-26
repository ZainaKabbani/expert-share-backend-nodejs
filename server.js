const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
dotenv.config({ path: './config.env' });

mongoose.connect('mongodb://127.0.0.1:27017/expert_share');
mongoose.connection.on('connected', () => console.log('Connected'));
mongoose.connection.on('error', () => console.log('Connection failed with - ',err));



app.listen(3000, () => {
  console.log('app is running on port 3000');
});