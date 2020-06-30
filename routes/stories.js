const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const storiesController = require('../controller/story');

router.get('/add', ensureAuth,storiesController.addStories);

router.post('/', ensureAuth, storiesController.postStories);

router.get('/', ensureAuth ,storiesController.getPublicStories);

module.exports = router ; 