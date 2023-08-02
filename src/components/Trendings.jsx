import React,{useState} from 'react'
import { useQuery } from 'react-query'
import { getData } from '../util'
import { SingleContent } from './SingleContent'
import { ContentPagination } from './ContentPagination'

const urlTrending=`https://api.themoviedb.org/3/trending/all/day?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false`

export const Trendings = () => {
  const [page,setPage]=useState(1)
  const {data,status,isLoading,isError}=useQuery(["trendings",urlTrending+"&page="+page],getData)

  if(isLoading)
    return <div>Loading...</div>
  if(isError)
    return <div>Error while fetching data!</div> 

  status=='success' && console.log(data.results,data.total_pages);

  return (
    <>
      <h3>Trendings</h3>
      <div className="content">
        {status=='success' && data.results.map(obj=>(
          <SingleContent 
            key={obj.id} 
            id={obj.id}
            poster={obj.poster_path}
            title={obj.title || obj.name}
            type={obj.media_type}
            date={obj.release_date || obj.first_air_date}
            vote={obj.vote_average} 
          />
        ))}
        <ContentPagination page={page} setPage={setPage} numOfPage={data.total_pages>500 ? 500 : data.total_pages}/>
      </div>
    </>
    
  )
}
