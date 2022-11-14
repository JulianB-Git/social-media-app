import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { makeRequest } from "../../axios"
import "./update.scss"
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DotLoader } from 'react-spinners'
import { useContext } from "react"
import { AuthContext } from "../../context/authContext"

const Update = ({ setOpenUpdate, user }) => {

    const { setCurrentUser } = useContext(AuthContext)
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false);
    const [cover, setCover] = useState(null)
    const [profile, setProfile] = useState(null)
    const [inputs, setInputs] = useState({
        name: "",
        city: "",
        website: ""
    })

    const mutation = useMutation(
        async (user) => {   
            return makeRequest.put('/user', user)
        },
        {
            onSuccess: async () => {
              //Invalidate and refetch
              queryClient.invalidateQueries(["user"])
              setCurrentUser(user)
            },
        })

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value}))
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)

        let coverUrl = user.coverPic
        let profileUrl = user.profilePic

        coverUrl = cover && await makeRequest.get(`/file/generate-upload-url/cover-photo?fileName=${cover.name}`)
        profileUrl = profile && await makeRequest.get(`/file/generate-upload-url/profile-photo?fileName=${profile.name}`)
        
        // TODO: Find better way to upload image
        if(coverUrl !== null){
            await axios.put(coverUrl.data, cover)
        }

        if(profileUrl !== null){
            await axios.put(profileUrl.data, profile)
        }

        mutation.mutate({ ...inputs })
        setLoading(false)
        setOpenUpdate(false)
        setCover(null);
        setProfile(null);
    }


  return (
    <div className="update">
      {loading
        ? <div className="loading-container">
            <DotLoader
              color='#6260e0'
              loading={loading}
              size={150}
            />
          </div>
        :
        <div className="wrapper">
          <h1>Update Your Profile</h1>
          <form>
            <div className="files">
              <label htmlFor="cover">
                <span>Cover Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      cover
                        ? URL.createObjectURL(cover)
                        : user.coverPic
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="cover"
                style={{ display: "none" }}
                onChange={(e) => setCover(e.target.files[0])}
              />
              <label htmlFor="profile">
                <span>Profile Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      profile
                        ? URL.createObjectURL(profile)
                        : user.profilePic
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="profile"
                style={{ display: "none" }}
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
            <label>Name</label>
            <input
              type="text"
              value={inputs.name}
              name="name"
              onChange={handleChange}
            />
            <label>Country / City</label>
            <input
              type="text"
              name="city"
              value={inputs.city}
              onChange={handleChange}
            />
            <label>Website</label>
            <input
              type="text"
              name="website"
              value={inputs.website}
              onChange={handleChange}
            />
            <button onClick={handleUpdate}>Update</button>
          </form>
          <button className="close" onClick={() => setOpenUpdate(false)}>
            X
          </button>
        </div>
      }
    </div>
  )
}

export default Update