const jwt = require('jsonwebtoken');
const User = require('../models/users');
const mongoose = require('mongoose'); // لاستعمال ObjectId
const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // التحقق من التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    if (decoded.tokenVersion !== user.tokenVersion) {
      return res.status(401).json({ message: 'Token has expired. Please log in again.' });
    }

    req.user = {
      id: user._id,
      role: user.role,
      groups: user.groups || [],
    };

    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};




module.exports = authenticate;
