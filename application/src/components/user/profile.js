import * as React from 'react';
import Button from '@mui/material/Button';
import firebaseConfig from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const [authUser, setAuthUser] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseConfig.auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return unsubscribe; // Unsubscribe when component unmounts
    }, []);


    const signOut = () => {
        firebaseConfig.auth.signOut(firebaseConfig.auth).then(() => {
          console.log("Sign out successful");
          setAuthUser(null);
          navigate('/login');
        }).catch((error) => {
          console.log("Error signing out");
        });
      }

    return (
        <div>
            {authUser ? 
                <> 
                    {authUser.uid} "User is logged in" HAHA This is my profile.
        
                </>:    
                    "User is not logged in"
            }
        </div>
    );
}

export default Profile;