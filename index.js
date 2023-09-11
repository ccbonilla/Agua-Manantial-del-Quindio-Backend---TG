const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const routers = require('./routes');
const cors = require('cors');

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
    const corsOptions = {
      origin: '*', // Esto permite todas las solicitudes desde cualquier origen (en desarrollo, no en producción).
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    };
    this.app.use(routers);
    this.app.use(cors(corsOptions));
  }

  start() {
    this.app.listen(PORT, () => {
      console.log('SERVER ON PORT: ', PORT);
    });
  }
}

const server = new SERVER();
module.exports = server.app;
