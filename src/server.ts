import "dotenv/config";

import express from "express";
import http from "http";
import cors from "cors";

import { Server } from "socket.io";
import { router } from "./routes";

const app = express();

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
});

app.use(cors());
app.use(express.json());
app.use(router);

io.on("connection", (socket) => {
  console.log(`Usuário conectado no Socket - ${socket.id}`);
})

app.get("/github", (request, response) => {
  return response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
});

app.get("/signin/callback", (request, response) => {
  const {
    code
  } = request.query;

  return response.json(code);
});

export { serverHttp, io };