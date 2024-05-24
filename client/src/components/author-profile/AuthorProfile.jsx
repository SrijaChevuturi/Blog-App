import "./AuthorProfile.css";
import { NavLink, Outlet } from "react-router-dom";
import {useSelector} from 'react-redux';


function AuthorProfile() {
  let {currentUser}=useSelector(state=>state.userAuthorLoginReducer)
 
  return (
    <div className="author-profile">
      <ul className="nav  justify-content-around fs-4 mt-4 mb-3">
        <li className="nav-item articles bg-dark text-white">
          <NavLink
            className="nav-link"
            to={`articles-by-author/${currentUser.username}`}
            style={{ color: "var(--dark-green)" }}
          >
            Articles
          </NavLink>
        </li>
        <li className="nav-item articles bg-dark text-white">
          <NavLink
            className="nav-link"
            to="new-article"
            style={{ color: "var(--dark-green)" }}
          >
            Add new
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default AuthorProfile;