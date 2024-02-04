// import router, Comment, and withAuth helper
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// post a new comment, with authentification to the comment route
router.post('/', withAuth, async (req, res) => {
    try {
        // get the response body, the current user id and the current blog id
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            blog_id: req.body.blog_id,
        });
        // new comment posted
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
})

// export router
module.exports = router;
