import { useState } from "react";
import { Button, Icon, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../assets/logo.png";
import "../assets/logo.png";
import './Header.css';

export const Header = () => {

    const {register, handleSubmit} = useForm();

    //検索
    const searchTask = () => {
        alert('OK');
    }

    //サイドバーを表示
    const toggleDrawer = () => {
        alert('OK');
    }

    return(
        <header>
            <MenuIcon
                sx={{ color: "#FFF", backgroundColor: "inherit", width: "2.625rem" }}
                onClick={toggleDrawer}
            />
            <Link to="/" className="logo">
                <img src={logo} alt="ロゴ画像" />
            </Link>
            <form onSubmit={handleSubmit(searchTask)} className="taskSearch">
                <input type="text" className="searchInput" placeholder="search..." />
                <button type="submit" className="searchSubmit">
                    <SearchIcon sx={{ color: "#FFF" }}/>
                </button>
            </form>
        </header>
    );
}