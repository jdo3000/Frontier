import { Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useRef, useState } from 'react';
import { useAuth } from "../contexts/AuthContext"


const SigninPage = () => {
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();

    const { signin, signinError, currentUser } = useAuth();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true); 
            await signin(emailRef.current.value, passwordRef.current.value); //sign in
            history.replace("/");
            console.log("done switching to user page")
          } catch(err) {
            setError(err.message);
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
                            <h1 className='mb-4'>Sign in</h1>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="email" placeholder="email" ref={emailRef}/>
                                    <label for="email" className="form-label">Email address</label>
                                    
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="password" placeholder="password" ref={passwordRef}/>
                                    <label for="password" className="form-label">Password</label>
                                    
                                </div>
                                {signinError && <Alert variant="danger">{signinError}</Alert>}
                                <button disabled={loading} className='btn btn-outline-dark rounded-1 mb-4' type="submit">
                                Sign in
                                </button>
                            </form>
                            <div>
                                Don't have an account? <Link to="/signup">Sign up</Link>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default SigninPage;