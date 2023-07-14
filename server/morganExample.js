const express = require('express');
const morgan = require('morgan');
const winston = require('winston');

const app = express();

app.use(morgan('combined"'));
app.use(express.urlencoded({ extended: false }));

const logger = winston.createLogger({
    level: 'debug',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logfile.log' })
    ]
});

app.use(morgan('tiny', {
    stream: {
        write: (message) => {
            logger.http(message);
        }
    }
}));

app.get('/', (req, res) => {
    res.send('Hello Morgan!');
});

app.post('/adduser', (req, res) => {
    let name = req.body.name;
    res.send(`Hello ${name}!`);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});