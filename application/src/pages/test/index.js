import { Link } from 'react-router-dom'; 

const Test = () => {

    return (
        <div>
            <h1>
                Vision Test
            </h1>
            <Link to="/">
                <button>Home Page</button>
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

export default Test;