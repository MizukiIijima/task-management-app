import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import './ProjectRegister.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ProjectEdit = () => {

    const { register, handleSubmit, reset, getValues } = useForm();
    const { id } = useParams();
    const [editProject, setEditProject] = useState({});

    const projectEditSubmit = async () => {
        alert('OK');
    }

    //プロジェクトの詳細を取得
    useEffect(() => {

        const project_name   = getValues('project_name');
        const project_detail = getValues('project_detail');

        const fetchProject = async () => {
            const response = await fetch(`/api/projects/edit/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if(response.ok) {
                const data = await response.json();
                const defaultValues = {
                    project_name: data[0].project_name,
                    project_detail: data[0].project_detail,
                }
                setEditProject(defaultValues);
                reset(defaultValues);
            } else {
                console.log('NG')
            }
        }
        fetchProject();
    }, []);

    return(
        <div className="projectWrapper">
            {console.log(editProject)}
            <h1 className="projectWrapper-head">プロジェクトを修正</h1>
            <form onSubmit={handleSubmit(projectEditSubmit)} className="projectForm">
                <TextField
                    label="プロジェクト名"
                    fullWidth
                    sx={{ display: "block", marginBottom: "1.875rem", }}
                    defaultValue={editProject.project_name ? editProject.project_name : ""}
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
                >プロジェクトを修正</Button>
            </form>
        </div>
    )
}