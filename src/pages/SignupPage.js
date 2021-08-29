import { Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from 'react-router'

const SignupPage = () => {
    const history = useHistory();
    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const { signup, signupError, currentUser } = useAuth();

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    //sign the user up.
    async function handleSubmit(e) {
        e.preventDefault()
    
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
          return setError("Passwords do not match")
        }
    
        try {
          setError("");
          setLoading(true); 
          await signup(emailRef.current.value, usernameRef.current.value, passwordRef.current.value); //sign up
          history.replace("/")
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
                            <h1 className='mb-4'>Sign up</h1>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input required type="email" className="form-control" id="email" placeholder="email" ref={emailRef}/>
                                    <label for="email" className="form-label">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input required type="text" className="form-control" id="username" placeholder="username" ref={usernameRef}/>
                                    <label for="username" className="form-label">Username</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input required type="password" className="form-control" id="password" placeholder="password" ref={passwordRef}/>
                                    <label for="password" className="form-label">Password</label>
                                    
                                </div>
                                <div className="form-floating mb-3">
                                    <input required type="password" className="form-control" id="confirmPassword" placeholder="password" ref={confirmPasswordRef}/>
                                    <label for="confirmPassword" className="form-label">Confirm password</label>
                                </div>
                                {signupError && <Alert variant="danger">{signupError}</Alert>}
                                <button disabled={loading} className='btn btn-outline-dark rounded-1 mb-4' type='submit'>
                                Sign up
                                </button>
                            </form>
                            <div>
                                Already have an account? <Link to="/signin">Sign in</Link>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default SignupPage;