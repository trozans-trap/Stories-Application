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

exports.getPublicStories = async (req,res) => {
    console.log(req.user)
    try{
        const stories = await Story.find({status: 'public'})
           .populate('user')
           .sort({ createdAt: 'desc'})
           .lean();

        res.render('stories/viewall',{
            stories
        });

    } catch(err){
        console.error(err);
        res.render('error/500');
    }
}