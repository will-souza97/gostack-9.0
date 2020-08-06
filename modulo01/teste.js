const express = require("express");
const server = express();

server.use(express.json());

server.get("/teste/:id", (req, res) => {
  const { id } = req.params;
  return res.status(200).json({ msg: `Procurando o Usuario ${id}` });
});

server.listen(3000);
