import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
     const [form, setForm] = useState({
        full_name: "",
        username: "",
        password: "",
        bio: "",
       is_private: false
    });



    const handleCheckbox = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.checked
    });
};



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
            const res = await axios.post("http://127.0.0.1:8000/api/v1/auth/register", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.user.username);
            navigate('/home');
        } catch (error) {
            setError("Wrong Data")
            console.log(error)
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
                        <h5 class="mb-0">Register</h5>
                    </div>
                    <div class="card-body">
                        <form onSubmit={handleSubmit}>
                            <div class="mb-2">
                                <label for="full_name">Full Name</label>
                                <input type="text" class="form-control" id="full_name" onChange={handleChange} value={form.full_name} name="full_name"/>
                            </div>

                            <div class="mb-2">
                                <label for="username">Username</label>
                                <input type="text" class="form-control" onChange={handleChange} value={form.username} id="username" name="username"/>
                            </div>

                            <div class="mb-3">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" onChange={handleChange} value={form.password} id="password" name="password"/>
                            </div>

                            <div class="mb-3">
                                <label for="bio">Bio</label>
                                <textarea name="bio" id="bio" cols="30" rows="3" onChange={handleChange} value={form.bio} class="form-control"></textarea>
                            </div>

                           <div class="mb-3 d-flex align-items-center gap-2">
    <input
        type="checkbox"
        id="is_private"
        name="is_private"
        checked={form.is_private}
        onChange={handleCheckbox}
    />
    <label htmlFor="is_private">Private Account</label>
</div>

                            <button type="submit" class="btn btn-primary w-100">
                                Register
                            </button>

                            {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
                        </form>
                    </div>
                </div>

                <div class="text-center mt-4">
                    Already have an account? <a href="/">Login</a>
                </div>

            </div>
        </div>
    </div>
</main>
    </div>
  )
}

export default Register
