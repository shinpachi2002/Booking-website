import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from '../BookingWidget';
import PlaceGallery from '../PlaceGallery';
import AdressLink from '../AdressLink';

const SinglePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState("");
  useEffect(() => {
    if (!id) {
      return
    }
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    })
  }, [id])
  
  return (
    <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
      <h1 className='text-2xl'>{place.title}</h1>
      <AdressLink children={place.address}></AdressLink>
         <PlaceGallery place={place}></PlaceGallery>
      <div className=' mt-8 mb-8  gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
        <div>
          <div className='my-4'>
            <h2 className='font-semibold text-2xl'>Description</h2>
            {place.description}
          </div>
          CheckIn:{place.checkIn}<br></br>
          CheckOut:{place.checkOut}<br></br>
          MaxGuests:{place.maxGuests}<br></br>
        </div>
        <BookingWidget place={place}></BookingWidget>
      </div>
      <div className='bg-white -mx-8 px-8 py-8 border-t'>
        <div>
          <h2 className='text-2xl font-semibold'>Extra info</h2>
        </div>
        <div className='text-sm mt-2 mb-4 leading-4 text-gray-700'>{place.extraInfo}</div>
      </div>
    </div>
  )
}

export default SinglePage
