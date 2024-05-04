import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getUserByUsername } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import * as ROUTES from '../constants/routes';
import Header from "../components/header";
import UserProfile from "../components/profile";

export default function Profile() {
    const [user,setUser] = useState(null);
    const {username} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function checkUserExists() {
            const [user] = await getUserByUsername(username);
            if (user?.userId) { 
                setUser(user);
            }else {
                navigate(ROUTES.NOT_FOUND);
            }
         }
        checkUserExists();
         
},[username,navigate]);

    return user?.username ? (
        <div className="bg-gray-background">
            <Header/>
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} />
            </div>
        </div>

    ): null;
}