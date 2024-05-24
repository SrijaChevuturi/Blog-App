import React from 'react'
import {NavLink} from 'react-router-dom'
import {} from 'H:/training/blog-app/client/src/components/navbar/Navbar.css'

import {useSelector,useDispatch} from 'react-redux'
import { resetState } from '../../redux/slices/userAuthorSlice'

function Navbar() {

  let {loginUserStatus, errorOccured, errMsg, currentUser}=useSelector(state=>state.userAuthorLoginReducer)
  
  let dispatch=useDispatch();
  

  function singOut(){
    //remove token from local storage
    localStorage.removeItem('token')
    dispatch(resetState())

  }
  
  return (
    <div>
         <nav className="navbar bg-dark d-flex justify-content-between">
        
        <img src="https://i.pinimg.com/originals/8f/5a/4a/8f5a4a5caaaabb03f6821af852d99af1.jpg" alt="" className="m-2 mx-4 rounded-circle"/>
    
        
        <ul className="nav justify-content-end">
          
          {loginUserStatus===false ? (
          <>
          <li className="nav-item">
            <NavLink className="text-white nav-link fs-4" to="Home">
              Home
            </NavLink>
          </li>

           <li className="nav-item">
            <NavLink className="text-white nav-link fs-4" to="Register">
              Register
            </NavLink>
          </li>

           <li className="nav-item">
            <NavLink className="text-white nav-link fs-4" to="Login">
              login
            </NavLink>
          </li>
          </>
      ) : (
          <li className="nav-item">
            <p className='fs-3'>Welcome {currentUser.username}</p>
            <NavLink className="text-white nav-link fs-4" to="Home" onClick={singOut}>
              Signout
            </NavLink>
          </li>
          )
      }

        </ul>

      </nav>
    </div>
  )
}


export default Navbar
