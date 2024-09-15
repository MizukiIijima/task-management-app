import { TextField, Button } from "@mui/material";
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
        const content   = getValues('content');
        
        const response = await fetch(`/api/tasks/update/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task_name, person, date, content }),
        });

        if(response.ok) {
            const editData = await response.json();
            setEditTasks(editData);
        } else {
            console.error('エラーが発生しました。');
        }
    };

    useEffect(() => {
        fetchTaskDetail();
    }, []);

    useEffect(() => {
        console.log(editTasks);
    }, [editTasks]);

    return (
        <>
        {Object.keys(editTasks).length === 0 ? (
            <div className="loadingBlock">
                <img src={loading} alt="ローディング中gif" />
            </div>
        ) : (
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
        )}
        </>
    );
};
