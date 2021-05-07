const router = require('express').Router();
const post = require('./routes/posts');

router.use('/posts', post);

module.exports = router;