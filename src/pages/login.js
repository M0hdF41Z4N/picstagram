import { Link, useNavigate} from "react-router-dom";
// Importing required packages
import { useContext , useEffect, useState } from "react";
// Importing Context
import FirebaseContext from '../context/firebase';
// Importing routes
import * as ROUTES from '../constants/routes';


// Exporting Login Page
export default function Login () {
    // Navigation for redirecting purposes
    const navigate = useNavigate();
    // Deconstructing required context
    const {firebase} = useContext(FirebaseContext);
    // Initializing Required states
    const [emailAddress , setEmailAddress] = useState('');
    const [password , setPassword] = useState('');
    const [error,setError] = useState('');
    // For validation effect
    const isInvalid = password === '' || emailAddress === '';

    // Function to handle login 
    const handleLogin = async (event) => {
        
        event.preventDefault();

        try {
            // Signing in the user
            await firebase.auth().signInWithEmailAndPassword(emailAddress,password);
            // On successfull login redirecting to dashboard
            navigate(ROUTES.DASHBOARD);
        }catch (error) { // If not able to login error handling
            setEmailAddress('');
            setPassword('');
            setError(error.message);
        }
    };

    // Setting up the title of the page
    useEffect(() => {
        document.title = 'Login - Procode';
    },[]);

    return (
        
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="\images\iphone-with-profile.jpg" alt="iPhone with Instagram app" />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4">
                <h1 className="flex justify-center w-full">
                    <img src="\images\logo.png" alt="Instagram" className="mt-2" />
                </h1>
                {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
                <form onSubmit={handleLogin} method="POST">
                    <input
                        aria-label="Enter your email address"
                        type="text"
                        placeholder="Email adress"
                        onChange={({target}) => setEmailAddress(target.value)}
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" />     
                    <input
                    aria-label="Enter your password"
                    type="password"
                    placeholder="Password"
                    onChange={({target}) => setPassword(target.value)}
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" />
                    <button disabled={isInvalid} type="submit" 
                    className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`} >
                    Login
                    </button>
                </form>
            </div>
            
            <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
                <p className="text-sm">Don't have an account ? {``}
                <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">Sign up</Link>
                    </p>
            </div>
            </div>
        </div>
    )
}