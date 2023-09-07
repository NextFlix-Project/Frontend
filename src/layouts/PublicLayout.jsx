import NavBar from "../components/navbar/NavBar";
import { Outlet } from "react-router-dom";
import './PublicLayout.css';

const PublicLayout = () => {
  return (
    <div className='main-layout'> 
      <NavBar />
    
        <Outlet />
       
    </div>
   
  );
};

export default PublicLayout;
