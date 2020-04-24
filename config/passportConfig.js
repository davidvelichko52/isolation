// require environment variables
require('dotenv').config()

let passport = require('passport')

//require any staratigies
let LocalStrategy = require('passport-local').Strategy

// import a refrence to db
let db = require('../models')

// serialozation and deserialization function
//there are for passport to use in order to store/lookup the user info
// serialize: reduce a user object to just its id field

passport.serializeUser((user, done) => {
    //call the callback function with user id as an argument
    // done(error, id) - pass a null if no error
    done(null, user.id)
})
// deseriallize: reverse serialize
// take user id and return the full user object
passport.deserializeUser((id, done) => {
    db.user.findByPk(id)
    .then(user => {
        done(null, user)
    })
    .catch(done)
})

//local strategy using a database the wem anage ourselves
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    // try looking up the user by their email
    db.user.findOne({
        where : { email: email }
    })
    .then(foundUser => {
        console.log('foundUser', email, password)
        // check if there is a user; also if yes, check password
        if (foundUser && foundUser.validPassword(password)) {
            // Good - user exists and password is correct
            done(null, foundUser)
        }
        else {
            // bad - useer dosent exist Or had bad password
            done(null, null)
        }
    })
    .catch(done)
}))

// include file into other files
module.exports = passport