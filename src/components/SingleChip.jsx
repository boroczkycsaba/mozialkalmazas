import React from 'react'
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useState } from 'react';

export const SingleChip = ({id,name,selectedGenres,setSelectedGenres}) => {
    const [selected,setSelected]=useState(false)

    const handleClick =()=>{
        //console.log('clicked the Chip');
        if(selectedGenres.indexOf(id) === -1){
            setSelected(true)
            setSelectedGenres((prev)=>[...prev,id])
        }else{
            setSelected(false)
            setSelectedGenres(selectedGenres.filter(item=>item !=id))
        }
    }

  return (
    <Chip 
        label={name}
        clickable
        color='secondary'
        onClick={()=>handleClick()}
        icon={selected? <DoneIcon /> : <RadioButtonUncheckedIcon />}
    />
  )
}
