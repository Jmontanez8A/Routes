let users = [];
let posteos = [];

const getUsers = () => users;

const getUsersByName = (name) => {
  const usersFound = users.filter((user) => user.name === name);

  if (!usersFound.length)
    return { error: "No existen usuarios con ese nombre" };

  return usersFound;
};

const getUserById = (id) => {
  //si recibimos un id utilizamos el metodo find//esto es unico//objeto
  const userFound = users.find((user) => user.id === +id);

  if (!userFound) return { error: "No exite un usuario asociado a ese ID" };
  return userFound;
};

let id = 1;
const postUser = (name, lastname, email) => {
  const newUser = {
    id: id++,
    name,
    lastname,
    email,
    posts: [],
  };

  users.push(newUser);
  return newUser;
};

const updateUser = (id, name, lastname, email) => {
  const user = getUserById(id);

  if (user.error) return user;

  user.name = name || user.name;
  user.lastname = lastname || user.lastname;
  user.email = email || user.email;

  return user;
};

const deleteUser = (id) => {
  const user = getUserById(id);

  if (user.error) return user;

  users = users.filter((user) => user.id !== +id);

  return user;
};

let postId = 1;
const createPost = (userId, title, content) => {
  const user = getUserById(userId);

  if (user.error) return user;
  const newPost = {
    id: postId++,
    userId,
    title,
    content,
  };
  posteos.push(newPost);
  user.posts.push(newPost);

  return newPost;
};

const getPosteos = () => posteos;

const getPosteosByTitle = (title) => {
  //Si se busca algo por name utilizamos metodo filter//estos son varios//array de objetos
  const posteosFiltered = posteos.filter((posteo) => posteo.title === title);

  if (!posteosFiltered.length)
    //IMPORTANTE: retornamos un errorcuando no hay manejador de errores como el catch.
    return { error: "No hay posteos asociados a ese titulo" };

  return posteosFiltered;
};

const getPosteosById = (id) => {
  const posteosFound = posteos.find((posteo) => posteo.id === +id);
  // Si lanzamos un throw desde el controlador cae diirecto al catch de la ruta
  if (!posteosFound) throw Error(`No hay posteos relacionados con id: ${id}`);

  return posteosFound;
};

const updatePosteo = (id, title, content) => {
  const postFound = getPosteosById(id);

  postFound.title = title || postFound.title;
  postFound.content = content || postFound.content;

  return postFound;
};

const deletePosteo = (id) => {
  const postFound = getPosteosById(id);
  const userFound = getUserById(postFound.userId);

  posteos = posteos.filter((posteo) => posteo.id !== +id);

  userFound.posts = userFound.posts.filter((posteo) => posteo.id !== +id);

  return postFound;
};
module.exports = {
  getUsers,
  getUsersByName,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
  createPost,
  getPosteos,
  getPosteosByTitle,
  getPosteosById,
  updatePosteo,
  deletePosteo,
};
