import { useState , useContext , useEffect } from "react";
// Importing required Context
import FirebaseContext from "../context/firebase";

// This function defines a custom React Hook named useAuthListener
export default function useAuthListener() {
    // Initializing the user state
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    // Deconstructing firebase context
    const {firebase} = useContext(FirebaseContext);

// ### : Need to improve below function

    // Defining Custom Hook
    useEffect(()=> {
        // Defining a listner 
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            // If authenticated user changes

            // Storing user in local storage
            if (authUser) {
                localStorage.setItem('authUser',JSON.stringify(authUser));
                // Setting up the state
                setUser(authUser);
            }else {
                // Removing from local storage
                localStorage.removeItem('authUser');
                // Updating state
                setUser(null);
            }
        })

        return () => listener(); // will flush listner while unmounting

        // Invoking in any changes in firebase
    },[firebase]);

    return {user};

}