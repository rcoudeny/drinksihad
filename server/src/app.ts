import { GroupsController } from './controller/groups.controller';
import log from "./logger";
import "reflect-metadata";
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');
import { createConnection } from "typeorm";
import { createExpressServer, getMetadataArgsStorage } from "routing-controllers";
import { UsersController } from "./controller/users.controller";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { DatabaseHelper } from './database/database.helper';
const { defaultMetadataStorage } = require('class-transformer/cjs/storage');

const PORT = process.env.PORT || 3001;

const routingControllersOptions = {
    controllers: [UsersController, GroupsController],
    routePrefix: '/api',
};

const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/',
})

log.info("starting connection with database");
createConnection().then(async connection => {
    DatabaseHelper.cleanAllEntities();
    // create and setup express app
    log.info("Connection established");
    const app = createExpressServer(routingControllersOptions);

    const storage = getMetadataArgsStorage()
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
        components: {
            schemas,
            securitySchemes: {
                basicAuth: {
                    scheme: 'basic',
                    type: 'http',
                },
            },
        },
        info: {
            description: 'Generated with `routing-controllers-openapi`',
            title: 'Backend API for DrinksIHad',
            version: '1.0.0',
        },
    });

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.listen(PORT, () => {
        log.info('server is listening on port ' + PORT);
    });
})
    .catch(function (e) {
        log.error(e);
    });