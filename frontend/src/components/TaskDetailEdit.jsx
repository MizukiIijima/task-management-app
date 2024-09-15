import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const TaskDetailEdit = () => {
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm();
    // const [editTasks, setEditTasks] = useState();

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
                content: taskData.tasks[0].content,
            };
            reset(defaultValues);
            // setEditTasks(taskData);
        } else {
            console.error('エラー');
        }
    };

    // 修正ボタン押下時
    const taskEditSubmit = async (data) => {
        console.log('送信データ:', data);
    };

    useEffect(() => {
        fetchTaskDetail();
    }, []);

    return (
        <form onSubmit={handleSubmit(taskEditSubmit)} className="editForm">
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
                type="submit"
                color="error"
                sx={{ width: '12rem', display: "block", margin: "1.5rem auto 0 auto" }}
            >
                タスクを削除
            </Button>
        </form>
    );
};
