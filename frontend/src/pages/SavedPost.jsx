import React from 'react'

export default function SavedPost({addedPost}) {
  return (
    <div>
      <div><center><h2>Saved Post</h2></center></div>

      
        <div>
        <h1>{addedPost.title}</h1>
        <h2>{addedPost.userId}</h2>
        <img src={addedPost.poster} />
        <p>{addedPost.content}</p>
        <h2>{new Date(addedPost.createdAt).toLocaleDateString()}</h2>
        </div>
      
    </div>
  )
}
