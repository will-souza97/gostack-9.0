const express = require("express");
const server = express();

const projects = [
  { id: 8, title: "New Project", tasks: [] },
  { id: 2, title: "New Project", tasks: [] },
  { id: 5, title: "New Project", tasks: [] },
  { id: 1, title: "New Project", tasks: [] },
];

server.use(express.json());

// GET
server.get("/projects", (req, res) => res.json(projects));

server.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  const project = projects.find((project) => project.id == id);

  return res.status(200).json(project);
});

// POST
server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: [],
  };
  projects.push(project);

  return res.status(201).json(project);
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.status(201).json(project);
});

// PUT
server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find((project) => project.id == id);

  project.title = title;

  return res.status(200).json(project);
});

// DELETE
server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  const project = projects.findIndex((project) => project.id == id);

  projects.splice(project, 1);

  return res.status(200).json("Projeto Deletado com Sucesso!!");
});

server.listen(5000);
