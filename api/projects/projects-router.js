const express = require("express");
const Projects = require("./projects-model");

const {
  validateProjectId,
  validateProject
} = require("./projects-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then(proj => {
      res.status(200).json(proj)
    })
    .catch(next)
})

router.get("/:id", validateProjectId, (req, res) => {
  res.json(req.project)
})

router.post("/:id", validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then(nProj => {
      res.status(201).json(nProj)
    })
    .catch(next())
})

router.put("/:id", validateProjectId, validateProject, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then(proj => {
      res.status(200).json(proj)
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
})

router.delete("/:id", validateProjectId, async (req, res) => {
  try{
    await Projects.remove(req.params.id)
    res.status(200).json(req.project)
  }catch(err){
    res.status(404).json({
      message: err.message
    })
  }
})

router.get("/:id/actions", validateProjectId, async (req, res, next) => {
  try{
    const act = await Projects.getProjectActions(req.params.id);
    res.status(200).json(act);
  }catch(err){
    res.status(500).json(err)
    next(err)
  }
})

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    message: "your code is in pain",
    err: err.message,
    stack: err.stack
  })
})

module.exports = router;
