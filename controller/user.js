

exports.login = async (req,res) => {
    res.render('login',{
        layout:'login',
    });
}