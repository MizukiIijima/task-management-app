import { Button } from "@mui/material";

export const EditTaskBtn = () => {

    const taskCreate = () => {

    }

    return(
        <Button
            variant="contained"
            color="primary"
            sx={{ width: "12rem", lineHeight: "2.25rem" }}
            onClick={taskCreate}>
            タスクを修正する
        </Button>
    );
}