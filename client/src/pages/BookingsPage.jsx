import React, { useEffect, useState } from 'react'
import AccountNav from '../AccountNav'
import axios from 'axios';
import PlaceImg from '../PlaceImg';
import { format } from 'date-fns';
import { differenceInDays } from 'date-fns';
import { Link } from 'react-router-dom';
import BookingDates from '../BookingDates';
const BookingsPage = () => {
    const [booking, setBookings] = useState([]);
    useEffect(() => {
        axios.get("/bookings").then((response) => {
            setBookings(response.data);
        })
    }, [])

    return (
        <div>
            <AccountNav></AccountNav>
            <div>
                {booking.length > 0 && booking.map((booking) => (
                    <Link to={`/account/bookings/${booking._id}`} className='flex gap-4 bg-gray-200 rounded-3xl overflow-hidden '>
                        <div className='w-48'>
                            <PlaceImg places={booking.place}></PlaceImg>
                        </div>
                        <div className='py-3 pr-3 grow'>
                            <h2 className='text-xl'>{booking.place.title}</h2>
                            <BookingDates booking={booking} className=" text-gray-500"></BookingDates>
                            <div className=' flex gap-1' >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                </svg>
                                <span className='text-2xl'>
                                Total Price:${booking.price}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BookingsPage
