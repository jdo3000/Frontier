import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SignInPage = () => {
    return (
        <div > 
            <div className='d-flex align-items-center justify-content-center'
            style={{ minHeight: "100vh"}}>
                <Card>
                    <Card.Body>
                        <div className='text-center p-4'>

                            <h1 className='mb-4'>You are not signed in...</h1>
                            <Link to="/signin">
                                <button type="button" className="btn btn-outline-dark rounded-1 mb-4">Sign in</button>
                            </Link>
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

export default SignInPage;