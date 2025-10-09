import express, { request, response } from "express";

const app = express();
app.use(express.json());

const users = [];

app.get("/usuario", (request, response) => {
  response.json(users);
});

app.post("/usuario", (request, response) => {
  response.send("Ok deu Bom no Post");
  console.log(request.body);
  users.push(request.body);
});

app.listen(3000);
