// Importing the required packages
import { useEffect , useContext ,useState } from "react";
// Importing required services
import { getUserByUserId } from "../services/firebase";

// Custom hook : To update the user if changes
export default function useUser(userId) {
    // Initializing the state
    const [activeUser,setActiveUser] = useState();

    useEffect(()=> {
        async function getUserObjByUserId(userId) {
            const [user] = await getUserByUserId(userId);
            setActiveUser(user || {});
        }
        if (userId) {
            getUserObjByUserId(userId);
        }

        // Invoking whenever the user changes
    },[userId]);

    return { user: activeUser, setActiveUser };

}