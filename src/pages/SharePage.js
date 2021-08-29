import SignInPopUp from '../components/SignInPopUp';
import UploadForm from '../components/uploadForm';
import { useAuth } from "../contexts/AuthContext";
import { Alert } from 'react-bootstrap';

const SharePage = () => {
    const { currentUser, error, success } = useAuth();

    return (
        <div className="container p-5">
            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            {/* {success && <Alert variant="success">{success}</Alert>} */}
            <div>
                {currentUser===null && <SignInPopUp />}
            </div>
            <div>
                
                {currentUser!==null && <UploadForm />}
            </div>
            
        </div>
    );
}

export default SharePage;