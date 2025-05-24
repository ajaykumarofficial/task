require('dotenv').config();
const express =require('express')

const { userRoute } = require('./routes/userRoutes')
const cors = require('cors')
const mongoose = require('mongoose');


const mongoDB = process.env.MONGO_URI;


const app =express()
app.use(cors())
app.use(express.json());


app.use('/auth',userRoute)


mongoose.connect(mongoDB)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server running on server'));
  })
  .catch(err => console.error('MongoDB connection error:', err));