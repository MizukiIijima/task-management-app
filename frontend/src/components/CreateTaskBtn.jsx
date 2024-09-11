import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const CreateTaskBtn = () => {

    const taskCreate = () => {

    }

    return(
        <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: "#37C300", width: "12rem" }}
            onClick={taskCreate}>
            タスクを作成する
        </Button>
    );
}