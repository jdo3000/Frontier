import { Link } from 'react-router-dom';
import nb from './NavBar.module.css';
import frontierLogo from '../icons/mountainLogo.svg';
import { useAuth } from '../contexts/AuthContext';

const NavBar = () => {

    const { currentUser, db}  = useAuth();
    
    var currentuid = null;
    try {
        currentuid = currentUser.uid
    } catch(err) {
        console.log(err.message)
    }

    return (

        <nav className="navbar sticky-top navbar-light bg-white p-2">
            <div className="container-fluid">
                <a className="navbar-brand">
                    <img src={frontierLogo} alt="" width="40" height="40" className="d-inline-block"/>
                    <div className={nb.name}>Frontier</div>
                </a>
                <div className='nav justify-content-end' >
                    <Link className={nb.navButtons} to='/'>
                        <button className="btn btn-outline-dark rounded-0 border-white">Explore</button>
                    </Link>
                    <Link className={nb.navButtons} to='/share'>
                        <button className="btn btn-outline-dark rounded-0 border-white">Share</button>
                    </Link>
                    {
                        currentUser && <Link className={nb.navButtons} to={{ 
                            pathname: '/user/'+currentUser.displayName,
                            state: currentUser.uid}}>
                            <button className="btn btn-outline-dark rounded-0 border-white">Account</button>
                        </Link>
                    }
                    {
                        !currentUser && <Link className={nb.navButtons} to={'/signin'}>
                            <button className="btn btn-outline-dark rounded-0 border-white">Sign in</button>
                        </Link>
                    }
                </div>
            </div>
        </nav>
    );
}

export default NavBar;