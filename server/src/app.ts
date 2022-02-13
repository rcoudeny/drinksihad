import log from "./logger";
import "reflect-metadata";
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');
const swaggerDocument = require('../swagger_output.json');
import { createConnection } from "typeorm";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controller/user.controller";

const PORT = process.env.PORT || 3001;

log.info("starting connection with database")
createConnection().then(async connection => {
    // create and setup express app
    log.info("Connection established");
    const app = createExpressServer({
        controllers: [UserController]
    });

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.listen(PORT, () => {
        log.info('server is listening on port ' + PORT);
    });
});
