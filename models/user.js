const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Author', 'Borrower'],
    required: true,
  },
  borrowedBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  }],
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next){
  const user = this;

  // Hash the password only if it has been modified (or is new)
  if(!user.isModified('password')) return next();

  try{
      // Hash password generation
      const salt = await bcrypt.genSalt(10);

      // Hash password
      const hashedPassword = await bcrypt.hash(user.password, salt);
      
      // Override the plain password with the hashed one
      user.password = hashedPassword;
      next();
  }catch(err){
      return next(err);
  }
})

userSchema.methods.comparePassword = async function(userPassword){
  try{
      // Use bcrypt to compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(userPassword, this.password);
      return isMatch;
  }catch(err){
      throw err;
  }
}

const User = mongoose.model('User', userSchema);
module.exports = User;
