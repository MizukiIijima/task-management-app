import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import './App.css';
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

function App() {

    //ID、プロジェクト名、プロジェクト詳細
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjectsName = async () => {
            try {
                const response = await fetch('/api/projects');
                if(response.ok){
                    const data = await response.json();
                    setProjects(data);
                } else {
                    console.error('プロジェクト名の取得に失敗しました。')
                }    
            } catch {
                console.error('エラーが発生しました。');
            }
        }

        fetchProjectsName();
    }, []);

    
    useEffect(() => {
        console.log(projects)
    }, [projects]);

    return (
        <>
            <Header />
            <div className="wrapper">
                <Sidebar projects={projects}/>
                <Outlet context={{projects, setProjects}}/>
            </div>
        </>
    );
}

export default App;