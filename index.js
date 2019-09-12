const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

const PORT = process.env.PORT || 4040;
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
//app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


app.get("/", (req, res) => {
  res.send("index");
});

io.on("connection", socket => {
  console.log("New User Joined");

  socket.on("chat message", msg => {
    console.log("New Message: ", msg);
    io.emit("chat message", msg);
    console.log("Msg Emitted");
  });
  socket.on('disconnect',()=>{
    console.log('User Disconnected')
  })
});

server.listen(PORT, () => {
  console.log("Server Running at: ", PORT);
});
