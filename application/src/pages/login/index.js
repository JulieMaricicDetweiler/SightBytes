import { Link } from 'react-router-dom'; 
import LoginAppBar from '../../components/shared/appbar';
import SignIn from '../../components/login/login_signin';

const Login = () => {

    return (
        <div>
            <LoginAppBar/>
            <SignIn/>
        </div>
    );
}

export default Login;