import { useState,useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import useUser from '../../hooks/use-users';
import { isUserFollowingProfile , toggleFollow} from '../../services/firebase';
import UserContext from '../../context/user';
import Skeleton from 'react-loading-skeleton';
import QRCode from "react-qr-code";


export default function Header({photosCount,
    followerCount,
    setFollowerCount,
    loggedInUsername,
    profile : {
        docId : profileDocId, userId : profileUserId, fullName , following ,  followers
    , username : profileUsername
    }
}) {

    const {user : loggedInUser } = useContext(UserContext) ;
    const { user } = useUser(loggedInUser?.uid);
    const [isFollowingProfile,setIsFollowingProfile] = useState(null);
    const activeBtnFollow = user?.username && user?.username !== profileUsername;


    const currentURL = window.location.href;
    
    const handleToggleFollow = async  () => { 
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount-1 : followerCount +1
        })

        await toggleFollow(isFollowingProfile,user.docId,profileDocId
            ,profileUserId,user.userId);
    }

    useEffect(()=> {
        const isLoggedInUserFollowingProfile = async() => { 
            const isFollowing = await isUserFollowingProfile(user?.username,profileUserId);
            setIsFollowingProfile(!!isFollowing);
        };
        if (user?.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }
    },[user?.username,profileUserId]);

    return <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
        <div className='container flex justify-center items-center'>
            { profileUsername ? 
            ( <img className='rounded-full h-40 w-40 flex'
            alt={`${user?.username} profile`}
            src={`/images/avatars/${profileUsername}.jpg`}
            />
        ) : (<Skeleton circle height={150} width={150} count={1} />) }
        </div>
        <div className="flex items-center justify-center flex-col col-span-2">
            <div className='container flex items-center'>
                <p className='text-2xl mr-4'>{profileUsername}</p>
                {activeBtnFollow && (
                    <button 
                    className='bg-blue-medium font-bold text-sm rounded
                    text-white w-20 h-8'
                    type='button'
                    onClick={handleToggleFollow}>
                        {isFollowingProfile ? 'Unfollow' : 'Follow'}
                    </button>
                )}
            {/* Temporary */}
            <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
                <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={currentURL}
                viewBox={`0 0 256 256`}
                />
            </div>
            </div>
            <div className="container flex mt-4">
                {followers === undefined || following === undefined ? (
                    <Skeleton count={1} width={677} height={24} />
                ): (
                    <>
                        <p className="mr-10">
                            <span className="font-bold">{photosCount}</span> photos
                        </p>
                        <p className="mr-10">
                            <span className="font-bold">{followerCount}</span>
                            {` `}{followerCount === 1 ? 'follower' : 'followers'}
                        </p>
                        <p className="mr-10">
                            <span className="font-bold">{following.length}</span> following
                        </p>
                    </>
                )}
            </div>
            <div className="container mt-4">
                <p className="font-medium">
                    {!fullName ? <Skeleton height={24} /> : fullName}
                </p>
            </div>
        </div>
    </div>;
}

Header.propTypes = {
    photosCount : PropTypes.number.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        following: PropTypes.array.isRequired,
        followers: PropTypes.array.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired,
    followerCount : PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
}