const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all the current blogs from the db
router.get('/', async (req, res) => {
    try {
        // findall the blogs
        const blogData = await Blog.findAll({
            include: [
                {
                    // include the usermodel, just the username
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // create an array with the blogData and pass in each project with the requested data
        const blogs = blogData.map((project) => project.get({ plain: true }));

        // render the homepage with the blogs and the login value
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get each blog just if logged in
router.get('/blogs/:id', withAuth, async (req, res) => {
    try {
        // get the blog by the primary key, which is the blog id
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    // include the username of the user model
                    model: User,
                    attributes: ['username']
                },
                {
                    // get the comments for the specific blogpost
                    model: Comment,
                    include: [
                        {
                            // and also the specific username for the comment
                            model: User,
                            attributes: ['username']
                        }
                    ]
                }
            ],
        });

        // get the blogData of one blog with the requested values
        const blog = blogData.get({ plain: true });

        // render specific blog in the blog.handlebars and in the logged_in session
        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// the dashboard route displays the blogs of the current user with authentifications
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // find user by primary key
        const userData = await User.findByPk(req.session.user_id, {
            include: [
                {
                    // include the blog and the user model, with the username
                    model: Blog,
                    include: {
                        model: User,
                        as: 'user',
                        attributes: ['username'],
                    }
                }
            ],
        });

        // get the user 
        const users = userData.get({ plain: true });

        // render the users blogs and the logged_in session
        res.render('dashboard', {
            ...users,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// route for the newBlog creation when logged_in
router.get('/newBlog', withAuth, async (req, res) => {
    try {
        // render the newBlog page
        res.render('newBlog', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.json(err);
    }
});

// edit blog based on id, with Authentification
router.get('/editBlog/:id', withAuth, async (req, res) => {
    try {
        // get blogData of the clicked blog
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    // include the users username
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // get the requested blogdata
        const blog = blogData.get({ plain: true });
        // render the editblog page
        res.render('editBlog', {
            // use blogdata, the logged_in session and the blog id to edit specific blog
            ...blog,
            logged_in: req.session.logged_in,
            blod_id: blog.id,
        });
    } catch (err) {
        res.json(err)
    }
})

// get the login route
router.get('/login', (req, res) => {
    // once logged in redirect to dashboard
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    // render the login page
    res.render('login');
});

// get the logout route
router.get('/logout', (req, res) => {
    // if session is logged in, the session will be destroyed and user is logged out
    if (req.session.logged_in) {
        req.session.destroy();
    }
    // redirect user after logout to the homepage
     res.redirect('/');
})

// signup route
router.get('/signup', (req, res) => {
    // render the signup page
    res.render('signup');
});

module.exports = router;