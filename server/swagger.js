const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./dist/app.js'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./dist/app.js');
});