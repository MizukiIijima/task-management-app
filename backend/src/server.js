const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database/initDb');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('ok');
});

app.get('/api/projects', (req, res) => {
    const selectProjectsName = `SELECT project_name, project_id, project_detail FROM project`;
    db.all(selectProjectsName, (err, rows) => {
        if(err) {
            res.status(500).json({ error: 'データベースエラーが発生しました。'});
        } else {
            res.status(200).json(rows);
        }
    })
});

app.post('/api/projects', (req, res) => {

    const { project_name, project_id , project_detail } = req.body;
    const query = `INSERT INTO project (project_name, project_detail) VALUES (?,?)`;

    db.run(query, [project_name, project_detail], (err) => {
        if (err) {
            res.status(500).json({ error: 'データベースエラーが発生しました。' });
        } else {
            res.status(201).json({ message: '正常に登録されました。' });
        }
    });
});


app.listen(5000, () => {
    console.log('サーバーが起動されました。');
});