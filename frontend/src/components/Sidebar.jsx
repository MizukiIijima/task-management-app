import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import "./Sidebar.css";
import { Link } from 'react-router-dom';

export const Sidebar = () => {

    return(
        <div className="sidebar">
            <div className="sidebarHead">
                <p className="sidebarTitle">Project</p>
                <Link to="/project-register">
                    <AddCircleOutlineOutlinedIcon
                        sx={{ backgroundColor: "inherit", color: "white" }}
                    />
                </Link>
            </div>
        </div>
    )
}