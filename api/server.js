const express = require('express');
const helmet = require("helmet")
const cors = require("cors")

const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router")

const server = express();

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

module.exports = server;
