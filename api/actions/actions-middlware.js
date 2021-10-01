const Action = require("./actions-model");

async function validateActionId (req, res, next){
  try{
    const act = await Action.get(req.params.id)
    if(!act){
      res.status(404).json({
        message: "can not find action"
      })
    }else{
      req.action = act;
      next();
    }
  }catch(err){
    next(err)
  }
}

function validateAction (req, res, next){
  const {id, description, notes} = req.body;
  if(!id || !description || !description.trim() || !notes || !notes.trim()){
    res.status(400).json({
      message: "missing either id, notes, or description"
    })
  }else{
    req.project_id = id
    req.description = description.trim()
    req.notes = notes.trim()
    next()
  }
}

module.exports = {
  validateActionId,
  validateAction
}