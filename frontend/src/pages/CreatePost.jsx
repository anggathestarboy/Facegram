import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [form, setForm] = useState({
        caption: "",
        attachments: []
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handle caption
    const handleChange = (e) => {
        setForm({
            ...form,
            caption: e.target.value
        });
    };

    // Handle file array
    const handleFileChange = (e) => {
        setForm({
            ...form,
            attachments: Array.from(e.target.files)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("caption", form.caption);

            form.attachments.forEach((file) => {
                formData.append("attachments[]", file);
            });

            const res = await axios.post(
                "http://127.0.0.1:8000/api/v1/posts",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            navigate('/myprofile');

        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to create post"
            );
            console.log(error.response);
        }
    };

    return (
        <div>
            <Navbar />

            <main className="mt-5">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="card">
                                <div className="card-header bg-transparent py-3">
                                    <h5 className="mb-0">Create new post</h5>
                                </div>

                                <div className="card-body">
                                    {error && (
                                        <div className="alert alert-danger">
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-2">
                                            <label htmlFor="caption">Caption</label>
                                            <textarea
                                                className="form-control"
                                                name="caption"
                                                id="caption"
                                                rows="3"
                                                value={form.caption}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="attachments">Image(s)</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="attachments"
                                                name="attachments"
                                                multiple
                                                onChange={handleFileChange}
                                            />
                                        </div>

                                        <button type="submit" className="btn btn-primary w-100">
                                            Share
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreatePost;
