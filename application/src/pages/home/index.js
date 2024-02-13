import { Link } from 'react-router-dom'; 
import ResponsiveAppBar from '../../components/home/home_appbar';
import HomeContainer from '../../components/home/home_maincontainer';

const Home = () => {

    return (
        <div>
            <ResponsiveAppBar/>
            <HomeContainer/>
            <Link to="/test">
                <button>Vision Test</button>
            </Link>
            <Link to="/login">
                <button>Login Page</button>
            </Link>
            <Link to="/signup">
                <button>Create Account</button>
            </Link>
            
        </div>
    );
}

export default Home;