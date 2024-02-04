const router = require('express').Router();
// get the api and homeroutes in the right folder or file
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// use the homeroutes and the api routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;

