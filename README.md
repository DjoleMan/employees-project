<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Simple CRUD application with NestJS and MongoDB for managing employees.
Make sure you have installed all required npm packages. Look for dependencies in package.json file.

## Install dependencies

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Routes: </br>

- GET all employees:</br>
  http://localhost:3000/api/employees </br>
  \*Pagination setting: define query in request. </br>
  example: http://localhost:3000/api/employees/?pageSize=2&pageNumber=4 </br>
- GET employee by ID(provide valid ID):</br>
  http://localhost:3000/api/employees/61b1dc035ed03c92ef1a5d13</br>

- POST empoyee(provide valid request body) </br>
  http://localhost:3000/api/employees </br>
- PUT employee(provide valid request body and valid ID) </br>
  http://localhost:3000/api/employees/61b1dc035ed03c92ef1a5d13 </br>
- DELETE employee(provide valid ID)</br>
  http://localhost:3000/api/employees/61b1dc035ed03c92ef1a5d13

</br></br>

## Example of valid request body: </br>

</br>

  <pre>
  {
    "name": "Marko",
    "email_address": "marko@gmail.com",
    "phone_number": "+381651234567",
    "home_address": {
       "city": "Beograd",
       "zip_code": "11000",
       "address_1": "Bulevar Nikole Tesle 50"
    },
    "date_of_birth": "1991-02-25"
}
</pre>
