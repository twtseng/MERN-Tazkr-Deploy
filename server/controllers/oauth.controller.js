module.exports.twitter = (req,res) => {
    const io = req.app.get('io');
    const user = {
        name: req.user.username,
        photo: req.user.photos[0].value.replace(/_normal/,'')
    }
    io.in(req.session.socketId).emit('twitter', user);
}

module.exports.google = (req,res) => {
    const io = req.app.get('io');
    const user = {
        name: req.user.displayName,
    }
    io.in(req.session.socketId).emit('google',user);
}

module.exports.facebook = (req,res) => {
    const io = req.app.get('io');
    const {givenName,familyName} = req.user.name;
    const user = {
        name: `${givenName} ${familyName}`,
        photo: req.user.photos[0].value
    }
    io.in(req.session.socketId).emit('facebook',user);
}

module.exports.github = (req,res) => {
    const io = req.app.get('io');
    const user = {
        name: req.user.username,
        phot: req.user.photos[0].value
    }
    io.in(req.session.socketId).emit('github',user);
}