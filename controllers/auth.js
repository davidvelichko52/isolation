// Node Modules/Variables
let router = require('express').Router()
let db = require('../models')
let passport = require('../config/passportConfig')

// Routes
router.get('/login', (req, res) => {
    res.render('auth/login')
})

// POST /auth/login - this is a place for the login form to post to
router.post('/login', passport.authenticate('local', {
    successFlash: 'Successful Login - Welcome Back!',
    successRedirect: '/profile/user',
    failureFlash: 'Invalid Credentials',
    failureRedirect: '/auth/login'
}))

//get auth/signup - this is to render the signup form
router.get('/signup', (req, res) => {
    res.render('auth/signup', { data: {} })
})


router.post('/signup', (req, res, next) => {
    if (req.body.password !== req.body.password_verify) {
        req.flash('error', 'Passwords does not match!')

        res.render('auth/signup', { data: req.body, alerts: req.flash() })
    }else{
        // passwords matched, now we'll find/create by the users email
        db.user.findOrCreate({
            where: { email: req.body.email },
            defaults: req.body
        })
        .then(([user, wasCreated]) => {
            if(wasCreated) {
                // Good - this was expected
                // auto-login with passport
                passport.authenticate('local', {
                    successFlash: 'Successful Login - Welcome!',
                    successRedirect: '/profile/user',
                    failureFlash: 'Invalid Credentials',
                    failureRedirect: '/auth/login'
                })(req, res, next)
            } else {
                //bad - this person had an account other that email{redirect them to login}
                req.flash('error', 'Account already exisits')
                res.redirect('/auth/login')
            }
        })
        .catch(err => {
            console.log('ERROR creating a user', err)

            //check for sequelize validation errore (and make flash message for them)
            if (err.errors) {
                err.errors.forEach(e => {  
                    if(e.type == 'Validation error') {
                        req.flash('error', e.message)
                    }
                })
            }
            else {
                req.flash('error', 'Server error')
            }

            //redirect back to sign up
            res.redirect('/auth/signup')
        })
    }
    
})
router.get('/logout', (req, res) => {
    // remove user data from session
    req.logout()
    req.flash('success', 'BYE BYE! 👋✌️')
    res.redirect('/')
})

// Export (allow me to include this in another page)
module.exports = router