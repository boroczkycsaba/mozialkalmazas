import React from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import {getData} from '../util'
import { ContentPagination } from './ContentPagination'
import { SingleContent } from './SingleContent'

export const SearchResults = ({searchText,type}) => {
    const [page,setPage]=useState(1)
    //console.log(searchText,type);
    const urlSearch=`https://api.themoviedb.org/3/search/${type}?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&query=${searchText}&page=${page}`
    const {data,status} =useQuery(['searchedItems',urlSearch],getData)
    status=='success' && console.log(data);

  return (
    <div className="content">
    {status =='success' &&  data.results.length>0 ?
     data.results.map(obj=>(
      <SingleContent 
        key={obj.id} 
        id={obj.id}
        poster={obj.poster_path}
        title={obj.title || obj.name}
        type={type}
        date={obj.release_date || obj.first_air_date}
        vote={obj.vote_average} 
      />
    ))
  :
  <div>no {type} found...</div>
  }
  {status =='success' && <ContentPagination page={page} setPage={setPage} numOfPage={data.total_pages>500 ? 500 : data.total_pages}/>}
  </div>
  )
}
