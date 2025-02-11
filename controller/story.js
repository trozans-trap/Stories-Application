const Story = require('../modals/story');

exports.addStories = async (req, res) => {
    res.render('stories/add')
}

exports.postStories = async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Story.create(req.body);
        res.redirect('/dashboard');

    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
}

exports.getPublicStories = async (req, res) => {
    console.log(req.user)
    try {
        const stories = await Story.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean();

        res.render('stories/viewall', {
            stories
        });

    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
}

exports.readFullStory = async (req,res)=>{
    try{
        let story = await Story.findById(req.params.id)
          .populate('user')
          .lean()

        if (!story) {
            return res.render('error/404');
        }

        res.render('stories/show',{
            story
        })

    } catch(err){
        console.error(err);
        res.render('error/404');
    }
}

exports.moreFromUser = async (req,res)=>{
    try{
      const stories = await Story.find({
          user: req.params.userId,
          status: 'public',
      })
       .populate('user')
       .lean()

       res.render('stories/viewall',{
           stories
       })
    } catch(err){
          console.error(err);
          res.render('error/500')
    }

}

exports.getEditStory = async (req, res) => {
    const story = await Story.findOne({
        _id: req.params.id
    }).lean()

    if (!story) {
        return res.render('error/404');
    }

    if (story.user != req.user.id) {
        res.redirect('/stories')
    } else {
        res.render('stories/edit', {
            story
        })
    }
}

exports.updateStory = async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean()

        if (!story) {
            return res.render('error/404')
        }

        if (story.user != req.user.id) {
            res.redirect('/stories');
        } else {
            story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
            });

            res.redirect('/dashboard')
        }

    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
}

exports.deleteStory = async (req, res) => {
    try {
        await Story.remove({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
}