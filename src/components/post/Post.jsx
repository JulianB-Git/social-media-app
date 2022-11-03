import './post.scss'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useState } from 'react';

const Post = ({ post }) => {

  const [commentShow, setCommentShow] = useState(false)

  const { user } = post

  //Temp
  const liked = false

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
              <span className='date'>1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon/>
        </div>
        <div className="content">
          <p>{post.description}</p>
          <img src={post.imageUrl} alt="" />
        </div>
        <div className="actions">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon/> : <FavoriteBorderOutlinedIcon/>}
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentShow(!commentShow)}>
            <TextsmsOutlinedIcon/>
            10 Comment
          </div>
          <div className="item">
            <ShareOutlinedIcon/>
            Share
          </div>
        </div>
        {commentShow && <Comments/>}
      </div>
    </div>
  )
}

export default Post