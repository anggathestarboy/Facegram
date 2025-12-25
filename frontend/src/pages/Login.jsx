import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault() 
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/v1/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.user.username);
            navigate('/home');
        } catch (error) {
            setError("Wrong username or password")
        }
    }



  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div class="container">
        <a class="navbar-brand m-auto" href="index.html">Facegram</a>
    </div>
</nav>

<main class="mt-5">
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                        <h5 class="mb-0">Login</h5>
                    </div>
                    <div class="card-body">
                        <form onSubmit={handleSubmit}>
                            <div class="mb-2">
                                <label for="username">Username</label>
                                <input type="text" class="form-control" id="username" onChange={handleChange} value={form.username} name="username"/>
                            </div>

                            <div class="mb-3">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" onChange={handleChange} value={form.password} name="password"/>
                            </div>

                            <button type="submit" class="btn btn-primary w-100">
                                Login
                            </button>

                            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                        </form>
                    </div>
                </div>

                <div class="text-center mt-4">
                    Don't have account? <a href="/register">Register</a>
                </div>

            </div>
        </div>
    </div>
</main>

    </div>
  )
}

export default Login
