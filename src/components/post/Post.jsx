import './post.scss'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useContext, useState } from 'react';
import moment from 'moment/moment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';

const Post = ({ post }) => {

  const { currentUser } = useContext(AuthContext)
  const [commentShow, setCommentShow] = useState(false)
  const [menuShow, setMenuShow] = useState(false)
  const { user } = post
  const queryClient = useQueryClient()

  const { isLoading, data } = useQuery(['likes', post.id], async () => {
    const response = await makeRequest.get(`/likes?postId=${post.id}`)
    return response.data
  })

  const mutation = useMutation(
    (liked) => {
      if(liked){
        return makeRequest.delete(`/likes/delete?postId=${post.id}`)
      }

      return makeRequest.post(`/likes?postId=${post.id}`)
    },
    {
        onSuccess: () => {
          //Invalidate and refetch
          queryClient.invalidateQueries(["likes"])
        },
    })

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete(`/post/${postId}`)
    },
    {
        onSuccess: () => {
          //Invalidate and refetch
          queryClient.invalidateQueries(["posts"])
        },
    })

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id))
  }

  const handleDelete = () => {
    deleteMutation.mutate(post.id)
  }

  return (
    <div className='post'>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={user.profilePic} alt="" />
            <div className="details">
              <Link to={`/profile/${user.id}`} style={{textDecoration: "none", color: "inherit"}}>
                <span className='name'>{user.name}</span>
              </Link>
              <span className='date'>{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          {post.user.id === currentUser.id && <MoreHorizIcon onClick={() => setMenuShow(!menuShow)}/>}
          {menuShow && <button onClick={handleDelete}>Delete</button>}
        </div>
        <div className="content">
          <p>{post.description}</p>
          <img src={post.imageUrl} alt="" />
        </div>
        <div className="actions">
          <div className="item">
            {isLoading ? "Loading..." : data.includes(currentUser.id)
            ?
            <FavoriteOutlinedIcon style={{color: "red"}} onClick={handleLike}/>
            : <FavoriteBorderOutlinedIcon onClick={handleLike}/>}
            {data?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentShow(!commentShow)}>
            <TextsmsOutlinedIcon/>
            Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon/>
            Share
          </div>
        </div>
        {commentShow && <Comments postId={post.id}/>}
      </div>
    </div>
  )
}

export default Post