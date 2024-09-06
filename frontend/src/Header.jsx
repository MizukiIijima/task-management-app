import { useState } from "react";
import { Button, Icon, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css';

export const Header = () => {

    const {register, handleSubmit} = useForm();

    const searchTask = () => {
        alert('OK');
    }

    return(
        <header>
            <form onSubmit={handleSubmit(searchTask)} className="taskSearch">
                <input type="text" className="searchInput" placeholder="search..." />
                <button type="submit" className="searchSubmit">
                    <SearchIcon sx={{ color: "#FFF"}}/>
                </button>
            </form>
        </header>
    );
}