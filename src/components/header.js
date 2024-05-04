// Getting packages
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
// Getting context
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
// Getting routes
import * as ROUTES from "../constants/routes";
import useUser from "../hooks/use-users";
import AddPost from "./post/add-post";


// Exporting Header component for whole app
export default function Header() {
    // Deconstructing firebase | user context
    const {firebase} = useContext(FirebaseContext);
    const { user : loggedInUser} = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    const username = user?.username;
    
    // Function for Signing out the user
    function handleSignOut() {
        // Signing out the user
        firebase.auth().signOut().then(() => {
            // On successful  sign-out.
          }).catch((error) => {
            // In case of any error occured.
            console.error("Error catched",error);
          });
    }

    const [modal,setModal] = useState(false);
    // Function to Open popup for create post
    function togglePopup() { 
        setModal(!modal);
    }


    return (
        <header className="h-16 bg-white border-b border-gray-primary mb-8">
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full">
                    <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
                        <h1 className="flex jusity-center w-full">
                            <Link to={ROUTES.DASHBOARD} aria-label="Procode logo">
                                <img src="/images/logo.png" alt="Procode" className="mt-2 w-6/12" />
                            </Link>
                        </h1>
                    </div>
                    <div className="text-gray-700 text-center flex items-center align-items">
                        {user ? (
                            <>
                             
                                <AddPost togglePopup={togglePopup} />
                            
                            <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 mr-6 text-black-light cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </Link>
                            <button
                                type="button"
                                title="Sign Out"
                                onClick={handleSignOut}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleSignOut();   
                                    }
                                } }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 mr-6 text-black-light cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
                            </button>
                            
                            <div className="flex items-center cursor-pointer">
                                <Link to={`/profile/${username}`}>
                                    <img 
                                        className="rounded-full h-8 w-8 flex"
                                        src={`/images/avatars/${username}.jpg`}
                                        alt={`${username} profile`}
                                    />
                                </Link>
                            </div>
                            </>
                        ) : ( <>
                        <Link to={ROUTES.LOGIN} >
                            <button type="button" className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8">Log In</button>
                        </Link>
                        <Link to={ROUTES.LOGIN}>
                            <button type="button" className="font-bold text-sm rounded text-blue-medium w-20 h-8">Sign In</button>
                        </Link>
                        </> )
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}


// TODO
// Handling Signout Properly