import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { useParams, useOutletContext } from "react-router-dom";
import "./TaskRegister.css";

export const TaskRegister = () => {

    const { id } = useParams();
    const { projects } = useOutletContext();
    const { register, handleSubmit } = useForm();
    const project = projects.find(project => project.project_id === parseInt(id,10));

    //タスクを登録する
    const taskSubmit = () => {
        alert('OK')
    }

    return(
        <div className="taskRegister">
            <h1 className="taskRegister-head">{project.project_name}</h1>
            <form onSubmit={taskSubmit}>
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
        </div>
    )
}