const router = require('express').Router();
const post = require('./routes/posts');
const user = require('./routes/auth.routes');

router.use('/posts', post);
router.use('/users', user);

module.exports = router;
