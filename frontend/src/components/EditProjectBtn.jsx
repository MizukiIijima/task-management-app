import { Button } from "@mui/material";

export const EditProjectBtn = () => {

    return(
        <Button
            variant="contained"
            color="primary"
            sx={{ width: "12rem", lineHeight: "2.25rem" }}
            >
            プロジェクトを修正する
        </Button>
    );
}