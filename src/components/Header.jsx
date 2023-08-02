import React from 'react'
import './Header.css'

export const Header = () => {
  return (
    <h1 className="header" onClick={()=>window.scrollTo(0,0)}>
        🎞️ Movies 📽️
    </h1>
  )
}

