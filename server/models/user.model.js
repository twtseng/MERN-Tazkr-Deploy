const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true,"username is required"],
        minlength: [3,"username must be at least 3 characters"],
    },
    email : {
        type: String,
        required: [true,"Email is required"],
        minlength: [5,"Email must be at least 5 characters"]
    },
    description : {
        type: String,
        default: ""
    },
    oauth_source: {
        type: String,
        required: [true, "oauth_source field is required"]
    },
    oauth_id: {
        type: String,
        required: [true, "oauth_id field is required"]
    },
    avatar: {
        type: String,
        default: "https://rpg-cify0074508w.netdna-ssl.com/wp-content/uploads/2020/02/service_default_avatar_182956.png"
    }
}, {timestamps : true});

module.exports.User = mongoose.model('User', UserSchema);