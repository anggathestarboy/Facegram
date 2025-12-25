import React, { useEffect, useState, useCallback, useRef } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

const Home = () => {
  const token = localStorage.getItem('token')
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [size] = useState(10)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const observer = useRef()

  const getPosts = useCallback(async (pageNum) => {
    
    if (loading || !hasMore) return
    
    setLoading(true)
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/v1/posts?page=${pageNum}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }   
      })
      
      const newPosts = res.data.posts
      
     
      if (newPosts.length < size) {
        setHasMore(false)
      }
      
      
      if (pageNum === 1) {
        setPosts(newPosts)
      } else {
      
        setPosts(prev => [...prev, ...newPosts])
      }
      
    } catch (error) {
      console.error('Error fetching posts:', error)
      
    } finally {
      setLoading(false)
      setInitialLoad(false)
    }
  }, [token, size, loading, hasMore])

  // Initial load
  useEffect(() => {
    if (token) {
      getPosts(1)
    } else {
      // Handle case where token doesn't exist
      console.error('No token found')
    }
  }, [token])

  // Setup intersection observer for infinite scroll
  const lastPostElementRef = useCallback(node => {
    if (loading) return
    
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => {
          const nextPage = prevPage + 1
          getPosts(nextPage)
          return nextPage
        })
      }
    })
    
    if (node) observer.current.observe(node)
  }, [loading, hasMore, getPosts])

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} days ago`
    }
  }

  return (
    <div>
      <Navbar/>

      <main className="mt-5">
        <div className="container py-5">
          <div className="row justify-content-between">
            <div className="col-md-8">
              <h5 className="mb-3">News Feed</h5>
              
              {initialLoad ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading posts...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="card">
                  <div className="card-body text-center py-5">
                    <p className="text-muted mb-0">No posts yet</p>
                  </div>
                </div>
              ) : (
                posts.map((p, index) => {
                  // If it's the last post, attach the ref for infinite scroll
                  if (posts.length === index + 1) {
                    return (
                      <div 
                        key={p.id} 
                        ref={lastPostElementRef}
                        className="card mb-4"
                      >
                        <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                          <h6 className="mb-0">{p.user.full_name}</h6>
                          <small className="text-muted">{formatDate(p.created_at)}</small>
                        </div>
                        <div className="card-body">
                          {p.attachments.length > 0 && (
                            <div className="card-images mb-2">
                              {p.attachments.map((gambar, imgIndex) => (
                                <img 
                                  key={gambar.id} 
                                  src={`http://127.0.0.1:8000/storage/${gambar.storage_path}`} 
                                  alt={`Post by ${p.user.username} ${imgIndex + 1}`} 
                                  className="w-100 mb-2 rounded"
                                  style={{ maxHeight: '500px', objectFit: 'cover' }}
                                />
                              ))}
                            </div>
                          )}
                          <p className="mb-0">
                            <b>
                              <a href={`/user/${p.user.username}`} className="text-decoration-none">
                                @{p.user.username}
                              </a>
                            </b>
                            {' '}{p.caption}
                          </p>
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div key={p.id} className="card mb-4">
                        <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                          <h6 className="mb-0">{p.user.full_name}</h6>
                          <small className="text-muted">{formatDate(p.created_at)}</small>
                        </div>
                        <div className="card-body">
                          {p.attachments.length > 0 && (
                            <div className="card-images mb-2">
                              {p.attachments.map((gambar, imgIndex) => (
                                <img 
                                  key={gambar.id} 
                                  src={`http://127.0.0.1:8000/storage/${gambar.storage_path}`} 
                                  alt={`Post by ${p.user.username} ${imgIndex + 1}`} 
                                  className="w-100 mb-2 rounded"
                                  style={{ maxHeight: '500px', objectFit: 'cover' }}
                                />
                              ))}
                            </div>
                          )}
                          <p className="mb-0">
                            <b>
                              <a href={`/user/${p.user.username}`} className="text-decoration-none">
                                @{p.user.username}
                              </a>
                            </b>
                            {' '}{p.caption}
                          </p>
                        </div>
                      </div>
                    )
                  }
                })
              )}

              {loading && hasMore && (
                <div className="text-center py-3">
                  <div className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="visually-hidden">Loading more posts...</span>
                  </div>
                  <p className="text-muted mt-2">Loading more posts...</p>
                </div>
              )}

              {!hasMore && posts.length > 0 && (
                <div className="text-center py-4">
                  <p className="text-muted">You've seen all posts</p>
                </div>
              )}
            </div>

            <div className="col-md-4">
              <div className="request-follow mb-4">
                <h6 className="mb-3">Follow Requests</h6>
                <div className="request-follow-list">
                  <div className="card mb-2">
                    <div className="card-body d-flex align-items-center justify-content-between p-2">
                      <a href="user-profile-private.html">@laychristian92</a>
                      <a href="" className="btn btn-primary btn-sm">
                        Confirm
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="explore-people">
                <h6 className="mb-3">Explore People</h6>
                <div className="explore-people-list">
                  <div className="card mb-2">
                    <div className="card-body p-2">
                      <a href="user-profile-private.html">@davidnaista</a>
                    </div>
                  </div>
                  <div className="card mb-2">
                    <div className="card-body p-2">
                      <a href="user-profile-private.html">@superipey</a>
                    </div>
                  </div>
                  <div className="card mb-2">
                    <div className="card-body p-2">
                      <a href="user-profile-private.html">@lukicenturi</a>
                    </div>
                  </div>
                  <div className="card mb-2">
                    <div className="card-body p-2">
                      <a href="user-profile-private.html">@_erik3010</a>
                    </div>
                  </div>
                  <div className="card mb-2">
                    <div className="card-body p-2">
                      <a href="user-profile-private.html">@asawgi</a>
                    </div>
                  </div>
                  <div className="card mb-2">
                    <div className="card-body p-2">
                      <a href="user-profile-private.html">@irfnmaulaa</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home