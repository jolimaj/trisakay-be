require("dotenv").config({});

const express = require("express");
const compression = require("compression");
const useragent = require("express-useragent");
const helmet = require("helmet");
const cors = require("cors");
const { okResp, errResp } = require("./Common/Response/Response");

require("./Common/database");

const app = express();
const http = require("http").Server(app);
//const io = require("socket.io")(http);

app.use(helmet());
app.use(compression());
app.use(useragent.express());
// app.use(cors({
//   origin: [`http://localhost:${process.env.PORT || 3000}`]
// }))
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.success = (status, responseCodes, data) => {
    const output = okResp(status, responseCodes, data);
    res.status(status).json(output);
  };
  res.error = (status, responseCodes, data) => {
    const output = errResp(status, responseCodes, data);
    res.status(status).json(output);
  };
  next();
});
if (process.env.NODE_ENV === "development") {
  const session = require("express-session");

  app.use(
    session({
      secret: "secret_token",
      resave: true,
      saveUninitialized: true,
      cookie: {},
    })
  );
}

app.use("/", require("./routes"));

app.use("*", (req, res) => {
  res.status(404).send("Not Found.");
});

// io.on("connection", function (socket) {
//   console.log("A user is connected");

//   socket.on("message", (message) => {
//     console.log(`message from ${socket.id} : ${message}`);
//   });

//   socket.on("disconnect", () => {
//     console.log(`socket ${socket.id} disconnected`);
//   });
// });

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on http://localhost:${process.env.PORT || 3000}`);
});

// const io = require("socket.io")(http, {
//   path: "/pathToConnection",
// });
// let users = {};
// io.on("connection", (socket) => {
//   let userId = socket.handshake.query.userId; // GET USER ID

//   // CHECK IS USER EXHIST
//   if (!users[userId]) users[userId] = [];

//   // PUSH SOCKET ID FOR PARTICULAR USER ID
//   users[userId].push(socket.id);

//   // USER IS ONLINE BROAD CAST TO ALL CONNECTED USERS
//   io.sockets.emit("online", userId);
//   console.log(userId, "Is Online!", socket.id);

//   // DISCONNECT EVENT
//   socket.on("disconnect", (reason) => {
//     // REMOVE FROM SOCKET USERS
//     _.remove(users[userId], (u) => u === socket.id);
//     if (users[userId].length === 0) {
//       // ISER IS OFFLINE BROAD CAST TO ALL CONNECTED USERS
//       io.sockets.emit("offline", userId);
//       // REMOVE OBJECT
//       delete users[userId];
//     }

//     socket.disconnect(); // DISCONNECT SOCKET

//     console.log(userId, "Is Offline!", socket.id);
//   });
// });
