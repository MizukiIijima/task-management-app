import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { TaskRegister } from "../components/TaskRegister";
import { Login } from "../components/Login";
import { ProjectRegister } from "../components/ProjectRegister.jsx";
import { TopPage } from "../components/TopPage";
import { TaskDetail } from "../components/TaskDetail.jsx";
import App from  "../App.jsx";
import { ProjectDetail } from "../components/ProjectDetail.jsx";

export const AppRoutes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} >
            <Route index element={<TopPage />} />
            <Route path="tasks/register/:id" element={<TaskRegister />} />
            <Route path="tasks/detail/:id"   element={<TaskDetail />} />
            <Route path="projects/detail/:id" element={<ProjectDetail />} />
            <Route path="projects/register" element={<ProjectRegister />} />
            <Route path="login" element={<Login />} />
        </Route>
    )
);