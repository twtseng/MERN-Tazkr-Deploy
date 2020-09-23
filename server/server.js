const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const session = require('express-session');
//const port = 8000;

require('./config/mongoose.config');

app.use(cors(),express.urlencoded({extended:true}),express.json(),passport.initialize(),passport.session());
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
}));

require('./config/passport.config')();
require('./routes/user.routes')(app);
require('./routes/board.routes')(app);
require('./routes/task.routes')(app);
require('./routes/column.routes')(app);
require('./routes/oauth.routes')(app);

app.set('port', process.env.PORT || 8000);
console.log("++++++++++++++++" + app.get('port'));
app.use(express.static('../client/build'));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build",     
    "index.html"));
 });

const server = app.listen(app.get('port'),() => console.log(`Listening on port ${app.get('port')}`));
const io = require("socket.io")(server);
app.set('io',io);

io.on("connection", socket => {
    socket.on("event_from_client", data => {
        socket.broadcast.emit("send_data_to_all_other_clients",data);
    });
});