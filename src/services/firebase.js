import {firebase ,FieldValue} from '../lib/firebase';

// To check is user is already have an account
export async function doesUsernameExist(username) {
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username','==',username)
    .get();

    return result.docs.map((user) => user.data().length >0);
}

// To check is user is already have an account
export async function getUserByUsername(username) {
  const result = await firebase
  .firestore()
  .collection('users')
  .where('username','==',username)
  .get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
  // return user.length > 0 ? user : false;
  return user;
}

// Getting user by id from firestore using userId passed from auth
export async function getUserByUserId(userId) {
    const result = await firebase
    .firestore()
    .collection('users')
    .where('userId','==',userId)
    .get();
    const user = result.docs.map((item) =>( {
        ...item.data(),
        docId : item.id
    }));
    return user;
}

// Getting Suggested Profiles
export async function getSuggestedProfiles(userId,following) {
    const result = await firebase
    .firestore()
    .collection('users')
    .limit(10)
    .get();
    
    return result.docs
        .map((user) =>( { ...user.data(), docId : user.id }))
        .filter((profile) =>  profile.userId !== userId && !following.includes(profile.userId));
}

// Updating the following  and followers Asynchronously

export async function updateLoggedInUserFollowing(
  loggedInUserdocId, // currently logged in user doc id
  profileId, // the user that user requested to follow
  isFollowingProfile // true/false (am i currently following this person)
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserdocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

export async function updateFollowedUserFollowers(
  suggProfDocId, // the user that is following
  loggedInUserdocId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(suggProfDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserdocId)
        : FieldValue.arrayUnion(loggedInUserdocId )
    });
}

export async function getPhotosByFollower(userId,following) { 
  const result = await firebase
   .firestore()
   .collection('photos')
   .where('userId','in',following)
   .get();
   
  const photos = result.docs.map((photo) =>( {
    ...photo.data(),
      docId : photo.id
  }));

  const photosWithUserDetails = await Promise.all(
    photos.map(async (photo) => { 
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const {username} = user[0];
      return {
      ...photo,
        username,
        userLikedPhoto
      }
    })
    );
  return photosWithUserDetails;
}

export async function getUserPhotosByUsername(user) { 
  const result = await firebase.firestore()
  .collection('photos')
  .where('userId','==',user.userId)
  .get();

  return result.docs.map((item) => ({ 
    ...item.data(),
    docId: item.id
  }));
}

export async function isUserFollowingProfile(loggedInUserUsername,profileUserId) {
  const result = await firebase
  .firestore()
  .collection('users')
  .where('username', '==' , loggedInUserUsername)
  .where('following','array-contains',profileUserId)
  .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return response.userId;
}

export async function toggleFollow(isFollowingProfile,activeUserDocId,
  profileDocId,profileUserId,followingUserId) {
    // 
    await updateLoggedInUserFollowing(activeUserDocId,profileUserId,
      isFollowingProfile);
    await updateFollowedUserFollowers(profileDocId,followingUserId
      ,isFollowingProfile);
}