const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const newRepository = {
    id: uuid(), 
    title: request.body.title, 
    url: request.body.url, 
    techs: request.body.techs, 
    likes: 0
  };

  repositories.push(newRepository);
  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex((item) => item.id === id);

  if (repoIndex < 0) {
    return response.status(400).json();
  }

  const repository = {
    id,
    title: request.body.title, 
    url: request.body.url, 
    techs: request.body.techs, 
    likes: repositories[repoIndex].likes
  }

  repositories[repoIndex] = repository;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex((item) => item.id === id);

  if (repoIndex < 0) {
    return response.status(400).json();
  }

  repositories.splice(repoIndex, 1);
  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex((item) => item.id === id);

  if (repoIndex < 0) {
    return response.status(400).json();
  }

  repositories[repoIndex].likes += 1;
  return response.json({ likes } = repositories[repoIndex]);
});

module.exports = app;
