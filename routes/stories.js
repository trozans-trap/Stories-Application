const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const storiesController = require('../controller/story');
const { route } = require('.');

router.get('/add', ensureAuth,storiesController.addStories);

router.post('/', ensureAuth, storiesController.postStories);

router.get('/', ensureAuth ,storiesController.getPublicStories);

router.get('/:id', ensureAuth, storiesController.readFullStory);

router.get('/edit/:id', ensureAuth, storiesController.getEditStory);

router.put('/:id', ensureAuth, storiesController.updateStory);

router.delete('/:id', ensureAuth, storiesController.deleteStory);

module.exports = router ; 