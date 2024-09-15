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

//プロジェクト詳細画面で全タスクの取得
app.get('/api/projects/detail/:id', (req, res) => {
    
    const projectId = req.params.id;
    const getTasksQuery = `SELECT * FROM tasks WHERE project_id = ?`;

    db.all(getTasksQuery, [projectId], (err, rows) => {
        if(err) {
            res.status(500).json({ error: 'データベースエラーが発生しました。' });
            console.error(err);
        } else {
            res.status(200).json({ tasks: rows });
        }
    });
});

//タスク詳細画面でのタスク取得
app.get('/api/tasks/detail/:id', (req, res) => {

    const taskId = req.params.id;
    const searchTasksQuery = 'SELECT * FROM tasks WHERE id = ?';

    db.all(searchTasksQuery, [taskId], (err, rows) => {
        if(err) {
            res.status(500).json({ error: 'データベースエラーが発生しました。'});
            console.error(err);
        } else {
            res.status(200).json({ tasks: rows });
            console.log(rows)
        }
    })
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

//タスク修正
app.post('/api/tasks/update/:id', (req, res) => {

    const { project_id, task_name, content, person, status, progress, date } = req.body;

    //修正するタスクID取得
    const editTaskId = req.params.id;

    const taskEditQuery = `
    UPDATE tasks 
    SET 
        task_name = CASE WHEN task_name != ? THEN ? ELSE task_name END,
        content = CASE WHEN content != ? THEN ? ELSE content END,
        person = CASE WHEN person != ? THEN ? ELSE person END,
        status = CASE WHEN status != ? THEN ? ELSE status END,
        progress = CASE WHEN progress != ? THEN ? ELSE progress END,
        date = CASE WHEN date != ? THEN ? ELSE date END
    WHERE id = ${editTaskId}`;

    const params = [
        task_name, task_name,
        content, content,
        person, person,
        status, status,
        progress, progress,
        date, date,
    ];

    db.run(taskEditQuery, params, function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: '失敗しました。' });
        } else {
            db.get(`SELECT * FROM tasks WHERE id = ${editTaskId}`, (err, rows, updatedTask) => {
                if(err) {
                    res.status(500).json({ error: 'エラーが発生' });
                } else {
                    console.log(rows);
                    res.status(200).json(rows);
                }
            });
        }
    });
});

//タスク削除
app.delete('/api/tasks/delete/:id', (req, res) => {
    const deleteId = req.params.id;
    const deleteTaskQuery = `DELETE FROM tasks WHERE id = ?`;

    db.run(deleteTaskQuery, [deleteId],  function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'タスクの削除に失敗しました。' });
            return;
        }

        if (this.changes > 0) {
            res.status(200).json({ message: 'タスクを削除しました。' });
        } else {
            res.status(404).json({ error: '指定されたIDのタスクが見つかりませんでした。' });
        }
    });
});

app.listen(5000, () => {
    console.log('サーバーが起動されました。');
});