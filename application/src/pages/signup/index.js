import { Link } from 'react-router-dom'; 
import DefaultAppBar from '../../components/shared/appbar';
import SignUp from '../../components/signup/signup';

const Signup = () => {

    return (
        <div>
            <DefaultAppBar/>
            <SignUp/>
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