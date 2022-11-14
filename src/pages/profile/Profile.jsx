import './profile.scss'
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from '../../components/posts/Posts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';
import Update from '../../components/Update/Update';
import { DotLoader } from 'react-spinners'

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false)
  const { currentUser } = useContext(AuthContext)
  const { id } = useParams()
  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery(['user'], async () => {
    const response = await makeRequest.get(`/user/find/${id}`)
    return response.data
  })

  const { data: relationshipData } = useQuery(['relationship'], async () => {
    const response = await makeRequest.get(`/relationship?followedUserId=${id}`)
    return response.data
  })

  const mutation = useMutation(
    (following) => {
      if(following){
        return makeRequest.delete(`/relationship?followUserId=${id}`)
      }

      return makeRequest.post(`/relationship?followUserId=${id}`)
    },
    {
        onSuccess: () => {
          //Invalidate and refetch
          queryClient.invalidateQueries(["relationship"])
        },
    })

    const handleFollow = () => {
      mutation.mutate(relationshipData.includes(currentUser.id))
    }

  return (
    <div className='profile'>
      {isLoading
        ? <div className="loading-container">
            <DotLoader
              color='#6260e0'
              loading={isLoading}
              size={150}
            />
          </div>
        : (
        <>
          { data.coverPic || data.profilePic
            ? <div className="images">
                <img src={data.coverPic} className='cover' alt="" />
                <img src={data.profilePic} className='profilePic' alt="" />
              </div> 
            : null
          }
          
          <div className="profileContainer">
            <div className="user-info">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon/>
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon/>
                    <span>{data.website}</span>
                  </div>
                </div>
                {currentUser.id === parseInt(id) ? (
                  <button onClick={() => setOpenUpdate(true)}>UPDATE</button> 
                ) : (
                  <button onClick={handleFollow}>{relationshipData?.includes(currentUser.id) ? "FOLLOWING" : "FOLLOW"}</button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon/>
                <MoreVertIcon/>
              </div>
            </div>
            <Posts userId={id}/>
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/> }
    </div>
  )
}

export default Profile