import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from "../../services/firebase";

export default function SuggestedProfile({
  suggProfDocId,
  username,
  profileId,
  userId,
  loggedInUserdocId
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);
    // update the following array of the logged in user 
    await updateLoggedInUserFollowing(loggedInUserdocId,profileId,false);
    // update the followers array of the user who has been followed
    await updateFollowedUserFollowers(suggProfDocId,userId,false);

  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt=""
        />
        <Link to={`/profile/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <div>
        <button
          className="text-cs font-bold text-blue-medium"
          type="button"
          onClick={handleFollowUser}
        >
          Follow
        </button>
      </div>
    </div>
  ) : null;
}

SuggestedProfile.protoTypes = {
  suggProfDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserdocId: PropTypes.string.isRequired,
};
