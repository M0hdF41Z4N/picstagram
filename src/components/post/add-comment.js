import { useState,useContext } from "react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import PropTypes from 'prop-types';

export default function AddComment({docId, comments,setComments,commentInput}) {
    const [comment,setComment] = useState('');
    
const {firebase,FieldValue} = useContext(FirebaseContext);
    const {user 
    } = useContext(UserContext);

    const displayName = user.displayName;
    
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        const newComment = {
            displayName,
            comment,
            dateCreated: Date.now()
        }
        // await firebase.firestore().collection('comments').add(newComment);
        setComments([...comments,newComment]);
        setComment('');
        // commentInput.current.focus();
        return firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({displayName,comment})
            });
    }
    return (
        <div className="border-t border-gray-primary">
            <form onSubmit={(e) => 
                comment.length >= 1 ? handleSubmitComment(e) 
                : e.preventDefault()
            }
            className="flex justify-between pl-0 pr-5"
            method="POST"
            >
                <input
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({target}) => setComment(target.value)}
                    ref={commentInput}/>
                    <button
                        className={`text-sm  font-bold text-blue-medium 
                        ${!comment && 'opacity-25' }`}
                        disabled={comment.length<1}
                        type="button"
                        onClick={handleSubmitComment}
                     >
                        Post
                     </button>
            </form>
        </div>
    )
}

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object
}