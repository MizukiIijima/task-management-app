import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { TaskRegister } from "../components/TaskRegister";
import { Login } from "../components/Login";
import App from  "../App.jsx";

export const AppRoutes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} >
            <Route path="register" element={<TaskRegister />} />
            <Route path="login" element={<Login />} />
        </Route>
    )
);
