const express = require("express");
const server = express();

const users = [
  { id: 1, name: "William", email: "teste@gmail.com" },
  { id: 23, name: "GG", email: "teste@gmail.com" },
  { id: 6, name: "Diego", email: "teste@gmail.com" },
  { id: 12, name: "Mayk", email: "teste@gmail.com" },
];

server.use(express.json());

server.use((req, res, next) => {
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  return next();
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }
  return next();
}

function checkUserInArray(req, res, next) {
  const { id } = req.params;
  const user = users.find((user) => user.id == id);

  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }
  req.user = user;

  return next();
}

server.get("/users", (req, res) => res.json(users));

server.get("/users/:id", checkUserInArray, (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id == id);

  return res.status(200).json(user);
});

server.post("/users", checkUserInArray, checkUserExists, (req, res) => {
  const { id, name, email } = req.body;
  const user = {
    id,
    name,
    email,
  };
  users.push(user);

  return res.status(201).json(user);
});

server.put("/users/:id", checkUserInArray, checkUserExists, (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = users.find((user) => user.id == id);

  user.name = name;
  user.email = email;

  return res.status(200).json(user);
});

server.delete("/users/:id", checkUserInArray, (req, res) => {
  const { id } = req.params;
  const user = users.findIndex((user) => user.id == id);

  users.splice(user, 1);

  return res.status(200).json("Usuario Deletado com Sucesso!!");
});

server.listen(3000, () => console.log("Started Server"));
