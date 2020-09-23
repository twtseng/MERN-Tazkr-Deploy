
const { User } = require('../models/user.model');

const getOrCreateUser = async (oauth_source, oauth_id, username, email) => {
    try {
        console.log(`getOrCreateUser: oauth_source=${oauth_source} oauth_id=${oauth_id}, looking for user`);
        let user = await User.findOne({ oauth_source: oauth_source, oauth_id: oauth_id });
        if (user === null) {
            console.log(`getOrCreateUser: user not found. Creating user`);
            user = await User.create({ oauth_source: oauth_source, oauth_id: oauth_id, username: username, email: email });
            console.log(`getOrCreateUser: Created user ${user}`);
        } else {
            console.log(`getOrCreateUser: user found: ${user}`);
        }
        return user;
    } catch (err) {
        throw err;
    }
}

module.exports.twitter = (req,res) => {
    const io = req.app.get('io');
    const user = {
        name: req.user.username,
        //photo: req.user.photos[0].value.replace(/_normal/,'')
    }
    io.in(req.session.socketId).emit('twitter', user);
    res.end();
}

module.exports.google = async (req,res) => {
    try {
        const io = req.app.get('io');
        const user = await getOrCreateUser(
            oauth_source='google', 
            oauth_id = req.user.id, 
            username = req.user.displayName ? req.user.displayName : "BLANK_GOOGLE_USERNAME", 
            email = req.user.email ? req.user.email : "BLANK_GOOGLE_EMAIL"
            );

        io.in(req.session.socketId).emit('google',user);
        res.end();
    } catch(err) {
        resp.status(400).json(err);
    }
}

module.exports.facebook = (req,res) => {
    const io = req.app.get('io');
    const {givenName,familyName} = req.user.name;
    const user = {
        name: `${givenName} ${familyName}`,
        //photo: req.user.photos[0].value
    }
    io.in(req.session.socketId).emit('facebook',user);
    res.end();
}

module.exports.github = (req,res) => {
    const io = req.app.get('io');
    const user = {
        name: req.user.username,
        //photo: req.user.photos[0].value
    }
    io.in(req.session.socketId).emit('github',user);
    res.end();
}