import React, { useEffect, useEffectEvent, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const MyProfile = () => {
    let token = localStorage.getItem("token");
    let name = localStorage.getItem("name");

    const [profile, setProfile] = useState({});

    const getMyProfile = async () => {
        const res = await axios.get(
            `http://127.0.0.1:8000/api/v1/users/${name}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setProfile(res.data);
    };

    useEffect(() => {
        getMyProfile();
    }, {});

    console.log(profile);

    return (
        <div>
            <Navbar />

            <main class="mt-5">
                <div class="container py-5">
                    <div class="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
                        <div>
                            <div class="d-flex align-items-center gap-2 mb-2">
                                <h5 class="mb-0">{profile.full_name}</h5>
                                <span>{profile.username}</span>
                            </div>
                            <small class="mb-0 text-muted">{profile.bio}</small>
                        </div>
                        <div>
                            <a
                                href="/post/create"
                                class="btn btn-primary w-100 mb-2"
                            >
                                + Create new post
                            </a>
                            <div class="d-flex gap-3">
                                <div>
                                    <div class="profile-label">
                                        <b>{profile.posts_count}</b> posts
                                    </div>
                                </div>
                                <div class="profile-dropdown">
                                    <div class="profile-label">
                                        <b> {profile.follower_count}</b>{" "}
                                        followers
                                    </div>
                                    <div class="profile-list">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="profile-user">
                                                    <a href="user-profile-private.html">
                                                        @davidnaista
                                                    </a>
                                                </div>
                                                <div class="profile-user">
                                                    <a href="user-profile-private.html">
                                                        @superipey
                                                    </a>
                                                </div>
                                                <div class="profile-user">
                                                    <a href="user-profile-private.html">
                                                        @lukicenturi
                                                    </a>
                                                </div>
                                                <div class="profile-user">
                                                    <a href="user-profile-private.html">
                                                        @_erik3010
                                                    </a>
                                                </div>
                                                <div class="profile-user">
                                                    <a href="user-profile-private.html">
                                                        @asawgi
                                                    </a>
                                                </div>
                                                <div class="profile-user">
                                                    <a href="user-profile-private.html">
                                                        @irfnmaulaa
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="profile-dropdown">
                                    <div class="profile-label">
                                        <b>{profile.following_count}</b>{" "}
                                        following
                                    </div>
                                    <div class="profile-list">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="profile-user">
                                                    <a href="user-profile-private.html">
                                                        @davidnaista
                                                    </a>
                                                </div>
                                                <div class="profile-user">
                                                    <a href="user-profile-private.html">
                                                        @superipey
                                                    </a>
                                                </div>
                                                <div class="profile-user">
                                                    <a href="user-profile-private.html">
                                                        @lukicenturi
                                                    </a>
                                                </div>
                                                <div class="profile-user">
                                                    <a href="user-profile-private.html">
                                                        @_erik3010
                                                    </a>
                                                </div>
                                                <div class="profile-user">
                                                    <a href="user-profile-private.html">
                                                        @asawgi
                                                    </a>
                                                </div>
                                                <div class="profile-user">
                                                    <a href="user-profile-private.html">
                                                        @irfnmaulaa
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        {profile?.posts?.map((p) => (
                            <>
                                <div class="col-md-4">
                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <div class="card-images mb-2">
                                                {p.attachments.map((gambar) => (
                                                    <>
                                                        <img
                                                            src={`http://127.0.0.1:8000/storage/${gambar.storage_path}`}
                                                            alt="image"
                                                            class="w-100"
                                                        />
                                                    </>
                                                ))}
                                            </div>
                                            <p class="mb-0 text-muted">
                                                {p.caption}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MyProfile;
