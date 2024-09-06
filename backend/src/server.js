const express = require('express');
const db = require('./database/initDb.js');

const app = express();

app.get('/', (req) => {
    res.send('ok')
});

app.listen(3000, () => {
    console.log('OK')
})