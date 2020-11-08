const Sequelize = require('sequelize');
const db = require('../database');
const crypto = require('crypto')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  bio: {
    type: Sequelize.TEXT,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  googleId: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING,
    get(){
      return () => this.getDataValue('password') //reading the password text and turning it into a function that return the .password string
      //this.password() you can check what the password string is
    }
  },
  salt: {
    type: Sequelize.STRING,
    get(){
      return () => this.getDataValue('salt')
    }
  },

});

//given a candidate we take the salt and password we put it into the function we check it with what we have in our database then the person knows the password

User.prototype.correctPassword = function (candidatePassword) {
  return (
    User.encryptPassword(candidatePassword, this.salt()) === this.password() //this.Model.encryptPassword
  );
};

User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

//creating a hash and salting the password
User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};
//Hash Collisions are possible

const setSaltAndPassword = (user) => { // callback function Sequelize knows to call this.
  if (user.changed('password')) { // .changed Sequelize
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword)// HOOKS regenerate the salt & hash
User.beforeUpdate(setSaltAndPassword) // HOOKS regenerate the salt & hash

module.exports = User;
