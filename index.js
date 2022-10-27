const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const routers = require('./routes');

const { PORT = 3000 } = process.env;

class SERVER {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.start();
  }

  config() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use(routers);
  }

  start() {
    this.app.listen(PORT, () => {
      console.log('SERVER ON PORT: ', PORT);
    });
  }
}

const server = new SERVER();
module.exports = server.app;
