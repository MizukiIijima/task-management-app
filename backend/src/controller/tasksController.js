const db = require('./../database/initDb.js');

// タスクレコード追加
db.run(
    `INSERT INTO tasks (
        id, project_name, task_name, content, person, status, progress, date
    ) VALUES (
        '002', 'テスト', 'テスト業務', 'テストを実施', '田中', '未着手', 20, '2024-09-06'
    )`
), (err) => {
    if(err){
        console.error(err.message);
    } else {
        console.log('task追加！');
    }
};
