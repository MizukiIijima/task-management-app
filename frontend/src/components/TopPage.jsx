import { Link, NavLink, useOutletContext } from "react-router-dom";
import "./TopPage.css";

export const TopPage = () => {
    const { projects } = useOutletContext();

    return (
        <div className="topPage">
            {Object.keys(projects).length === 0 ? (
                <>
                    <p className="message">まずはプロジェクトを作成しましょう！</p>
                    <Link to="/projects/register" className="link-button">
                        プロジェクトを作成
                    </Link>
                </>
            ) : (
                <>
                    <h1>プロジェクト一覧</h1>
                    <div className="topPageProject">
                        {projects.map((project) => (
                            <NavLink key={project.project_id} to={`/projects/detail/${project.project_id}`} className="topPageProject-link">
                                <h2>{project.project_name}</h2>
                            </NavLink>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
