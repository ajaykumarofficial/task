const express = require('express');
const { register, login, dashboard } = require('../controllers/userController');
const auth = require('../middleware/auth');
const userRoute = express.Router();

userRoute.post('/register',register)
userRoute.post('/login',login)
userRoute.get('/dashboard',auth,dashboard)

module.exports = {userRoute}