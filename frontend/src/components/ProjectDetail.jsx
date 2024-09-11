import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { CreateTaskBtn } from "./CreateTaskBtn";
import "./ProjectDetail.css";

export const ProjectDetail = () => {

    const { id } = useParams();
    const { projects } = useOutletContext();

    const project = projects.find((project) => project.project_id === parseInt(id, 10));
    console.log(project)
    return(
        <div className="projectArea">
            <div className="projectArea-head">
                <h1>{project.project_name}</h1>
                <CreateTaskBtn />
            </div>
        </div>
    )
}