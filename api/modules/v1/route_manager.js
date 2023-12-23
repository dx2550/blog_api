const express = require('express');

const router = express.Router();

const middleware = require('../../middleware/headervalidator');

const auth = require('./auth/auth_routes')
const blog = require('./blog/blog_routes')

router.use('/', middleware.validateHeaderToken);

router.use(auth)
router.use(blog)

module.exports = router;
