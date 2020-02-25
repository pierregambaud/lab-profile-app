const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");


router.post("/login", (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
        res.status(500).json({ message: 'Something went wrong authenticating user' });
        return;
    }

    if (!theUser) {
        res.status(401).json(failureDetails);
        return;
    }

    req.login(theUser, (err) => {
        if (err) {
            res.status(500).json({ message: 'Session save went bad.' });
            return;
        }

        res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post('/signup', (req, res, next) => {
  const { username, password, campus, course } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  if(password.length < 7){
      res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
      return;
  }

  User.findOne({ username }, (err, foundUser) => {

      if(err){
          res.status(500).json({message: "Username check went bad."});
          return;
      }

      if (foundUser) {
          res.status(400).json({ message: 'Username taken. Choose another one.' });
          return;
      }

      const salt     = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewUser = new User({
          username,
          password: hashPass,
          campus,
          course
      });

      aNewUser.save(err => {
          if (err) {
              res.status(400).json({ message: 'Saving user to database went wrong.' });
              return;
          }
          
          // Automatically log in user after sign up
          // .login() here is actually predefined passport method
          req.login(aNewUser, (err) => {

              if (err) {
                  res.status(500).json({ message: 'Login after signup went bad.' });
                  return;
              }
          
              // Send the user's information to the frontend
              // We can use also: res.status(200).json(req.user);
              res.status(200).json(aNewUser);
          });
      });
  });
});

router.post('/edit', (req, res, next) => {
  const { username, campus, course } = req.body;
  
  if (!username || !campus || !course ) {
    res.status(400).json({ message: 'Provide username, campus and course' });
    return;
  }

  User.findOneAndUpdate({ username }, 
    {
      $set: {
        campus,
        course
      }
    },{
      new: true
    }
  )
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(err => res.status(400).json({ message: `Saving user to database went wrong. ${err}` }))
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

router.get("/loggedin", (req, res) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }

  res.status(403).json({ message: 'Unauthorized' });
});

module.exports = router;
