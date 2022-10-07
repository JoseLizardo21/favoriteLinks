const express = require('express');
const router = express.Router();

const passport = require('passport');
const {isLoggedIn, isNotLogedIn} = require('../lib/auth');

router.get('/signup',isNotLogedIn, (req,res)=>{
    res.render('auth/signup');
});
router.post('/signup',isNotLogedIn, passport.authenticate('local.signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
}));

router.get('/signin', isNotLogedIn, (req,res)=>{
    res.render('auth/signin');
});

router.post('/signin', isNotLogedIn, (req, res, next)=>{
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true   
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})

router.get('/logout',  isLoggedIn, function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/profile');
    });
});

module.exports = router;