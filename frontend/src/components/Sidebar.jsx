import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import "./Sidebar.css";

export const Sidebar = () => {

    return(
        <div className="sidebar">
            <div className="sidebarHead">
                <p className="sidebarTitle">Project</p>
                <AddCircleOutlineOutlinedIcon />
            </div>
        </div>
    )
}