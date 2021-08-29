import { useAuth } from "../contexts/AuthContext";
import { Alert } from 'react-bootstrap';
import EditForm from "../components/EditForm";

const EditPage = () => {

    const { currentUser, error, success } = useAuth();

    return (
        <div className="container p-5">
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <div>
                {currentUser!==null && <EditForm />}
            </div>
            
        </div>
    );

    
}

export default EditPage;