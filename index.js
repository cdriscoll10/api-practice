const express = require('express');
const app = express();

//Morgan library used for logging
const morgan = require('morgan');
app.use(morgan('tiny'));

const cors = require('cors');
app.use(cors());

const port = 8765;
app.listen(port, () => {
    console.log('API server listening on port ${port}')
})


//Endpoint for health check
app.get('/health', (req, res) => {
    res.send('API is healthy');
});

//Endpoint for squaring a number
app.get('/square/:number', authMiddleware, (req, res) => {
    const number = req.params.number;
    const result = number * number;
    res.send(result.toString());
});

//Endpoint for returning JSON obj w/ fav color, state, TV Show, and a random prime num
app.get('/info', authMiddleware, (req, res) => {
    const favColor = 'Purple';
    const state = 'NJ';
    const tvShow = 'Fred Claus';
    const primeNumber = getPrime(rdmNum);

    res.json({ favColor, state, tvShow, primeNumber });
});


function rdmNum() {
    return Math.floor(Math.random() * (41 - 11)) + 11
};

function isPrime(num) {
    const number = num
    for (let i = 2, s = Math.sqrt(number); i <= s; i++)
        if (num % i === 0) return false;
    return num > 1;
};

function getPrime(num) {
    num = rdmNum();
    if (isPrime(num)) return num;
    else return getPrime(rdmNum());
}

//Middleware func that checks for an Authentication header on non-healthcheck endpoints
function authMiddleware(req, res, next) {
    if (req.path === '/health') {
        next();
        return;
    }

    if (!req.headers.authorization || req.headers.authorization !== 'open sesame') {
        res.status(401).send('Unauthorized');
        return;
    }
    next();
}

app.use(authMiddleware);


//Creation of connection to databse movie
const { Client } = require('pg');

const client = new Client({
    user: 'movies_user',
    password: 'password',
    host: 'localhost',
    database: 'movies'
});

client.connect();

app.post('/movies', authMiddleware, async (req, res) => {
    const { title } = req.body;

    const query = 'INSERT INTO movie_titles (title) VALUES ($1) RETURNING *';
    const values = [title];
    const result = await client.query(query, values);

    res.json(result.rows[0]);
});

app.get('/movies', authMiddleware, async (req, res) => {
    const result = await client.query('SELECT * FROM movie_titles');
    res.json(result.rows);
});