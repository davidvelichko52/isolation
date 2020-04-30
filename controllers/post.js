let router = require('express').Router()
let moment = require('moment')
let adminLogin = require('./middleware/adminLogin')
let userLogin = require('./middleware/userLogin')
let db = require('../models')
let async = require('async')
const axios = require('axios')


router.use(userLogin)


router.get('/', (req, res) => {
    db.post.findAll({
        include: [ db.tag ]
      })
      .then(posts => {
        
        res.render('post/allPost', { posts: posts })
        
      })
      .catch(err => {
        console.log(err)
        res.send('Error')
      })
  })






module.exports = router