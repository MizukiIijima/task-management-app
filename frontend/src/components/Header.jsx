import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import './Header.css';

export const Header = () => {

    return(
        <header>
            <Link to="/" className="logo">
                <img src={logo} alt="ロゴ画像" />
            </Link>
        </header>
    );
}