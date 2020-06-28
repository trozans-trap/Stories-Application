exports.dashboard = async (req,res) => {
    console.debug(req.user);
    res.render('dashboard',{
        name: req.user.firstName,
    });
}