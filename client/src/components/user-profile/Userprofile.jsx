import "./Userprofile.css";
import { NavLink, Outlet } from "react-router-dom";

function Userprofile() {
  return (
    <>
     <NavLink to='articles' className='fs-4 article text-white bg-dark nav-link mt-4'>Articles</NavLink>
      <Outlet />
    </>
  );
}

export default Userprofile;