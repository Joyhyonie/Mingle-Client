import Header from '../components/common/Header';
import NavBar from '../components/common/Navbar';
import CommonCSS from '../css/common/Common.module.css';
import { Outlet } from "react-router-dom";

function Layout () {

    return (
        <>  
            <Header/>
            <div className={ CommonCSS.flex }>
                <NavBar/>
                <Outlet/>
            </div>
        </>
    );
}

export default Layout;