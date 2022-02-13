import log from "./logger";
import routes from "./routes";
import "reflect-metadata";
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');
const swaggerDocument = require('../swagger_output.json');
import { createConnection } from "typeorm";

const PORT = process.env.PORT || 3001;

log.info("starting connection with database")
createConnection(
    {
        name: 'drinksihad',
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "rcdn",
        password: "BartjeZekers",
        database: "drinksihad",
        entities: ["dist/database/entity/**.entity.js"],
        migrations: ["dist/database/migration/**.migration.js"],
        synchronize: true,
    }).then(async connection => {
        // create and setup express app
        log.info("Connection established");
        const app = express();

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.listen(PORT, () => {
            log.info('server is listening on port ' + PORT);
            routes(app);
        });
    });
