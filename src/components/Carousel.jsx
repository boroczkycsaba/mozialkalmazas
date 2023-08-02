import React from 'react'
import { useQuery } from 'react-query'
import {getData, noPicture, img_300} from '../util';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Carousel.css'

export const Carousel = ({type, id}) => {
  console.debug("Carousel type:" + type)
  console.debug("Carousel id:" + id)
  
  const urlCredits=`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}`
  const {data,status}=useQuery(['credits',urlCredits],getData)
  
    //console.log('Carousel')
    status=='success' && console.log(data.cast)

    const handleDragStart = (e) => e.preventDefault();

    const responsive={
      0:{items:3},
      512:{items:5},
      1024:{items:7}
    }

    const items=status=='success' ? 
    data.cast.map((castData)=>(
      <div className='carousel-item' key='castData.profile_path'>
        <img className='carousel-img' src={castData.profile_path ? img_300+castData.profile_path : noPicture}
        alt={castData?.name} 
        onDragStart={handleDragStart}>
        </img>
        
        <b className='carousel-text'>{castData.original_name}</b>
      </div>
    ))
     : []

    return (
    <div>
      <AliceCarousel mouseTracking autoPlay infinite 
       disableButtonsControls
       disableDotsControls
       responsive={responsive}
       items={items} />
    </div>
  )
}


