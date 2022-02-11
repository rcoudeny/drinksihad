import log from "./logger";
import routes from "./routes";
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger_output.json');

const PORT = process.env.PORT || 3001;

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
    log.info('server is listening on port ' + PORT);
    // TODO: Connect to database before adding routes
    routes(app);
});