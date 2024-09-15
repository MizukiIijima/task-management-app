import { useState, useEffect } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import './TaskDetail.css';
import { EditTaskBtn } from "./EditTaskBtn";
import { DeleteTaskBtn } from "./DeleteTaskBtn";

export const TaskDetail = () => {

    const [ taskUnit, setTaskUnit] = useState({});
    const { id } = useParams();

    //タスクの詳細を取得
    const fetchTaskDetail = async () => {

        const response = await fetch(`/api/tasks/detail/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        
        if(response.ok) {
            const taskData = await response.json();
            setTaskUnit(taskData);
        }
    }

    useEffect(() => {
        fetchTaskDetail()
    }, []);

    return (
        taskUnit.tasks && taskUnit.tasks.length > 0 ? (
            <div className="taskContent">
                {taskUnit.tasks.map((task) => (
                    <div key={task.id}>
                        <div className="taskContent-head">
                            <h1 className="taskContent-name">{ task.task_name }</h1>
                            <Link to={`/tasks/edit/${id}`}>
                                <EditTaskBtn />
                            </Link>
                        </div>
                        <div className="taskContent-block">
                            <h2>担当者</h2>
                            <p className="taskContent-person">{ task.person }</p>
                        </div>
                        <div className="taskContent-block">
                            <h2>ステータス</h2>
                            <p className="taskContent-status">{ task.status }</p>
                        </div>
                        <div className="taskContent-block">
                            <h2>進捗度</h2>
                            <p className="taskContent-progress">{ task.progress }</p>
                        </div>
                        <div className="taskContent-block">
                            <h2>期限</h2>
                            <p className="taskContent-date">{ task.date }</p>
                        </div>
                    </div>
                ))}
                <Link to={`/tasks/edit/${id}`} className="deleteTaskBtn">
                    <DeleteTaskBtn />
                </Link>
            </div>
        ) : (
            <p>エラーが発生しました。</p>
        )
    );

}