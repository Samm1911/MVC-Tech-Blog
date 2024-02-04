const router = require('express').Router();
const { User } = require('../../models');


// login route to authenticate user
router.post('/login', async (req, res) => {
    try {
        // find user based on username
        const userData = await User.findOne({ where: { username: req.body.username} });

        if (!userData) {
            // if user not found 
            res 
              .status(400)
              .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        // check for the password in the userData, check for the password in the response body
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            // if incorrect password
          res
            .status(400)
            .json({ message: 'Incorrect username or password, please try again' });
          return;
        }

        req.session.save(() => {
            // save the sessions userid and save user as logged in
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            // user is successfully logged in
            res.json({ user: userData, message: 'You are now logged in!' });
        });
        // error
    } catch (err) {
        res.status(400).json(err);
    }
});

// signup route
router.post('/signup', async (req, res) => {
    try {
        // takes username and password and creates a new user
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        
        // save userId and loggedIn value for the session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            // success
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;