const { generateToken } = require('../jwt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    console.log('Request received:', req.body);
    try {
     const data = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email : data.email });
    if (existingUser) {
      return res.status(400).send({ error: 'Email already exists' });
    }

    // Create a new user
    const newUser = new User(data);
    await newUser.save();
    console.log('Data saved:', newUser);

    //Generate JWT Token for the user
    const token = generateToken(
        { _id: newUser._id, role: newUser.role }, 
         process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ response: newUser, token: token });

  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

 // Login user
exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      //Find user by email
      const user = await User.findOne({ email: email });

      if (!user || !(await user.comparePassword(password))) {
        return res.status(404).json({ error: 'Invalid email or password' });
      }
  
       // Generate JWT Token for the user
      const token = generateToken(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

