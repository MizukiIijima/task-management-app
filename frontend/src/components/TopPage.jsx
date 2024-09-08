import { Link } from "react-router-dom";
import { ProjectRegister } from "./ProjectRegister";
import "./TopPage.css";

export const TopPage = () => {

    return(
        <div className="topPage">
            <p className="message">まずはプロジェクトを作成しましょう！</p>
            <Link to="/project-register" className="link-button">
                プロジェクト作成
            </Link>
        </div>

    )
}