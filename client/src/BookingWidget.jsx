import React, { useContext, useEffect, useState } from 'react'
import { differenceInDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';
const BookingWidget = ({ place }) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState("");
    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("");
    const [redirect,setRedirect]=useState("");
    const {user}= useContext(UserContext)
    
    useEffect(()=>{
       setName(user.name);   
    },[user])
    let numberOfdays = 0;
    if (checkIn && checkOut) {
        const date1 = new Date(checkOut);
        const date2 = new Date(checkIn);
        // Calculate the difference in days
        numberOfdays = differenceInDays(date1, date2);
    }
    async function bookThisPlace() {
        const response =await axios.post('/booking', { place: place._id, checkIn, checkOut, numberOfGuests, name, mobile, price: numberOfdays * place.price })
        const bookingId=response.data._id;
        console.log(response.data);
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if(redirect){
        return <Navigate to={redirect}></Navigate>
    }
    return (
        <div className='bg-white rounded-2xl shadow p-4 '>
            <div className='text-2xl text-center'>
                Price:${place.price}/per night<br></br>
            </div>
            <div className='border rounded-2xl mt-4'>
                <div className='flex items-center'>
                    <div className='my-4 px-4 py-3'>
                        <label>Check In:</label>
                        <input type="date" name="" id="" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div className='my-4 px-4 py-3 border-l'>
                        <label>Check Out:</label>
                        <input type="date" name="" id="" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className='my-4 px-4 py-3 border-t'>
                    <label>Max Guests:</label>
                    <input type="number" value={numberOfGuests} name="" id="" onChange={ev => setNumberOfGuests(ev.target.value)} />
                </div>
                {numberOfdays > 0 && (
                    <div className='my-4 px-4 py-3 border-t'>
                        <label>Your Name:</label>
                        <input type="text" value={name} name="" id="" onChange={ev => setName(ev.target.value)} />
                    </div>
                )}
                {numberOfdays > 0 && (
                    <div className='my-4 px-4 py-3 border-t'>
                        <label>Your Mobile:</label>
                        <input type="text" value={mobile} name="" id="" onChange={ev => setMobile(ev.target.value)} />
                    </div>
                )}
            </div>
            <button onClick={bookThisPlace} className="primary mt-4">
                Book this place Now
                {checkIn && checkOut && (
                    <span> ${numberOfdays * place.price}</span>
                )}
            </button>
        </div>
    )
}

export default BookingWidget
