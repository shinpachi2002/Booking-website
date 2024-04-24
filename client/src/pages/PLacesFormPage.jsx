import React, { useEffect } from 'react'
import { useState } from 'react';
import PhotosUploader from '../PhotosUploader1';
import Perks from '../Perks';
import axios from 'axios';
import AccountNav from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';
const PLacesFormPage = () => {
    const{id}=useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedphoto, setAddedphoto] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extrainfo, setExtrainfo] = useState("");
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("")
    const [maxguests, setMaxguests] = useState(1);
    const [price,setPrice]=useState(100);
    const [redirect,setRedirect]=useState(false);
    function inputHeader(text) {
        return <h2 className='text-2xl mt-4'>{text}</h2>
    }
    function inputDescription(text) {
        return <p className='text-gray-500 text-sm'>{text}</p>
    }
    function preInput(header, description) {
        return <>
            {inputHeader(header)}
            {inputDescription(description)}
        </>
    }
    async function savePlace(ev) {
        ev.preventDefault();
        const Placedata = { id, title, address, addedphoto, description, perks, extrainfo, checkin, checkout, maxguests,price};
        if(id){
            
            try {
                const { data } = await axios.put("/places", {id,...Placedata})
                console.log(data);
                setRedirect(true)
            } catch (error) {
                console.log(error);
            }
        }
        else{
            try {
                const { data } = await axios.post("/places", Placedata)
                setRedirect(true)
                
            } catch (error) {
                console.log(error);
            }
        }
   

    }
    useEffect(()=>{
        if(!id){
            return
        }
        axios.get("/places/"+id).then((response)=>{
            const{data}=response; 
            setTitle(data.title);
            setAddress(data.address);
            setAddedphoto(data.addedphoto);
            setDescription(data.description);
            setPerks(data.perks);
            setExtrainfo(data.extraInfo);
            setCheckin(data.checkIn);
            setCheckout(data.checkOut);
            setMaxguests(data.maxGuests);
            setPrice(data.price);
        })
    },[id])
    if(redirect===true){
        return <Navigate to={"/account/places"}></Navigate>
    }
  return (
    <div>
      <AccountNav></AccountNav>
      <form onSubmit={savePlace}>
                    {preInput("Title", "Title for your place should be short and catchy n advertisment")}
                    <input type="text" value={title} onChange={(e) => setTitle(
                        e.target.value
                    )} placeholder='title,example:My lovely apt' />
                    {preInput("Address", "Address to this place")}
                    <input type="text" placeholder='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                    {preInput("Photos", "more=better")}
                    <PhotosUploader addedphotos={addedphoto} onChange={setAddedphoto}></PhotosUploader>
                    {preInput("Description", "Add Description to your place")}
                    <textarea cols="30" rows="10" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    {preInput("Perks", "Select your perks")}
                    <div className='grid mt-2 grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6'>
                        <Perks selected={perks} onChange={setPerks}></Perks>
                    </div>
                    {preInput("Extra Info", "House Rules...")}
                    <textarea cols="30" rows="10" value={extrainfo} onChange={(e) => setExtrainfo(e.target.value)}></textarea>
                    {preInput("Check In & Out times", "Add checj in & out time,remember to have some time to clean your rooms")}
                    <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
                        <div>
                            <h3 className='mt-2 mb-1'>Check in time</h3>
                            <input type='text' placeholder='16:00' value={checkin} onChange={(e) => setCheckin(e.target.value)} />
                        </div>
                        <div>
                            <h3 className='mt-2 mb-1'>Check out time</h3>
                            <input type="text" placeholder='17:00' value={checkout} onChange={(e) => setCheckout(e.target.value)} />
                        </div>
                        <div>
                            <h3 className='mt-2 mb-1'>Max guests</h3>
                            <input type="number" placeholder='6 people' value={maxguests} onChange={(e) => setMaxguests(e.target.value)} />
                        </div>
                        <div>
                            <h3 className='mt-2 mb-1'>Price per night</h3>
                            <input type="number" placeholder='6 people' value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <button className='primary my-4'>Save</button>
                    </div>
                </form>
    </div>
  )
}

export default PLacesFormPage
