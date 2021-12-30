const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: '*',
    }
});


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

app.use(express.static("./../public"));

let PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));