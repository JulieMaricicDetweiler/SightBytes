import { Link } from 'react-router-dom'; 

const Login = () => {

    return (
        <div>
            <h1>
                Login
            </h1>
            <Link to="/">
                <button>Home Page</button>
            </Link>
            <Link to="/signup">
                <button>Create Account</button>
            </Link>
        </div>
    );
}

export default Login;