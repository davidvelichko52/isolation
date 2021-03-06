'use strict';
let bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,255],
          msg: 'Oh, you don\'t have a first name huh?'
        }
      }
    },
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail: {
          masg: 'PLEASE!!! give a valid email adress 😡'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6,32],
          msg: 'Password must be between 6 and 32 characters'
        }
      }
    },
    bio: DataTypes.TEXT,
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
    admin: DataTypes.BOOLEAN,
    pic: DataTypes.STRING,
    zipcode: DataTypes.INTEGER
  }, { 
    hooks: {
      beforeCreate: pendingUser => {
        // hash the password
        let hashedPassword = bcrypt.hashSync(pendingUser.password, 12)

        // reassign the hashed password (overwrite the plain text)
        pendingUser.password = hashedPassword
      }
    }
  })

  user.associate = function(models) {
    // associations can be defined here
    models.user.hasMany(models.post)
  }

  user.prototype.validPassword = function(typedInPassword) {
    // determine if the password typed in hashes to the same thing as the existing hash
    let correctPassword = bcrypt.compareSync(typedInPassword, this.password)

    // return the (boolean) result of the comparison
    return correctPassword
  }

  return user;
};