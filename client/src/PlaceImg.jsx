import React from 'react'

const PlaceImg = ({places,index=0,className="null"}) => {
    if(!places.addedphoto?.length){
        return ""
    }
    if(!className){
        className="object-cover"
    }
  return (
    <img className='object-cover' src={"http://localhost:4000/uploads/"+places.addedphoto[index]} alt="no" />
  )
}

export default PlaceImg
