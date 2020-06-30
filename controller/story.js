const Story = require('../modals/story');

exports.addStories = async (req,res) => {
    res.render('stories/add')
}

exports.postStories = async (req,res) => {
    try {
        req.body.user = req.user.id;
        await Story.create(req.body);
        res.redirect('/dashboard');

    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
}