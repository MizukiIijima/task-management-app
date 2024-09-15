import { Button } from "@mui/material";

export const DeleteTaskBtn = () => {

    const taskCreate = () => {

    }

    return(
        <Button
            variant="contained"
            color="error"
            sx={{ width: "12rem", lineHeight: "2.25rem", margin: '5rem auto 0 auto', display: 'block', textDecoration: 'none', }}
            onClick={taskCreate}>
            タスクを削除する
        </Button>
    );
}