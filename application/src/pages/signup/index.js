import { Link } from 'react-router-dom'; 

const Signup = () => {

    return (
        <div>
            <h1>
                Sign Up
            </h1>
            <Link to="/">
                <button>Home Page</button>
            </Link>
            <Link to="/test">
                <button>Vision Test</button>
            </Link>
            <Link to="/login">
                <button>Login Page</button>
            </Link>
        </div>
    );
}

export default Signup;