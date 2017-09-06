import React from 'react'
import './App.css'
import {Link} from 'react-router-dom'

const NotFound = () =>{
  return (
    <div className="page-not-found-title">
       <div className="page-not-found-message">
          <Link className="goto-main-page" to='/'>Go to My Reads</Link>
         <h1>404 Not Found </h1>
       </div>
       <h1> The page you are looking for does not exist! </h1>
    </div>
  )
}

export default NotFound
