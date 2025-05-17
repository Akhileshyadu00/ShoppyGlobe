import React from 'react'
import { Link } from 'react-router-dom'

function Notfound() {
  return (
    <>
       <div className="not-found">
        <h2>404 - Page Not Found</h2>
         <Link to="/">Back to Home</Link>
       </div>
    </>
  )
}

export default Notfound
