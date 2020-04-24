let router = require('express').Router()
let moment = require('moment')
let adminLogin = require('./middleware/adminLogin')
let userLogin = require('./middleware/userLogin')
let db = require('../models')




//custom middleware thta is only applied to the routes in this file!
router.use(userLogin)

router.get('/user',(req, res) => {
    res.render('profile/user', {moment})
})


router.get('/guest/:id', (req, res) => {
    db.user.findByPk(req.params.id)
    .then(userProfile => {
        res.render('profile/guest', { moment, userProfile })
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

// get /profile/admin -a apecial profile admins
//note protect this route from user who are logged in and
// user who are not admis


router.get('/admin', adminLogin, (req, res) => {
    db.user.findAll()
    .then(users => {

        res.render('profile/admin', { moment, users })
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

module.exports = router