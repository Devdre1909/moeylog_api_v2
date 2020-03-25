const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const chalk = require('chalk');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const connectDB = require('./connect_db');
const path = require('path');
const morgan = require('morgan');

module.exports = () => {
    let server = express();
    let create;
    let start;

    create = () => {
        //let routes = require('../routes');

        // handle uncaught exception
        process.on('uncaughtException', err => {
            console.log(chalk.red(`uncaught exception: ${err.stack}`));
            process.exit(1);
        });

        dotenv.config({
            path: `${path.join(__dirname,'/env/config.env')}`
        })

        //set all server parameters
        server.set('env', process.env.NODE_ENV);
        server.set('port', process.env.PORT);
        server.set('hostname', process.env.HOSTNAME)

        // add middleware 
        server.use(helmet());
        server.use(cors());
        server.use(bodyParser.json());
        //server.use(expressValidator);
        server.use(
            bodyParser.urlencoded({
                extended: true
            })
        )

        //connect db
        //connectDB();

        if (server.get('env') === 'development') {
            server.use(morgan('tiny'));
        }

        server.use(mongoSanitize());
        server.use(xss());
        server.use(hpp());

        //set up routes
        //routes.init(server);
    }
    start = () => {
        let hostname = server.get('hostname');
        let port = server.get('port') || 5000;
        server.listen(server.get('port'), () => {
            console.log(chalk.green.bold(`Express server listening on - https://${hostname}:${port}`))
        })
    }

    return {
        create,
        start
    }

}