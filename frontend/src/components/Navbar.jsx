import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    let nama = localStorage.getItem("name");
    let token = localStorage.getItem("token");
    const navigate = useNavigate();


    const handleLogout = async() => {
        await axios.post("http://127.0.0.1:8000/api/v1/auth/logout", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        navigate("/")
    }
  return (
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div class="container">
        <a class="navbar-brand" href="/home">Facegram</a>
        <div class="navbar-nav">
            <a class="nav-link" href="/myprofile">{nama}</a>
            <a class="nav-link" onClick={() => handleLogout()}>Logout</a>
        </div>
    </div>
</nav>
    </div>
  )
}

export default Navbar
