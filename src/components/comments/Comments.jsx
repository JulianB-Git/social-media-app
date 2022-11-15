import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment/moment';
import { useState } from 'react';
import { useContext } from 'react';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';
import './comments.scss'
import StockAvatar from '../../assets/StockAvatar.png'

const Comments = ({ postId }) => {

    const { currentUser } = useContext(AuthContext)
    const queryClient = useQueryClient()
    const [comment, setComment] = useState("")

    const { isLoading, data } = useQuery([`comments/${postId}`], async () => {
        const response = await makeRequest.get(`/comments?postId=${postId}`)
        return response.data
      })

      const mutation = useMutation(
      (newComment) => {        
        return makeRequest.post(`/comments?postId=${postId}`, newComment)
      },
      {
          onSuccess: () => {
            //Invalidate and refetch
            queryClient.invalidateQueries([`comments/${postId}`])
          },
      })
  
      const handleComment = e => {
          e.preventDefault()
  
          mutation.mutate({ comment })
          setComment("")
      }

    return (
        <div className='comments'>
            <div className="write-comment">
                <img src={currentUser.profilePic ? currentUser.profilePic : StockAvatar} alt="user" />
                <input 
                    type="text"
                    placeholder='Write a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}/>
                <button onClick={handleComment}>Comment</button>
            </div>
            {isLoading ? "Loading..." : data.map((comment) => (
                <div className="comment" key={comment.id}>
                    <img src={comment.user.profilePic ? comment.user.profilePic : StockAvatar} alt="" />
                    <div className="info">
                        <span>{comment.user.name}</span>
                        <p>{comment.comment}</p>
                    </div>
                    <span className='date'>{moment(comment.createdAt).fromNow()}</span>
                </div>
            ))}
        </div>
    )
}

export default Comments