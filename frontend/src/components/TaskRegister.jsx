import { useForm } from "react-hook-form";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useParams, useOutletContext } from "react-router-dom";
import "./TaskRegister.css";

export const TaskRegister = () => {

    const { id } = useParams();
    const { projects } = useOutletContext();
    const [ text, setText ] = useState('');
    const { register, handleSubmit, getValues } = useForm();
    const project = projects.find(project => project.project_id === parseInt(id,10));

    //タスクを登録する
    const taskSubmit = async () => {
        
        const project_id = project.project_id;
        const task_name = getValues('task_name');
        const content  = getValues('content');
        const person   = getValues('person');
        const status   = '未着手';
        const progress = 0;
        const date     = getValues('date');

        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ project_id, task_name, content, person, status, progress, date } )
        });

        if(response.ok) {
            setText('正常に登録されました。');
        } else {
            setText('登録に失敗しました。');
        }
    }

    return(
        <div className="taskRegister">
            <h1 className="taskRegister-head">{project.project_name}</h1>
            <form onSubmit={handleSubmit(taskSubmit)}>
                <TextField 
                    label="タスク名"
                    variant="standard"
                    fullWidth
                    sx={{ marginTop: "1.25rem" }}
                    {...register('task_name', {
                        required: '必須項目です。'
                    })}
                />
                <TextField 
                    label="担当者"
                    variant="standard"
                    fullWidth
                    sx={{ marginTop: "1.25rem" }}
                    {...register('person', {
                        required: '必須項目です。'
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
                        required: '必須項目です。'
                    })}
                />
                <Button
                    variant="contained" type="submit" size="large"
                    sx={{ backgroundColor: "#37C300", display: "block", margin: "5.625rem auto 0 auto" }}
                >
                    タスクを作成
                </Button>
            </form>
            {text && <p>{text}</p>}
        </div>
    )
}