let router = require('express').Router()
let moment = require('moment')
let adminLogin = require('./middleware/adminLogin')
let userLogin = require('./middleware/userLogin')
let db = require('../models')
let async = require('async')
const axios = require('axios')






//custom middleware thta is only applied to the routes in this file!
router.use(userLogin)


router.get('/user',(req, res) => {
    db.post.findAll({
      include: [ db.tag ]
    })
    .then(posts => {
      
      res.render('profile/user', { posts: posts })
      
    })
    .catch(err => {
      console.log(err)
      res.send('Error')
    })
})

router.put('/user/user/edit', (req, res) => {

  db.post.update(
      req.body,
      { where: { id: req.params.id } }
  )
  .then(() =>{
      res.redirect('/profile' + req.params.id)
  })
  .catch(err => {
      console(err)
      res.render('error')
  })
})

router.delete('/user', (req, res) => {
  db.tagsPosts.destroy({
      where: { postId: req.body.postId }
  })
  .then(() => {
      // Things worked-players on that team are gone
      // Safe to delete the team now
      db.post.destroy({
          where: { id: req.body.postId }
      })
      .then(() => {
          res.redirect('/profile/user')
      })
      .catch(err => {
          console.log(err)
          res.render('error')
      })
      // End of inner query
  })
  .catch(err => {
      console.log(err)
      res.render('error')
  })
})


router.post('/user', (req, res) => {
    let tags = []
    if(req.body.tagName){
      tags = req.body.tagName.split(',')
    }
    db.post.create({
      userId: req.body.userId,
      content: req.body.content,
    })
    .then((post) => {
      async.forEach(tags, (tag, done) => {
        db.tag.findOrCreate({  where: {tagName: tag.trim()}
        })
        .then(([tag, wasCreated]) => {
          post.addTag(tag)
          .then(() => {
           done()
          })
          .catch((error) => {
            console.log(error)
            done()
          })
        })
        .catch((error) => {
          console.log(error)
          done()
          res.status(400).render('main/404')
        })
      },
      () => {
        res.redirect('/profile/user')
      }) //end of async function
    }) // end of then for the project create
  })


router.get('/addPost',(req, res) => {
    res.render('profile/newPost', {moment})
})


router.get('/getAJoke', function(req, res) {
    var jokeurl = 'https://official-joke-api.appspot.com/jokes/random';
    // Use request to call the API
    axios.get(jokeurl).then( function(apiResponse) {
      var joke = apiResponse.data
      
      res.render('profile/joke', { joke: joke });
    })
})



module.exports = router