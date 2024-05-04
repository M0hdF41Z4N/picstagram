import { useState,useEffect,useContext } from "react";
import { getUserByUserId,getPhotosByFollower } from "../services/firebase";
// import UserContext from "../context/user";

export default function usePhotos(user)  {
    const [photos, setPhotos] = useState([]);
    // const {
    //     user : {uid: userId = ''}
    // } = useContext(UserContext);


    useEffect(()=> {
        async function getTimelinePhotos() {
            // const [{following}] = await getUserByUserId(user?.userId);
            if (user?.following?.length > 0) {
                const followedUserPhotos = await getPhotosByFollower(user?.uid,user?.following );
                followedUserPhotos.sort((a,b)=> b.dateCreated - a.dateCreated);
                setPhotos(followedUserPhotos);
            }
        }

        getTimelinePhotos();
    },[user]);

    return {photos};
}