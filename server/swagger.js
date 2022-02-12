const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./dist/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./dist/app.js');
});