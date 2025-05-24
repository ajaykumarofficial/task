const { User } = require("../models/userModel");
const bcrypt =require('bcrypt')
const jwt =require('jsonwebtoken')

const login= async(req,res)=>{
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password.' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login.' });
  }

}

const register= async(req,res)=>{
    try {
        const { name, dob, email, password } = req.body;
        
       
        if (!name || !dob || !email || !password) {
          return res.status(400).json({ message: 'All fields are required.' });
        }
    
        
        const existingUser = await User.findOne( {email} );
        if (existingUser) {
          return res.status(409).json({ message: 'User already exists with this email.' });
        }
    
        
        const hashedPassword = await bcrypt.hash(password, 10);
    
    
        const newUser = new User({
          name,
          dob,
          email,
          password: hashedPassword
        });
    
        await newUser.save();
       

        res.status(201).json({
            message: 'User registered successfully!',
          });
    
      } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
      }

}

const dashboard=(req,res)=>{
  res.json({
    data: [
      { id: 1, name: 'John Doe', email: 'john@example.com', dob: '1995-01-01', role: 'Admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', dob: '1990-05-20', role: 'User' }
    ]
  });
}

module.exports = {login,register,dashboard}