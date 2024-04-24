import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import AccountNav from '../AccountNav';

const PlacesPage = () => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get("/user-places")
            .then(({ data }) => {
                setPlaces(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    console.log(places[0]?.addedphoto[0]);
    return (
        <div>
            <AccountNav></AccountNav>
            <div>
                <div className='flex justify-center'><span className='text-3xl font-bold'>List of Places</span></div>
                <br />
                <div className='text-center'>
                    <NavLink className='inline-flex gap-1 bg-primary rounded-full py-2 px-6 text-white text-center max-w-sm ' to={"/account/places/new"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </NavLink>
                </div>
                <div className='mt-4'>
                    {places.length > 0 && places.map(place => (
                        <Link to={"/account/places/" + place._id} className='bg-gray-100 p-4 cursor-pointer flex gap-4 border rounded-2xl' key={place._id}>
                            <div className=' flex w-32 h-32 bg-gray-300 shrink-0'>
                                {place.addedphoto?.length > 0 && (
                                    <img className='object-cover' src={"http://localhost:4000/uploads/"+place.addedphoto[0]} alt="no" />
                                )}
                            </div>
                            <div>
                                <h2 className='text-xl'>{place.title}</h2>
                                <p className='mt-2 '>{place.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlacesPage
