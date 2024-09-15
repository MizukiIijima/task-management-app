import { TextField, Button, Select, MenuItem, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { json, useParams } from "react-router-dom";
import loading from './../assets/loading.gif';

export const TaskDetailEdit = () => {
    const { id } = useParams();
    const { register, handleSubmit, reset, getValues, } = useForm();
    const [editTasks, setEditTasks] = useState({});

    // ページ読み込み時にタスク内容を取得してくる
    const fetchTaskDetail = async () => {
        const response = await fetch(`/api/tasks/detail/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const taskData = await response.json();
            const defaultValues = {
                task_name: taskData.tasks[0].task_name,
                person: taskData.tasks[0].person,
                date: taskData.tasks[0].date,
                status: taskData.tasks[0].status,
                progress: taskData.tasks[0].progress,
                content: taskData.tasks[0].content,
            };
            reset(defaultValues);

            setEditTasks(taskData);
        } else {
            console.error('エラー');
        }
    };

    // 修正ボタン押下時
    const taskEditSubmit = async () => {

        const task_name = getValues('task_name');
        const person    = getValues('person');
        const date      = getValues('date');
        const status    = getValues('status');
        const progress  = getValues('progress');
        const content   = getValues('content');
        
        const response = await fetch(`/api/tasks/update/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task_name, person, date, status, progress, content }),
        });

        if(response.ok) {
            const editData = await response.json();
            setEditTasks(editData);
        } else {
            console.error('エラーが発生しました。');
        }
    };

    //削除ボタン押下時
    const taskDeleteSubmit = async () => {
        const response = await fetch(`/api/tasks/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            alert('タスクを削除しました。');
        } else {
            alert('削除に失敗しました。');
        }
    };

    useEffect(() => {
        fetchTaskDetail();
    }, []);

    return (
        <>
        {Object.keys(editTasks).length === 0 ? (
            <div className="loadingBlock">
                <img src={loading} alt="ローディング中gif" />
            </div>
        ) : (
            <form onSubmit={handleSubmit(taskEditSubmit, taskDeleteSubmit)} className="editForm">
            <TextField
                label="タスク名"
                variant="standard"
                fullWidth
                sx={{ marginTop: "1.25rem" }}
                {...register('task_name', {
                    required: '必須項目です。',
                })}
            />
            <TextField
                label="担当者"
                variant="standard"
                fullWidth
                sx={{ marginTop: "1.25rem" }}
                {...register('person', {
                    required: '必須項目です。',
                })}
            />
            <TextField
                label="期間"
                variant="standard"
                fullWidth
                sx={{ marginTop: "1.25rem" }}
                {...register('date')}
            />
            <InputLabel sx={{ marginTop: "1.25rem" }}>ステータス</InputLabel>
            <Select
                variant="standard"
                fullWidth
                defaultValue={editTasks.tasks ? editTasks.tasks[0].status : ""}
                {...register('status')}
            >
                <MenuItem value="">ステータスを選択</MenuItem>
                <MenuItem value={"未着手"}>未着手</MenuItem>
                <MenuItem value={"着手中"}>着手中</MenuItem>
                <MenuItem value={"完了"}>完了</MenuItem>
            </Select>
            <TextField
                label="進捗度"
                variant="standard"
                fullWidth
                sx={{ marginTop: "1.25rem" }}
                {...register('progress', {
                    min: {
                        value: 0,
                        message: '0以上で入力してください。'
                    },
                    max: {
                        value: 100,
                        message: '100以上で入力して下さい。'
                    },
                    valueAsNumber: true,
                })}
            />
            <TextField
                label="タスク内容"
                variant="standard"
                multiline
                rows={10}
                fullWidth
                sx={{ marginTop: "1.25rem" }}
                {...register('content', {
                    required: '必須項目です。',
                })}
            />
            <Button
                variant="contained"
                type="submit"
                sx={{ width: '12rem', backgroundColor: "#37C300", display: "block", margin: "5.625rem auto 0 auto" }}
            >
                タスクを修正
            </Button>
            <Button
                variant="outlined"
                type="button"
                onClick={taskDeleteSubmit}
                color="error"
                sx={{ width: '12rem', display: "block", margin: "1.5rem auto 0 auto" }}
            >
                タスクを削除
            </Button>
        </form>
        )}
        </>
    );
};
