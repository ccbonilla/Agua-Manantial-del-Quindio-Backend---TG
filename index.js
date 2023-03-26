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
    this.app.use((req, res, next) => {
      req.header('Cache-Control', 'no-cache');
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
      );
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
      next();
    });
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
