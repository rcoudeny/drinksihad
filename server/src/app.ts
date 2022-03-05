import { GroupController } from './controller/group.controller';
import log from "./logger";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Action, createExpressServer, getMetadataArgsStorage } from "routing-controllers";
import { UserController } from "./controller/user.controller";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { DatabaseHelper } from './database/database.helper';
import { TokenService } from './service/token.service';
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');
const { defaultMetadataStorage } = require('class-transformer/cjs/storage');
var cors = require('cors')

const dotenv = require('dotenv');
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

const PORT = process.env.PORT || 3001;

const routingControllersOptions = {
    controllers: [UserController, GroupController],
    cors: {
        origin: '*'// TODORC: replace with correct origin //'http://localhost:3000'
    },
    cookieParser: cookieParser(),
    routePrefix: '/api',
    currentUserChecker: async (action: Action) => {
        // here you can use request/response objects from action
        // you need to provide a user object that will be injected in controller actions
        // demo code:
        const token = action.request.headers['authorization'].replace('Bearer ', '');
        if (token) {
            return TokenService.getCurrentUser(token);
        }
        return null;
    },
};

const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/',
})

log.info("starting connection with database");
createConnection().then(async connection => {
    // DatabaseHelper.cleanAllEntities();
    // create and setup express app
    log.info("Connection established");
    const app = createExpressServer(routingControllersOptions);

    const storage = getMetadataArgsStorage()
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
        components: {
            schemas,
            securitySchemes: {
                bearerAuth: {
                    "type": "http",
                    "scheme": "bearer",
                    "bearerFormat": "JWT",
                    description: "A JWT based access token. Use /api/auth/login or /api/auth/refresh to get one."
                },
            },
        },
        info: {
            description: 'Created by `Robbe Coudenys` in collaboration with `Hyphen Solutions`',
            title: 'Backend API for DrinksIHad',
            version: '1.0.0',
        },
    });

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.listen(PORT, () => {
        log.info('server is listening on port ' + PORT);
    });
})
    .catch(function (e) {
        log.error(e);
    });
