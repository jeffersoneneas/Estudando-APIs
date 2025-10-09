import express, { request, response } from "express";
import { PrismaClient } from "./generated/prisma/client.js";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/usuario", async (request, response) => {
  let users = [];

  if (request.query) {
    users = await prisma.user.findMany({
      where: {
        id: request.query.id,
        name: request.query.name,
        age: request.query.age,
        email: request.query.email,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }

  response.status(200).json(users);
});

app.post("/usuario", async (request, response) => {
  response.status(201).json({ message: "Usuário Criado com Sucesso!" });
  await prisma.user.create({
    data: {
      email: request.body.email,
      name: request.body.name,
      age: request.body.age,
    },
  });
});

app.patch("/usuario/:id", async (request, response) => {
  response.status(200).json({ message: "Usuário Atualizado com Sucesso!" });
  await prisma.user.update({
    where: {
      id: request.params.id,
    },
    data: {
      email: request.body.email,
      name: request.body.name,
      age: request.body.age,
    },
  });
});

app.delete("/usuario/:id", async (request, response) => {
  response.status(200).json({ message: "Usuário Deletado com Sucesso!" });
  await prisma.user.delete({
    where: {
      id: request.params.id,
    },
  });
});

app.listen(3000);
