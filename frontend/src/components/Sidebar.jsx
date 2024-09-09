import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import "./Sidebar.css";
import { Link } from 'react-router-dom';

export const Sidebar = ({ projects = [] }) => {
    return (
        <div className="sidebar">
            <div className="sidebarHead">
                <p className="sidebarTitle">Project</p>
                <Link to="/projects/register">
                    <AddCircleOutlineOutlinedIcon
                        sx={{ backgroundColor: "inherit", color: "white" }}
                    />
                </Link>
            </div>
            <ul className='sidebarProject'>
                {projects.map((project) => (
                    <li key={project.id}>{project.project_name}</li>
                ))}
            </ul>
        </div>
    );
}
