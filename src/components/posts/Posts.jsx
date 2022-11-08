import Post from '../post/Post';
import './posts.scss'
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

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
      { error ? "Something went wrong!" : (isLoading ? "Loading..." : data.map((post) => (
        <Post post={post} key={post.id}/>
      )))}
    </div>
  )
}

export default Posts