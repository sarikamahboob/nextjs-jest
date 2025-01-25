"use client"

import React, { useEffect, useState } from 'react'

const TodoAndPhotoList = () => {
  const [todos, setTodos] = useState([])
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
     .then(response => response.json())
      .then(data => setTodos(data))
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => setPhotos(data));
  }, [])
  return (
    <div>
      <h1 className='text-2xl'>Todos</h1>
      <ul>
        {
          todos.slice(0,5).map((todo:any) => (
            <li key={todo?.id}>
              {todo?.title} - {todo?.completed? "Completed" : "Pending"}
            </li>
          ))
        }
      </ul>
      <h1 className='text-2xl mt-20'>Photos</h1>
      <ul>
        {
          photos.slice(0,5).map((photo:any) => (
            <li key={photo?.id}>
              {photo?.title}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default TodoAndPhotoList