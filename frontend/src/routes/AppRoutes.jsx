import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { TaskRegister } from "../components/TaskRegister";
import { Login } from "../components/Login";
import { ProjectRegister } from "../components/ProjectRegister.jsx";
import App from  "../App.jsx";

export const AppRoutes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} >
            <Route path="task-register" element={<TaskRegister />} />
            <Route path="project-register" element={<ProjectRegister />} />
            <Route path="login" element={<Login />} />
        </Route>
    )
);
