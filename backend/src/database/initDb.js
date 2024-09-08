const sqlite3 = require('sqlite3');

const path = require('path');
const dbPath = path.resolve(__dirname, 'db.sqlite');
const db = new sqlite3.Database(dbPath);

// タスクテーブル作成
db.run(
    `CREATE TABLE IF NOT EXISTS tasks (
        id           TEXT PRIMARY KEY NOT NULL,
        project_name TEXT NOT NULL,
        task_name    TEXT NOT NULL,
        content      TEXT NOT NULL,
        person       TEXT NOT NULL,
        status       TEXT NOT NULL CHECK(status = "未着手" or status = "着手中" or status = "完了"),
        progress     INTEGER NOT NULL,
        date         DATE
    )`
), (err) => {
    if(err){
        console.error(err.message);
    } else {
        console.log('tasks table created or already exists.');
    }
}

// ユーザーテーブル作成
// db.run(
//     `CREATE TABLE IF NOT EXISTS user (
//         user_name TEXT PRIMARY KEY NOT NULL,
//         password  TEXT NOT NULL CHECK(LENGTH(password) >= 4)
//     )`
// ), (err) => {
//     if(err){
//         console.error(err.message);
//     } else {
//         console.log('user table created or already exists.');
//     }
// }

// プロジェクトテーブル作成
db.run(
    `CREATE TABLE IF NOT EXISTS project (
        project_id     INTEGER PRIMARY KEY NOT NULL,
        project_name   TEXT NOT NULL,
        project_detail TEXT,
    )`
), (err) => {
    if(err){
        console.error(err.message);
    } else {
        console.log('project table created or already exists.');
    }
}


module.exports = db;