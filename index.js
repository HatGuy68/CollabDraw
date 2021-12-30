const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

connections = [];

io.on('connect', (socket) => {
    connections.push(socket);
    console.log(`${socket.id} has connected`);

    socket.on("propogate", (data) => {
        connections.map((con) => {
            if (con.id !== socket.id) {
                con.emit("onpropogate", data);
            }
        });
    });

    socket.on("down", (data) => {
        connections.map((con) => {
            if (con.id !== socket.id) {
                con.emit("ondown", data);
            }
        });
    });

    socket.on('disconnect', (reason) => {
        console.log(`${socket.id} has disconnected`);
        connections = connections.filter(conn => conn.id !== socket.id)
    })
})

app.use(express.static("public"));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

let PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));