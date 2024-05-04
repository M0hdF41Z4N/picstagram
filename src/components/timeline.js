import Skeleton  from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import "react-loading-skeleton/dist/skeleton.css";
import Post from "./post";
import { useContext } from "react";

import LoggedInUserContext from "../context/logged-in-user";

export default function Timeline() {
    const {user 
    } = useContext(LoggedInUserContext);
    const {photos} = usePhotos(user);
    return (
        <div className="container col-span-2">
            {!photos ? (
                <>             
                <Skeleton count={4} width={640} height={600} className="mb-5"/>          
                </>
            ):
            photos.length > 0 ? (
                photos.map((content) => 
                <Post key={content.docId} content={content}/>
                )
            ) : (
                <p className="text-center text-2xl">Follow people to see posts</p>
            )
            }
        </div>
    );
}