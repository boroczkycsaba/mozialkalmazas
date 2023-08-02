import React from 'react'
import {Genres} from './Genres';
import { Movies } from './Movies';
import { useState } from 'react';

export const MoviesPage = () => {
  const [urlForGenre,setUrlForGenre]=useState('')
  return (
    <>
    <h3> Movies</h3>
    <div className="content">
      <Genres type='movie' setUrlForGenre={setUrlForGenre}/>
      <Movies urlForGenre={urlForGenre}/>
    </div>
    
  </>
  )
}

