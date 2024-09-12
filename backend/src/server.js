const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database/initDb');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('ok');
});

//プロジェクトの取得
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

//プロジェクトの登録
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

//タスクの取得
app.get('/api/projects/detail/:id', (req, res) => {
    
    const projectId = req.params.id;
    console.log(projectId)
    const getTasksQuery = `SELECT * FROM tasks WHERE project_id = ?`;

    db.all(getTasksQuery, [projectId], (err, rows) => {
        if(err) {
            res.status(500).json({ error: 'データベースエラーが発生しました。' });
            console.error(err);
        } else {
            res.status(200).json({ tasks: rows });
            console.log(rows)
        }
    });
});

//タスク登録
app.post('/api/tasks', (req, res) => {
    const { project_id, task_name, content, person, status, progress, date } = req.body;

    const taskRegisterQuery = `INSERT INTO tasks (project_id, task_name, content, person, status, progress, date) VALUES(?,?,?,?,?,?,?)`;

    db.run(taskRegisterQuery, [project_id, task_name, content, person, status, progress, date], (err) => {
        if (err) {
            res.status(500).json({ error: 'データベースエラーが発生しました。' });
            console.error(err);
        } else {
            res.status(201).json({ message: '正常に登録されました。' });
        }
    });
});

app.listen(5000, () => {
    console.log('サーバーが起動されました。');
});