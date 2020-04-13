const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

var repositories = [];

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

  repositories = [...repositories, newRepository];
  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  var repository = repositories.find((item) => item.id == request.params.id);

  if (repository === undefined) {
    return response.status(400).json();
  }

  repository = {
    ...repository, 
    title: request.body.title, 
    url: request.body.url, 
    techs: request.body.techs, 
  }

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  var repository = repositories.find((item) => item.id == request.params.id);

  if (repository === undefined) {
    return response.status(400).json();
  }

  repositories = repositories.filter((item) => item.id != request.params.id);
  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  var repository = repositories.find((item) => item.id == request.params.id);

  if (repository === undefined) {
    return response.status(400).json();
  }

  repository = {
    ...repository, 
    likes: ++repository.likes
  }

  console.log(repository);

  return response.json(repository);
});

module.exports = app;
