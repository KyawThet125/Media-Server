require('dotenv').config()
let express = require('express');
app = express();
path = require('path')
hogan = require('hogan-express');
server = require('http').createServer(app);
io = require('socket.io').listen(server);

app.engine('html', hogan);
app.set('view engine', 'html')
app.use(express.static(path.join(__dirname, 'asset')));

app.get('/', (req, resp) => {
    resp.render('index');
})
let usermap = new Map();
let room1 = "public";
let room2 = "private";

io.sockets.on('connection', (socket) => {
    socket.on("login", uname => {
        socket.username = uname;
        usermap.set(socket.username, socket.id);
        if (uname == "w" || uname == "x")
        {
            socket.join(room1);
            socket.userroom = room1;
        } else
        {
            socket.join(room2);
            socket.userroom = room2;
        }
        socket.emit("login-success", true);
    });
    socket.on("msg", data => {
        io.in(socket.userroom).emit("income-msg", socket.username + " : " + data);
    });
});


server.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
})

