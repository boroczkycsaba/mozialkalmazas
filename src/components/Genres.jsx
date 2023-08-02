import React from 'react'
import { useQuery } from 'react-query';
import { getData } from '../util';
import Stack from '@mui/material/Stack';
import { SingleChip } from './SingleChip';
import { useState } from 'react';
import { useEffect } from 'react';

export const Genres = ({type,setUrlForGenre}) => {
  const [selectedGenres,setSelectedGenres]=useState([])
  const urlGenres=`https://api.themoviedb.org/3/genre/${type}/list?api_key=${import.meta.env.VITE_API_KEY}`;
  const {data,status,isLoading,isError} =useQuery(['genres',urlGenres],getData)

  status=='success' && console.log(data.genres);
  console.log(selectedGenres);

  useEffect(()=>{
    if(selectedGenres.length<1)
        setUrlForGenre('')
    else
      setUrlForGenre(selectedGenres.join(','))
  },[selectedGenres])

  return (
    <Stack direction='row' spacing={1} sx={{display:'flex',flexWrap:'wrap',justifyContent: 'center',padding:'5px'}}>
      {status === 'success' && data.genres.map(obj=>
        <SingleChip key={obj.id} {...obj}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
        )}
    </Stack>
  )
}

