const swaggerAutogen = require('swagger-autogen');

const outputFile = './swagger/swaggerOutput.json';
const endpointFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointFiles);