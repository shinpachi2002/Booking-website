import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

const IndexPage = () => {
    const [places, setPlaces] = useState("");
    useEffect(() => {
        axios.get("/places").then((response) => {
            setPlaces(response.data);
        })
    }, [])
    console.log(places);
    return (
        <div className=' mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
            {places.length > 0 && places.map(place =>
                <Link to={"/places/"+place._id} >
                    <div className='flex rounded-2xl bg-gray-500'>
                    {place.addedphoto?.[0] && (
                        <img className='rounded-2xl aspect-square object-cover' src={"http://localhost:4000/uploads/" + place.addedphoto?.[0]} alt="" />
                    )}
                    </div>
                   <h3 className='font-bold leading-4'>{place.address}</h3>
                   <h2 className='text-sm truncate leading-4 text-gray-500 mt-1'>{place.title}</h2>
                   <div className='mt-1'>
                      <span className='font-bold'>${place.price}</span>per night
                   </div>
                </Link>
            )}
        </div>
    )
}

export default IndexPage;
