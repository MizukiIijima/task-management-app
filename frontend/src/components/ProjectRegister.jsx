import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import "./ProjectRegister.css";
import { useEffect, useState } from "react";

export const ProjectRegister = () => {

    const { register, handleSubmit, getValues } = useForm();
    const [message, setMessage] = useState('');
    
    const projectSubmit = async () => {
        // setProjectName(getValues('project_name'));
        const project_name = getValues('project_name');
        const project_detail = getValues('project_detail');

        const response = await fetch('/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ project_name, project_detail }),
        });

        const result = (await response).json();
        if(response.ok){
            setMessage('プロジェクトの登録が完了しました。');
        } else {
            setMessage('プロジェクトの登録に失敗しました。');
        }
    }

    return(
        <div className="projectWrapper">
            <h1>プロジェクトを登録</h1>
            <form onSubmit={handleSubmit(projectSubmit)} className="projectForm">
                <TextField
                    label="プロジェクト名"
                    fullWidth
                    sx={{ display: "block", marginBottom: "1.875rem", }}
                    {...register('project_name',{
                        required: '必須項目です。'
                    })}
                />
                <TextField
                    label="タスク内容"
                    multiline
                    rows={10}
                    fullWidth
                    sx={{ display: "block", marginBottom: "4.125rem" }}
                    {...register('project_detail')}
                />
                <Button variant="contained" type="submit"
                    sx={{ backgroundColor: "#37C300", width: "12rem", margin: "auto", display: "block" }}
                >プロジェクトを作成</Button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )

}