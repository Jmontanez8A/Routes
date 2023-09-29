//POSTEOS
//RUTA GET => PARA QUE TRAIGA TODOS LOS PSTEOS
//RUTA POST => PARA CREAR POSTEOS
//RUTA GET /id: => PARA QUE ME TRAIGA UN POSTEO EN ESPECIFICO
//RUTA PUT => PARA MODIFICAR A UN POSTEO
//RUTA DELETE/id: => PARA ELIMINAR UN POSTEO ESPECIFICO

//Tres formas de crear ROUTER:
//PRIMERA
// const express = require("express");
// const posteosRouter = express.Router();
//SEGUNDA
//const {Router} = require ('express');
//const posteosRouter = Router();
//TERCERA Y MAS SIMPLE
const posteosRouter = require("express").Router();
const {
  createPost,
  getPosteos,
  getPosteosByTitle,
  getPosteosById,
  updatePosteo,
  deletePosteo,
} = require("../controllers/controllers");
//Cuando tenemos un metodo post nos estaran enviando informacion por body
posteosRouter.post("/", (req, res) => {
  try {
    const { userId, title, content } = req.body;

    if (!userId || !title || !content) throw Error("Falta info master");

    const newPost = createPost(userId, title, content);

    if (newPost.error) throw Error(newPost.error);
    return res.status(200).json(newPost);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
//Cuando tenemos un metodo get se puede o no mandar algo por lo cual vendra de query
posteosRouter.get("/", (req, res) => {
  try {
    const { title } = req.query;

    if (!title) return res.status(200).json(getPosteos());

    const posteos = getPosteosByTitle(title);

    if (posteos.error) throw Error(posteos.error);
    return res.status(200).json(posteos);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
//Cuando tenemos :id en un metodo get utilizamos params
posteosRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const posteoFound = getPosteosById(id);
    return res.status(200).json(posteoFound);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
//Cuando utilizamos el metodo put utilizamos body
posteosRouter.put("/", (req, res) => {
  try {
    const { id, title, content } = req.body;

    if (!id) throw Error("El id es necesario");

    const postFound = updatePosteo(id, title, content);

    return res.status(200).json(postFound);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
//Cuando utilizamos el metodo delete utilizamos params
posteosRouter.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const delPosteo = deletePosteo(id);
    return res.status(200).json(delPosteo);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = posteosRouter;
