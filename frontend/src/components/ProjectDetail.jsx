import { useState, useEffect } from "react";
import { useParams, useOutletContext, Link, NavLink } from "react-router-dom";
import { CreateTaskBtn } from "./CreateTaskBtn";
import { EditProjectBtn } from "./EditProjectBtn";
import "./ProjectDetail.css";

export const ProjectDetail = () => {
    const { id } = useParams();
    const { projects, taskList, setTaskList, projectId, setProjectId } = useOutletContext();

    const project = projects.find((project) => project.project_id === parseInt(id, 10));

    useEffect(() => {
        if (project) {
            const fetchProject = async () => {
                setTaskList([]);
                const response = await fetch(`/api/projects/detail/${project.project_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const tasksdata = await response.json();
                    setTaskList(tasksdata);
                } else {
                    console.error('NG');
                }
            };
            fetchProject();
        }

    }, [id, project, setTaskList]);

    useEffect(() => {
        setProjectId(id);
        // console.log(`id:${id}`);
        // console.log(`projectId:${projectId}`);
        // console.log(projects)
    }, [id]);

    if (!project) {
        return <p>プロジェクトを読み込んでいます...</p>;
    }

    return (
        <div className="projectArea">
            <div className="projectArea-head">
                <h1>{project.project_name}</h1>
                <NavLink to={`/tasks/register/${project.project_id}`}>
                    <CreateTaskBtn project={project} />
                </NavLink>
            </div>
            <>
            {taskList.tasks && taskList.tasks.length > 0 ? (
                <div className="projectArea-block">
                    <div className="projectArea-block__head">
                        <p className="projectDetail-name">タスク名</p>
                        <p className="projectDetail-status">ステータス</p>
                        <p className="projectDetail-person">担当者</p>
                        <p className="projectDetail-date">期限</p>
                    </div>
                    {taskList.tasks.map((task) => (
                        <NavLink
                            to={`/tasks/detail/${task.id}`}
                            key={task.id}
                            className="projectArea-link"
                        >
                            <div className="projectArea-inner">
                                <p className="projectArea-inner__name">{task.task_name}</p>
                                <p className="projectArea-inner__status">{task.status}</p>
                                <p className="projectArea-inner__person">{task.person}</p>
                                <p className="projectArea-inner__date">{task.date}</p>
                            </div>
                        </NavLink>
                    ))}
                    <Link to={`/projects/edit/${projectId}`} className="editTaskBtn">
                        <EditProjectBtn />
                    </Link>
                </div>
            ) : (
                <p className="notaskMessage">タスクがありません。</p>
            )}
            </>
        </div>
    );
}
