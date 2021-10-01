const Project = require("./projects-model");

async function validateProjectId (req, res, next){
  try{
    const proj = await Project.get(req.params.id)
    if(!proj){
      res.status(404).json({
        message: "can not find project"
      })
    }else{
      req.project = proj;
      next();
    }
  }catch(err){
    next(err)
  }
}

function validateProject (req, res, next){
  const {name, description, completed} = req.body;
  if(!name || !name.trim() || !description || !description.trim()){
    next(res.status(400).json({
      message: "missing either name or description"
    }))
  }else{
    req.name = name.trim()
    req.description = description.trim()
    req.completed = completed
    next()
  }
}

module.exports = {
  validateProjectId,
  validateProject
}