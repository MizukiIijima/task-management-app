import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import './App.css';
import { Header } from "./components/Header";
// import { AppRoutes } from './routes/AppRoutes.jsx';

function App() {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <>
            <Header />
            <ul>
                <li><Link to="/login">ログイン画面</Link></li>
                <li><Link to="/project-register">プロジェクト作成</Link></li>
                <li><Link to="/task-register">タスク登録</Link></li>
            </ul>
            <Outlet />
        </>
    );
}

export default App;