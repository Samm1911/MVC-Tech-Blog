// import router, blog model and withAuth helper
const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// post new blog, if logged in
router.post('/', withAuth, async (req, res) => {
    try {
        // new Blog create with currents sessions user_id
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
// new Blog created
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update blog based on id, also just when authenticated
router.put('/:id', withAuth, async (req, res) => {
    try {
        // updated blog based on request body
        const updatedBlog = await Blog.update(
            {
                ...req.body
            }, 
            {
                // update based on blog id and based on user_id
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            } );
            // blog updated
            res.status(200).json(updatedBlog);
        } catch (err) {
            res.status(500).json(err);
        }
});

// delete blog based id, just when authenticated
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // find blog based on id and current user id and delete
        const deletedBlog = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        // give error, if not your blog
        if(!deletedBlog) {
            res.status(403).json({ message: "You don't have permission to delete this blog post." });
            return;
        }

        // success status
        res.status(200).json({ message: 'Blog post deleted successfully.' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
