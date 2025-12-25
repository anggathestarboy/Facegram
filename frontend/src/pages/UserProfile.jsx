import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

const UserProfile = () => {
  const { username } = useParams() // ambil username dari URL
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/v1/users/${username}`
        )
        setUser(res.data.data)
      } catch (err) {
        setError(err.response?.data?.message || 'User not found')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [username])

  if (loading) return <p className="text-center mt-5">Loading...</p>
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>

  return (
    <div>
      <Navbar />

      <main className="mt-5">
        <div className="container py-5">
          <div className="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <h5 className="mb-0">{user.name}</h5>
                <span>@{user.username}</span>
              </div>
              <small className="mb-0 text-muted">
                {user.bio || 'No bio'}
              </small>
            </div>

            <div>
              <button className="btn btn-primary w-100 mb-2">
                Follow
              </button>
              <div className="d-flex gap-3">
                <div>
                  <div className="profile-label">
                    <b>{user.posts_count}</b> posts
                  </div>
                </div>
                <div>
                  <div className="profile-label">
                    <b>{user.followers_count}</b> followers
                  </div>
                </div>
                <div>
                  <div className="profile-label">
                    <b>{user.following_count}</b> following
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* POSTS */}
          <div className="row justify-content-center">
            {user.posts.map((post) => (
              <div className="col-md-4" key={post.id}>
                <div className="card mb-4">
                  <div className="card-body">
                    <img
                      src={post.image}
                      alt="post"
                      className="w-100 mb-2"
                    />
                    <p className="mb-0 text-muted">{post.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserProfile
