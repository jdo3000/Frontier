import custom from './UserPage.module.css';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import UserFrontiers from '../components/UserFrontiers';
import UserPinnedFrontiers from '../components/UserPinnedFrontiers';
import frontierLogo from '../icons/mountainLogo.svg';
 

const UserPage = () => {
    const location = useLocation();
    const { username } = useParams();
    const history = useHistory();
    
    const uid = location.state;
    const { signout, currentUser, db } = useAuth();
    const [ showingFrontiers, setShowingFrontiers ] = useState(true);
    const [ showingPins, setShowingPins ] = useState(false);

    var currentuid = null;
    var currentusername = null;
    
    try {
        currentuid = currentUser.uid;
        currentusername = currentUser.displayName;
    } catch(err) {
        console.log(err.message)
    }

    function displayFrontiers() {
        setShowingFrontiers(true);
        setShowingPins(false);
    }

    function displayPins() {
        setShowingFrontiers(false);
        setShowingPins(true);
    }

    async function handleSignout() {
        try {
            await signout();
            history.push('/');
        } catch(e) {
            console.log(e);
        }
    }

    return (
        
        <div className="container">
            <div className={custom.content}>

                <div className={custom.userInfo}> 
                    <div className={custom.username}>{username}</div>
                    <div className={custom.userImage}><img className={custom.img} src={frontierLogo} alt="image"/></div>
                    {currentusername === username && <button className={custom.btn} onClick={handleSignout}>Sign out</button>}
                    
                    <div >
                        <button className={custom.btn} onClick={displayFrontiers} >
                            frontiers</button>
                        <button className={custom.btn} onClick={displayPins} >
                            pins</button>
                    </div>
                        
                </div>

                <div className={custom.userContent}>
                    {showingFrontiers && <UserFrontiers uid={uid} />}
                    {showingPins && <UserPinnedFrontiers uid={uid}/>}
                </div>

            </div>
        </div>
    );
}

export default UserPage;