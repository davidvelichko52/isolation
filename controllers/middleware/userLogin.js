module.exports = (req, res, next) => {
        if (req.user) {
            // good they are logged in
            next()
        } 
        else {
            // bad they are not logged in!
            req.flash('error', 'You must be logged in to view that page')
            res.redirect('/auth/login')
        }
    
    }
