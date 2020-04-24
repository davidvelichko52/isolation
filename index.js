/***********************
 * NODE MODULES
 ***********************/
// Require needed modules
require('dotenv').config()

let express = require('express')
let flash = require('connect-flash')
let layouts = require('express-ejs-layouts')
let session = require('express-session')
// Create an app instance
let app = express()

// inclde passport (via the passport config file)
let passport = require('./config/passportConfig')

/***********************
 * SETTINGS / MIDDLEWARE
 ***********************/
// Set template lang to EJS
app.set('view engine', 'ejs')

// Tell express to use the layouts module
app.use(layouts)

// Set up the static folder
app.use(express.static('static'))

// Decrypt the variables coming in via POST routes (from forms)
app.use(express.urlencoded({ extended: false }))


// set upsessions

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// set up connect flash for alert messages
app.use(flash())

// set up passport (depends on seeion; must come after it)
app.use(passport.initialize())
app.use(passport.session())

//custom midleware -make certin variables available
app.use((req, res, next) => {
    res.locals.alerts = req.flash()
    res.locals.user = req.user
    next()
})

/***********************
 * ROUTES
 ***********************/
// Controllers
app.use('/auth', require('./controllers/auth'))
app.use('/profile', require('./controllers/profile'))

// Create a home page route
app.get('/', (req, res) => {
    res.render('home')
})

// Create a wildcard (catch-all)
app.get('*', (req, res) => {
    res.render('error')
})

/***********************
 * LISTEN
 ***********************/
// Pick a port to listen on
app.listen(3000)