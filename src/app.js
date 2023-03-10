const express = require('express');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swaggerOutput.json');
const { authRouter, userRouter, categoryRouter, postRouter } = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');
// ...

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/login', authRouter);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);
app.use('/post', postRouter);

app.use(errorMiddleware);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
