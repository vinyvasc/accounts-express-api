'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();
const port = process.env.SERVER_PORT | 3000;

const specs = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Accounts API',
            version: '1.0.0',
            description: 'An express api for accounts management'
        },servers: [
			{
				url: `http://localhost:${port}`,
			},
		],
    },
    apis: ['./routes/*.js']
})

app.get('/', (req, res) => res.redirect('/api'));


app.use('/api', swaggerUI.serve, swaggerUI.setup(specs));

//middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});