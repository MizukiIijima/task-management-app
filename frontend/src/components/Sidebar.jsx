import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import "./Sidebar.css";
import { Link, NavLink, } from 'react-router-dom';

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
                    <NavLink  to={`/projects/detail/${project.project_id}`} key={project.project_id} className="sidebarLink">
                        <li>{project.project_name}</li>
                    </NavLink>
                ))}
            </ul>
        </div>
    );
}
