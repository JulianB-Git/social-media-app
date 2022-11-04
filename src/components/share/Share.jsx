import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const Share = () => {

    const [file, setFile] = useState(null)
    const [description, setDescription] = useState('')

    const {currentUser} = useContext(AuthContext)
    const queryClient = useQueryClient()

    const mutation = useMutation(
    async (newPost) => {        
      if(file !== null){
        const uploadUrl = await makeRequest.get(`/file/generate-upload-url/${newPost.uuid}`)
        await axios.put(uploadUrl.data, file)

        return makeRequest.post('/post/', {...newPost, imageUrl: `https://social-benade-bucket.s3.amazonaws.com/${newPost.uuid}`})
      }
      
      return makeRequest.post('/post/', newPost)
    },
    {
        onSuccess: () => {
          setFile(null)
          setDescription('')
          //Invalidate and refetch
          queryClient.invalidateQueries(["posts"])
        },
    })

    const handleShare = e => {
        e.preventDefault()

        mutation.mutate({ uuid: uuidv4(), description })
    }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={currentUser.profilePic}
              alt=""
            />
            <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} value={description} onChange={ e =>  setDescription(e.target.value)}/>
          </div>
          <div className="right">
            {file && <img className="file" alt="" src={URL.createObjectURL(file)}/>}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={ e =>  setFile(e.target.files[0])}/>
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;