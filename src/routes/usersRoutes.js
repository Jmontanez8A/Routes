//USERS
//RUTA GET => PARA QUE ME TRAIGA A TODOS LOS USUARIOS O BUSQUE POR NOMBRE
//RUTA GET /:id => PARA QUE TRAIGA EL USUARIO CON EL ID CORRESPONDIENTE
//RUTA POST => PARA CREAR UN NUEVO USUARIO
//RUTA PUT=> PARA MODIFICAR EL USUARIO CORRESPONDIENTE
//RUTA DELETE /id: => PARA ELIMINAR EL USUARIO CORRESPONDIENTE

//Tres formas de crear ROUTER:
//PRIMERA
// const express = require("express");
// const usersRouter = express.Router();
//SEGUNDA
//const {Router} = require ('express');
//const usersRouter = Router();
//TERCERA Y MAS SIMPLE
const usersRouter = require("express").Router();
//Traemos getUsers para mandar a todos los ususarios
const {
  getUsers,
  getUsersByName,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
} = require("../controllers/controllers");

//Empezamos a crear nuestras rutas de USERS:
usersRouter.get("/", (req, res) => {
  try {
    const { name } = req.query;

    if (!name) res.status(200).json(getUsers());

    const users = getUsersByName(name);

    if (users.error) throw Error(users.error);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

usersRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const user = getUserById(id);

    if (user["error"]) throw Error(user.error);
    return res.status(200).json(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

usersRouter.post("/", (req, res) => {
  try {
    const { name, lastname, email } = req.body;

    if (!name || !lastname || !email)
      throw Error("Falta informacion obligatorias");
    const newUser = postUser(name, lastname, email);
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

usersRouter.put("/", (req, res) => {
  try {
    const { id, name, lastname, email } = req.body;

    if (!id) throw Error("El id es obligatorio");
    const user = updateUser(id, name, lastname, email);

    if (user.error) throw Error(user.error);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

usersRouter.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const delUser = deleteUser(id);

    if (delUser.error) throw Error(delUser.error);
    return res.status(200).json(delUser);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = usersRouter;
