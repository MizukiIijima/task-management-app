import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import "./ProjectRegister.css";

export const ProjectRegister = () => {

    const { register, handleSubmit } = useForm();

    const projectSubmit = () => {
        alert('OK')
    }

    return(
        <div className="projectWrapper">
            <h1>プロジェクトを登録</h1>
            <form onSubmit={handleSubmit(projectSubmit)} className="projectForm">
                <TextField
                    label="プロジェクト名"
                    fullWidth
                    sx={{ display: "block", marginBottom: "1.875rem", }}
                />
                <TextField
                    label="タスク内容"
                    multiline
                    rows={10}
                    fullWidth
                    sx={{ display: "block", marginBottom: "4.125rem" }}
                />
                <Button variant="contained" type="submit"
                    sx={{ backgroundColor: "#37C300", width: "12rem", margin: "auto", display: "block" }}
                >プロジェクトを作成</Button>
            </form>
        </div>
    )

}