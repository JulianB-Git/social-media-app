import Post from '../post/Post';
import './posts.scss'
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { DotLoader } from 'react-spinners'

const Posts = ({ userId }) => {

  const { isLoading, error, data } = useQuery(['posts'], async () => {
    if(userId){
      const response = await makeRequest.get(`/post?userId=${userId}`)
      return response.data
    } else {
      const response = await makeRequest.get('/post/')
      return response.data
    }
  })

  return (
    <div className='posts'>
      { isLoading &&
        <div className="loading-container">
          <DotLoader
            color='#6260e0'
            loading={isLoading}
            size={150}
          /> 
        </div>
      }

      { error ? "Something went wrong!"
      : data?.map((post) => (
        <Post post={post} key={post.id}/>
      ))}
    </div>
  )
}

export default Posts