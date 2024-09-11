import { useParams, useOutletContext, Link, NavLink } from "react-router-dom";
import { CreateTaskBtn } from "./CreateTaskBtn";
import "./ProjectDetail.css";

export const ProjectDetail = () => {

    const { id } = useParams();
    const { projects } = useOutletContext();

    const project = projects.find((project) => project.project_id === parseInt(id, 10));

    return(
        <div className="projectArea">
            <div className="projectArea-head">
                <h1>{project.project_name}</h1>
                <NavLink to={`/task/register/${project.project_id}`}>
                    <CreateTaskBtn project={project}/>
                </NavLink>
            </div>
        </div>
    )
}