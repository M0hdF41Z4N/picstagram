// Importing required packages
import { Link, useNavigate} from "react-router-dom";
import { useContext , useEffect, useState } from "react";
// Importing Context
import FirebaseContext from '../context/firebase';
// Importing required Services
import { doesUsernameExist } from "../services/firebase";
// Importing Routes
import * as ROUTES from '../constants/routes';
import { getAuth, updateProfile } from "firebase/auth";

// Exporting Sign Up Page
export default function SignUp () {
    // Navigation for redirecting purposes
    const navigate = useNavigate();
    // Deconstructing required context
    const {firebase} = useContext(FirebaseContext);
    // Creating required states
    const [username,setUsername] = useState('');
    const [fullName,setFullName] = useState('');
    const [emailAddress , setEmailAddress] = useState('');
    const [password , setPassword] = useState('');
    const [error,setError] = useState('');
    // Validation Effect
    const isInvalid = password === '' || emailAddress === '';

    // Handling the Sign Up approprietly
    const handleSignUp = async (event) => {
        event.preventDefault();
        // Checking if user exists
        const usernameExists = await doesUsernameExist(username);
        if (!usernameExists.length) {
            try {

                // const auth = getAuth();
                // If not creating a user
                const createdUserResult =  await firebase
                .auth()
                .createUserWithEmailAndPassword(emailAddress,password);
                // Updating user display name
                await createdUserResult.user.updateProfile({
                    displayName : username
                });

                // Storing inside firestore
                await firebase.firestore().collection('users').add({
                    userId : createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                });
                navigate(ROUTES.DASHBOARD);
            }catch (error) { // Handling Errors
                setEmailAddress('');
                setPassword('');
                setFullName('');
                
                setError(error.message);
            }
        } else {
            // If user is pop up the message
            setUsername('');
            setError('The username is already, try Log In');
        }
       
    };

    // Setting up the title of the page
    useEffect(() => {
        document.title = 'Sign Up - Procode';
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
                <form onSubmit={handleSignUp} method="POST">
                <input
                        aria-label="Enter your username"
                        type="text"
                        placeholder="Username"
                        onChange={({target}) => setUsername(target.value)}
                        value={username}
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" />     
                    
                    <input
                        aria-label="Enter your Full name"
                        type="text"
                        placeholder="Full Name"
                        onChange={({target}) => setFullName(target.value)}
                        value={fullName}
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" />     
                        
                    <input
                        aria-label="Enter your email address"
                        type="text"
                        placeholder="Email adress"
                        onChange={({target}) => setEmailAddress(target.value)}
                        value={emailAddress}
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" />     
                        
                    <input
                    aria-label="Enter your password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" />
                    <button disabled={isInvalid} type="submit" 
                    className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`} >
                    Sign Up
                    </button>
                </form>
            </div>
            
            <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
                <p className="text-sm">Already have an account ?  {``}
                <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">Log In</Link>
                    </p>
            </div>
            </div>
        </div>
    )
}