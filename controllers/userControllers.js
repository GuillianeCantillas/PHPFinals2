const bcrypt = require('bcrypt');
const {User, Product} = require('../models/user'); // SCHEMA
const jwt = require('jsonwebtoken'); // JWT

async function registerUser(req, res) { // USER REGISTRATION FOR NEW AND OLD 
  const { email, password, isAdmin, orderedProducts } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // ENXRYPTION
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATION OF NEW USER
    const newUser = new User({
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
      orderedProducts: orderedProducts || [],
    });

    // SAVE NEW USER
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


async function loginUser(req, res) {
  const { email, password } = req.body;

  try {  // CHECKING IF THE USER ALREADY EXISTS
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // User authentication 
    // Generate and return a JWT
    const token = generateJWT(user);
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error during user login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// GENERATE A TOKEN
function generateJWT(user) {
  const payload = {
    userId: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });
  return token;
}

module.exports.loginUser = loginUser;
module.exports.registerUser = registerUser;