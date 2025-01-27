const express = require("express")
const Actions = require("./actions-model")

const {
  validateActionId,
  validateAction
} = require("./actions-middlware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then(act => {
      res.status(200).json(act);
    })
    .catch(err => {
      next(err)
    })
})

router.get("/:id", validateActionId, (req, res) => {
  res.json(req.action)
})

router.post("/", validateAction, async (req, res, next) => {
  try{
    const nwAct = await Actions.insert({
      project_id: req.project_id,
      description: req.description,
      notes: req.notes,
      completed: req.completed
    })
    res.status(201).json(nwAct)
  }catch (err) {
    next(err)
  }
})

router.delete("/:id", validateActionId, async (req, res, next) => {
  try{
    await Actions.remove(req.params.id)
    res.json(req.action)
  }catch(err){
    next(err)
  }
})

router.put("/:id", validateAction, validateActionId, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then(() => {
      return Actions.get(req.params.id)
    })
    .then(act => {
      res.json(act)
    })
    .catch(err => {
      next(err)
    })
})

router.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = router
