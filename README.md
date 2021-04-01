<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="Users API" />

  &#xa0;

  <!-- <a href="https://users_api.netlify.app">Demo</a> -->
</div>

<h1 align="center">Users API</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/feliamunda/users_api?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/feliamunda/users_api?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/feliamunda/users_api?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/feliamunda/users_api?color=56BEB8">

  <!-- <img alt="Github issues" src="https://img.shields.io/github/issues/feliamunda/users_api?color=56BEB8" /> -->

  <!-- <img alt="Github forks" src="https://img.shields.io/github/forks/feliamunda/users_api?color=56BEB8" /> -->

  <!-- <img alt="Github stars" src="https://img.shields.io/github/stars/feliamunda/users_api?color=56BEB8" /> -->
</p>

<!-- Status -->

<!-- <h4 align="center"> 
	🚧  Users_api 🚀 Under construction...  🚧
</h4> 

<hr> -->

<p align="center">
  <a href="#dart-about">Acerca de</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Características</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Tecnologias</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requerimientos</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Empezando</a> &#xa0; | &#xa0;
  <a href="#memo-license">Licencia</a> &#xa0; | &#xa0;
  <a href="https://github.com/feliamunda" target="_blank">Autor</a>
</p>

<br>

## :dart: Acerca de ##

Esta es una API para listar usuarios con un CRUD completo para ello y autenticar usuarios a traves de métodos de encriptación que aseguran su información

## :sparkles: Características ##

:heavy_check_mark: Escalable\
:heavy_check_mark: Fácil Lanzamiento\
:heavy_check_mark: Peristente\
:heavy_check_mark: JWT;

## :rocket: Tecnologías ##

Las siguientes herramientas fueron usadas en este proyecto:

- [Node.js](https://nodejs.org/)
- [Mongo](https://www.mongodb.com/)

## :white_check_mark: Requerimientos ##

Antes de empezar :checkered_flag:, necesita tener [Git](https://git-scm.com) y [Node](https://nodejs.org/en/) instalado; opcionalmente para un ambiente de desarrollo tambien necesitará [Mongo](https://www.mongodb.com/).

Es necesario configurar algunas variables de entorno:

REQUERIDOS
- MONGODB_PASSWORD_ATLAS -> Para la conexión a la BD en producción

OPCIONALES
- HOST
- PORT
- DB_NAME
- SECRET_JWT -> Si se cambia esta llave pueden dejar de funcionar las autenticaciones encriptadas con otra llave

En desarrollo es necesario crear la base 

## :checkered_flag: Empezando ##

```bash
# Clone this project
$ git clone https://github.com/feliamunda/users_api

# Access
$ cd users_api

# Instalar dependencias
$ npm install

# Correr Proyecto (DEV)
$ npm run test

# Run the project (PROD)
$ npm run start

# El servidor se inicializará en <http://localhost:3000>
```

Leer documentación [API Docs](https://documenter.getpostman.com/view/7918914/TzCMeoep)

## :memo: License ##

Este proyecto esta bajo la licencia GPL . Para mas detalles ver el archivo [LICENSE](LICENSE.md).


Hecho con :heart: por <a href="https://github.com/feliamunda" target="_blank">Felicie Amundaray</a>

&#xa0;

<a href="#top">Back to top</a>
