const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);


app.use(express.static("public"));

let PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));