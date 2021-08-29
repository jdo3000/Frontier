import { Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useRef, useState } from 'react';
import { useAuth } from "../contexts/AuthContext"

const AdminPage = () => {

    const emailRef = useRef();

    const { addAdmin } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true); 
            //make admin
            await addAdmin(emailRef);
            history.push("/");
          } catch(err) {
            setError("Unable to add admin");
            console.log(err);
          }
      
          setLoading(false)
    }

    return (
        <div > 
            <div className='d-flex align-items-center justify-content-center'
            style={{ minHeight: "100vh"}}>
                <Card>
                    <Card.Body>
                        <div className='text-center p-4'>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="email" placeholder="email" ref={emailRef}/>
                                    <label for="email" className="form-label">Email address</label>
                                    
                                </div>
                                {/* <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="password" placeholder="password" ref={passwordRef}/>
                                    <label for="password" className="form-label">Password</label>
                                    
                                </div> */}
                                <button disabled={loading} className='btn btn-primary w-100' type="submit">
                                Make admin
                                </button>
                            </form>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default AdminPage;