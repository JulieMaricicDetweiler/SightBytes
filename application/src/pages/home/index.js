import { Link } from 'react-router-dom'; 

const Home = () => {

    return (
        <div>
            <h1>
                Home Page
            </h1>
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