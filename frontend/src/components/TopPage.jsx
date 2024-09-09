import { Link, useOutletContext } from "react-router-dom";
// import { ProjectRegister } from "./ProjectRegister";
import "./TopPage.css";
import { useEffect } from "react";

export const TopPage = () => {

    const { projects, setProjects } = useOutletContext();
    
    return (
        <div className="topPage">
            {Object.keys(projects).length === 0 ? 
                <>
                {/* 1件もプロジェクトがない場合の表示 */}
                    <p className="message">まずはプロジェクトを作成しましょう！</p>
                    <Link to="/projects/register" className="link-button">
                        プロジェクトを作成
                    </Link>
                </> : 
                // プロジェクトがある場合
                <>
                    <h1>プロジェクト一覧</h1>
                    <div className="topPageProject">
                        {projects.map((project, index) => (
                            <h2 key={index}>{project.project_name}</h2>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}