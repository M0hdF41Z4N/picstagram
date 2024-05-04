import User from './user';
import Suggestions from "./suggestions";
import useUser from "../../hooks/use-users";
import { useContext } from 'react';
import LoggedInUserContext from '../../context/logged-in-user';

export default function Sidebar() {
    // const { user: { fullName, username, userId, following,docId } = {} } = useUser();
    const { user: { fullName, username, userId, following,docId } = {} } = useContext(LoggedInUserContext);
    // console.log('fullName, username, userId, following,docId :', fullName, username, userId, following,docId);
    // dummy values
    // const username = "karl";
    // const fullName = "karl Hawden";
    // const userId = "bis4vcR7URgqMCUhTP8Cc5WP6l82";
    // const following = ["2"];
    // const docId = "8IkLs83foduSTXz8Wbjs";
    // console.log(user.username);
    return (
       <div className="p-4">
            <User username={username} fullName={fullName} />
            <Suggestions userId={userId} following={following} loggedInUserdocId={docId} />
       </div>
    );
}

// Sidebar.whyDidYouRender = true ;