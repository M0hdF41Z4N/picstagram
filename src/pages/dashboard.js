import { useEffect } from "react";
import PropTypes from 'prop-types';
// Importing necessary Components
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";
// Getting hooks
import useUser from '../hooks/use-users';
// Getting Context
import LoggedInUserContext from '../context/logged-in-user';

// Exporting Dashboard page
export default function Dashboard({ user: loggedInUser }) {
    const { user, setActiveUser } = useUser(loggedInUser.uid);
    // Setting up the title of the page
    useEffect(()=>{
        document.title = 'Procode';

    },[]);

    return (
        <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
            <div className="bg-gray-background">
                <Header/>
                <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                    <Timeline />
                    <Sidebar />
                </div>
            </div>
        </LoggedInUserContext.Provider>
    )
}

Dashboard.propTypes = {
    user: PropTypes.object.isRequired
  };