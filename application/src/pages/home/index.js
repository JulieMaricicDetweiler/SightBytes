import { Link } from 'react-router-dom'; 
import ResponsiveAppBar from '../../components/home/home_appbar';
import HomeContainer from '../../components/home/home_maincontainer';

const Home = () => {

    return (
        <div>
            <ResponsiveAppBar/>
            <HomeContainer/>
        </div>
    );
}

export default Home;