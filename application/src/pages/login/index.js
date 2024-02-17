import { Link } from 'react-router-dom'; 
import LoginAppBar from '../../components/login/login_appbar';

const Login = () => {

    return (
        <div>
            <LoginAppBar/>
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